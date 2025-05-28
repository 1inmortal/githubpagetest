/**
 * @fileoverview Control real time Phonk music with a MIDI controller or UI
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { css, html, LitElement, svg, CSSResultGroup } from 'lit';
import { customElement, property, query, state } from 'lit/decorators';
import { styleMap } from 'lit/directives/style-map';
import { classMap } from 'lit/directives/class-map';

import { GoogleGenAI, type LiveMusicSession, type LiveMusicServerMessage } from '@google/genai';
import { decode, decodeAudioData } from './utils'; // Asumimos que utils.ts existe como en el ejemplo

// --- CONFIGURACIÓN ESENCIAL ---
// ¡ASEGÚRATE DE TENER ESTA VARIABLE DE ENTORNO CONFIGURADA!
// Puedes crear un archivo .env en la raíz de tu proyecto con:
// GEMINI_API_KEY=TU_API_KEY_AQUI
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY no está configurada. Por favor, añade tu API key al archivo .env o configúrala en tu entorno.");
  // Podrías mostrar un mensaje en la UI aquí también
}

const ai = new GoogleGenAI({ apiKey: apiKey, apiVersion: 'v1alpha' });
const model = 'lyria-realtime-exp'; // Modelo para generación en tiempo real

interface Prompt {
  readonly promptId: string;
  text: string;
  weight: number;
  cc: number; // MIDI Control Change number
  color: string;
}

interface ControlChange {
  channel: number;
  cc: number;
  value: number;
}

type PlaybackState = 'stopped' | 'playing' | 'loading' | 'paused';

/**
 * Throttles a callback to be called at most once per `delay` milliseconds.
 */
function throttle<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => ReturnType<T> {
  let lastCall = -Infinity;
  let lastResult: ReturnType<T>;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    if (timeSinceLastCall >= delay) {
      lastResult = func(...args);
      lastCall = now;
    }
    return lastResult;
  };
}

// --- PROMPTS ESTILO PHONK ---
const DEFAULT_PHONK_PROMPTS = [
  // Bajos y Ritmo
  { color: '#4B0082', text: 'Slowed Phonk Beat' }, // Indigo
  { color: '#8A2BE2', text: 'Heavy 808 Bassline' }, // BlueViolet
  { color: '#770077', text: 'Distorted Sub Bass' }, // Dark Magenta
  { color: '#301934', text: 'Punchy Phonk Drums' }, // Dark Purple
  { color: '#550055', text: 'Classic Cowbell Rhythm' }, // Tyrian Purple

  // Atmósfera y Suspenso
  { color: '#2F4F4F', text: 'Eerie Synth Melody' }, // DarkSlateGray
  { color: '#1A1A1A', text: 'Suspenseful Ambient Pad' }, // Very Dark Gray
  { color: '#000033', text: 'Dark Imposing Atmosphere' }, // Dark Navy
  { color: '#483D8B', text: 'Ominous Textures' }, // DarkSlateBlue
  { color: '#6A0DAD', text: 'Haunting Vocal Chops' }, // Purple

  // Elementos Característicos del Phonk
  { color: '#9932CC', text: 'Memphis Rap Sample' }, // DarkOrchid
  { color: '#800080', text: 'Lo-fi Phonk Texture' }, // Purple
  { color: '#C71585', text: 'Aggressive Phonk Synth' }, // MediumVioletRed
  { color: '#400040', text: 'Reverb Drenched Snares' }, // Dark Purple variant
  { color: '#702963', text: 'Filtered Pad Sound' }, // Byzantium
  { color: '#5A4FCF', text: 'Dark Trap Elements' }, // Iris Blue
];


// Toast Message component (igual que en el ejemplo)
// -----------------------------------------------------------------------------
@customElement('toast-message')
class ToastMessage extends LitElement {
  static override styles = css`
    .toast {
      line-height: 1.6;
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #1a1a1a; /* Darker for Phonk */
      color: #e0e0e0; /* Lighter text */
      padding: 15px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      min-width: 200px;
      max-width: 80vw;
      transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
      z-index: 1000;
      border: 1px solid #444;
    }
    button {
      border-radius: 100px;
      aspect-ratio: 1;
      border: none;
      color: #1a1a1a;
      background-color: #e0e0e0;
      cursor: pointer;
    }
    .toast:not(.showing) {
      transition-duration: 1s;
      transform: translate(-50%, -200%);
    }
  `;

  @property({ type: String }) message = '';
  @property({ type: Boolean }) showing = false;

  override render() {
    return html`<div class=${classMap({ showing: this.showing, toast: true })}>
      <div class="message">${this.message}</div>
      <button @click=${this.hide}>✕</button>
    </div>`;
  }

  show(message: string) {
    this.showing = true;
    this.message = message;
  }

  hide() {
    this.showing = false;
  }
}


// WeightKnob component (igual que en el ejemplo, podría ajustarse el estilo si se desea)
// -----------------------------------------------------------------------------
@customElement('weight-knob')
class WeightKnob extends LitElement {
  static override styles = css`
    :host {
      cursor: grab;
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      flex-shrink: 0;
      touch-action: none;
    }
    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    #halo {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      mix-blend-mode: lighten; /* Podría ser 'screen' o 'overlay' para un efecto diferente */
      transform: scale(2);
      will-change: transform;
      opacity: 0.7; /* Phonk often has a slightly muted feel */
    }
     /* Base del knob con colores más oscuros */
    #f1-stop1 { stop-opacity: 0.4; stop-color: #333; }
    #f1-stop2 { stop-opacity: 0.2; stop-color: #555; }
    #f3-stop1 { stop-color: #444; }
    #f3-stop2 { stop-color: #666; stop-opacity: 0.7; }
    #f5-stop1 { stop-color: #555; }
    #f5-stop2 { stop-color: #333; }
    #f6-stop1 { stop-color: #404040; }
    #f6-stop2 { stop-color: #505050; }
    
    /* Lineas indicadoras */
    .indicator-line-bg { stroke: #222; } /* Más oscuro */
    .indicator-line-fg { stroke: #bbb; } /* Menos brillante */
    .indicator-dot { fill: #ccc; } /* Menos brillante */
  `;

  @property({ type: Number }) value = 0;
  @property({ type: String }) color = '#000'; // Este color viene del prompt
  @property({ type: Number }) audioLevel = 0;

  private dragStartPos = 0;
  private dragStartValue = 0;

  constructor() {
    super();
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
  }

  private handlePointerDown(e: PointerEvent) {
    e.preventDefault();
    this.dragStartPos = e.clientY;
    this.dragStartValue = this.value;
    document.body.classList.add('dragging');
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
  }

  private handlePointerMove(e: PointerEvent) {
    e.preventDefault();
    const delta = this.dragStartPos - e.clientY;
    this.value = this.dragStartValue + delta * 0.01;
    this.value = Math.max(0, Math.min(2, this.value)); // Max weight de 2
    this.dispatchEvent(new CustomEvent<number>('input', { detail: this.value }));
  }

  private handlePointerUp(e: PointerEvent) {
    e.preventDefault();
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    document.body.classList.remove('dragging');
  }

  private handleWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY;
    this.value = this.value + delta * -0.0025;
    this.value = Math.max(0, Math.min(2, this.value));
    this.dispatchEvent(new CustomEvent<number>('input', { detail: this.value }));
  }

  private describeArc(
    centerX: number,
    centerY: number,
    startAngle: number,
    endAngle: number,
    radius: number,
  ): string {
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  }
  
  // Mapeo de peso a tamaño del halo (igual al original)
  private readonly MIN_HALO_SCALE = 1;
  private readonly MAX_HALO_SCALE = 2;
  private readonly HALO_LEVEL_MODIFIER = 1;


  override render() {
    const rotationRange = Math.PI * 2 * 0.75;
    const minRot = -rotationRange / 2 - Math.PI / 2;
    const maxRot = rotationRange / 2 - Math.PI / 2;
    const rot = minRot + (this.value / 2) * (maxRot - minRot); // value va de 0 a 2
    const dotStyle = styleMap({
      transform: `translate(40px, 40px) rotate(${rot}rad)`,
    });

    let scale = (this.value / 2) * (this.MAX_HALO_SCALE - this.MIN_HALO_SCALE);
    scale += this.MIN_HALO_SCALE;
    scale += this.audioLevel * this.HALO_LEVEL_MODIFIER;

    const haloStyle = styleMap({
      display: this.value > 0 ? 'block' : 'none',
      background: this.color,
      transform: `scale(${scale})`,
    });

    return html`
      <div id="halo" style=${haloStyle}></div>
      <svg viewBox="0 0 80 80">
        <ellipse opacity="0.4" cx="40" cy="40" rx="40" ry="40" fill="url(#f1)" />
        <g filter="url(#f2)">
          <ellipse cx="40" cy="40" rx="29" ry="29" fill="url(#f3)" />
        </g>
        <g filter="url(#f4)">
          <circle cx="40" cy="40" r="20.6667" fill="url(#f5)" />
        </g>
        <circle cx="40" cy="40" r="18" fill="url(#f6)" />
        <defs>
          <filter id="f2" x="8.33301" y="10.0488" width="63.333" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="2" /> <feGaussianBlur stdDeviation="1.5" /> <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" /> {/* Sombra más sutil */}
            <feBlend mode="normal" in2="BackgroundImageFix" result="shadow1" /> <feBlend mode="normal" in="SourceGraphic" in2="shadow1" result="shape" />
          </filter>
          <filter id="f4" x="11.333" y="19.0488" width="57.333" height="59.334" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="10" /> <feGaussianBlur stdDeviation="4" /> <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" /> {/* Sombra más sutil */}
            <feBlend mode="normal" in2="BackgroundImageFix" result="shadow1" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feMorphology radius="5" operator="erode" in="SourceAlpha" result="shadow2" />
            <feOffset dy="8" /> <feGaussianBlur stdDeviation="3" /> <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" /> {/* Sombra más sutil */}
            <feBlend mode="normal" in2="shadow1" result="shadow2" /> <feBlend mode="normal" in="SourceGraphic" in2="shadow2" result="shape" />
          </filter>
          <linearGradient id="f1" x1="40" y1="0" x2="40" y2="80" gradientUnits="userSpaceOnUse">
            <stop id="f1-stop1" stop-opacity="0.4" stop-color="#333"/> <stop id="f1-stop2" offset="1" stop-color="#555" stop-opacity="0.2"/>
          </linearGradient>
          <radialGradient id="f3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40 40) rotate(90) scale(29 29)">
            <stop id="f3-stop1" offset="0.6" stop-color="#444"/> <stop id="f3-stop2" offset="1" stop-color="#666" stop-opacity="0.7"/>
          </radialGradient>
          <linearGradient id="f5" x1="40" y1="19.0488" x2="40" y2="60.3822" gradientUnits="userSpaceOnUse">
            <stop id="f5-stop1" stop-color="#555"/> <stop id="f5-stop2" offset="1" stop-color="#333"/>
          </linearGradient>
          <linearGradient id="f6" x1="40" y1="21.7148" x2="40" y2="57.7148" gradientUnits="userSpaceOnUse">
            <stop id="f6-stop1" stop-color="#404040"/> <stop id="f6-stop2" offset="1" stop-color="#505050"/>
          </linearGradient>
        </defs>
      </svg>
      <svg viewBox="0 0 80 80" @pointerdown=${this.handlePointerDown} @wheel=${this.handleWheel}>
        <g style=${dotStyle}>
          <circle cx="14" cy="0" r="2" class="indicator-dot" fill="#ccc" />
        </g>
        <path d=${this.describeArc(40, 40, minRot, maxRot, 34.5)} class="indicator-line-bg" fill="none" stroke="#2223" stroke-width="3" stroke-linecap="round" />
        <path d=${this.describeArc(40, 40, minRot, rot, 34.5)} class="indicator-line-fg" fill="none" stroke="#bbb" stroke-width="3" stroke-linecap="round" />
      </svg>
    `;
  }
}

// Base class for icon buttons (igual que en el ejemplo)
class IconButton extends LitElement {
  static override styles = css`
    :host {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    :host(:hover) svg {
      transform: scale(1.1); /* Sutil hover */
    }
    svg {
      width: 100%;
      height: 100%;
      transition: transform 0.3s cubic-bezier(0.25, 1.56, 0.32, 0.99);
    }
    .hitbox {
      pointer-events: all;
      position: absolute;
      width: 65%;
      aspect-ratio: 1;
      top: 9%;
      border-radius: 50%;
      cursor: pointer;
    }
    /* Estilos base del botón con tema oscuro */
    .button-bg-base { fill: black; fill-opacity: 0.15; }
    .button-stroke { stroke: black; stroke-opacity: 0.4; stroke-width: 3; }
    .button-main-fill { fill: #222; fill-opacity: 0.9; } /* Más oscuro */
    .icon-fill { fill: #E0E0E0; } /* Icono claro */
  ` as CSSResultGroup;

  protected renderIcon() {
    return svg``; 
  }

  private renderSVG() { // Estilo base oscuro
    return html` <svg
      width="140"
      height="140"
      viewBox="0 -10 140 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="6" width="96" height="96" rx="48" class="button-bg-base" />
      <rect x="23.5" y="7.5" width="93" height="93" rx="46.5" class="button-stroke" />
      <g filter="url(#filter0_ddi_1048_7373_phonk)">
        <rect x="25" y="9" width="90" height="90" rx="45" class="button-main-fill" shape-rendering="crispEdges" />
      </g>
      ${this.renderIcon()}
      <defs>
        <filter id="filter0_ddi_1048_7373_phonk" x="0" y="0" width="140" height="140" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2" /> <feGaussianBlur stdDeviation="4" /> <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" /> {/* Sombra sutil */}
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1048_7373" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="10" /> <feGaussianBlur stdDeviation="10" /> <feComposite in2="hardAlpha" operator="out" /> {/* Sombra más suave */}
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" /> {/* Sombra sutil */}
          <feBlend mode="normal" in2="effect1_dropShadow_1048_7373" result="effect2_dropShadow_1048_7373" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1048_7373" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" /> <feGaussianBlur stdDeviation="1" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> {/* Inner shadow más sutil */}
          <feColorMatrix type="matrix" values="0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0.03 0" /> {/* Color de inner shadow */}
          <feBlend mode="normal" in2="shape" result="effect3_innerShadow_1048_7373" />
        </filter>
      </defs>
    </svg>`;
  }
  override render() {
    return html`${this.renderSVG()}<div class="hitbox"></div>`;
  }
}

// PlayPauseButton (adaptado para usar los estilos de IconButton)
// -----------------------------------------------------------------------------
@customElement('play-pause-button')
export class PlayPauseButton extends IconButton {
  @property({ type: String }) playbackState: PlaybackState = 'stopped';

  static override styles = [
    IconButton.styles,
    css`
      .loader {
        stroke: #e0e0e0; /* Color claro para el loader */
        stroke-width: 3;
        stroke-linecap: round;
        animation: spin linear 1s infinite;
        transform-origin: center;
        transform-box: fill-box;
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(359deg); }
      }
    `
  ]

  private renderPause() {
    return svg`<path d="M75.0037 69V39H83.7537V69H75.0037ZM56.2537 69V39H65.0037V69H56.2537Z" class="icon-fill" />`;
  }

  private renderPlay() {
    return svg`<path d="M60 71.5V36.5L87.5 54L60 71.5Z" class="icon-fill" />`;
  }

  private renderLoading() {
    return svg`<path shape-rendering="crispEdges" class="loader" d="M70,74.2L70,74.2c-10.7,0-19.5-8.7-19.5-19.5l0,0c0-10.7,8.7-19.5,19.5-19.5l0,0c10.7,0,19.5,8.7,19.5,19.5l0,0"/>`;
  }

  override renderIcon() {
    if (this.playbackState === 'playing') {
      return this.renderPause();
    } else if (this.playbackState === 'loading') {
      return this.renderLoading();
    } else {
      return this.renderPlay();
    }
  }
}

// MidiDispatcher (igual que en el ejemplo)
// -----------------------------------------------------------------------------
class MidiDispatcher extends EventTarget {
  private access: MIDIAccess | null = null;
  activeMidiInputId: string | null = null;

  async getMidiAccess(): Promise<string[]> {
    if (this.access) {
      return Array.from(this.access.inputs.keys());
    }

    try {
      this.access = await navigator.requestMIDIAccess({ sysex: false });
    } catch (error) {
        console.warn('MIDI access not supported or denied.', error);
        this.dispatchEvent(new CustomEvent('midi-error', { detail: 'MIDI access not supported or denied.' }));
        return [];
    }
    
    if (!(this.access instanceof MIDIAccess)) {
      console.warn('MIDI access not supported.');
      this.dispatchEvent(new CustomEvent('midi-error', { detail: 'MIDI access not supported.' }));
      return [];
    }

    const inputIds = Array.from(this.access.inputs.keys());

    if (inputIds.length > 0 && this.activeMidiInputId === null) {
      this.activeMidiInputId = inputIds[0];
    }

    this.access.onstatechange = (event) => {
        console.log('MIDI state change:', event.port.name, event.port.state);
        // Actualizar la lista de dispositivos
        this.dispatchEvent(new CustomEvent('midi-devices-changed'));
    };

    for (const input of this.access.inputs.values()) {
      input.onmidimessage = (event: MIDIMessageEvent) => {
        if (input.id !== this.activeMidiInputId) return;
        const { data } = event;
        if (!data) {
          console.error('MIDI message has no data');
          return;
        }
        const statusByte = data[0];
        const channel = statusByte & 0x0f;
        const messageType = statusByte & 0xf0;
        const isControlChange = messageType === 0xb0;
        if (!isControlChange) return;
        const detail: ControlChange = { cc: data[1], value: data[2], channel };
        this.dispatchEvent(new CustomEvent<ControlChange>('cc-message', { detail }));
      };
    }
    return inputIds;
  }

  getDeviceName(id: string): string | null {
    if (!this.access) return null;
    const input = this.access.inputs.get(id);
    return input ? input.name : null;
  }
}

// AudioAnalyser (igual que en el ejemplo)
// -----------------------------------------------------------------------------
class AudioAnalyser {
  readonly node: AnalyserNode;
  private readonly freqData: Uint8Array;
  constructor(context: AudioContext) {
    this.node = context.createAnalyser();
    this.node.smoothingTimeConstant = 0.1; // Un poco más de suavizado
    this.node.fftSize = 256; // Menos bins para un análisis más general
    this.freqData = new Uint8Array(this.node.frequencyBinCount);
  }
  getCurrentLevel() {
    this.node.getByteFrequencyData(this.freqData);
    const avg = this.freqData.reduce((a, b) => a + b, 0) / this.freqData.length;
    return avg / 0xff;
  }
}


// PromptController (adaptado para estilo Phonk)
// -----------------------------------------------------------------------------
@customElement('prompt-controller')
class PromptController extends LitElement {
  static override styles = css`
    .prompt {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    weight-knob {
      width: 70%; /* Un poco más pequeño para Phonk */
      flex-shrink: 0;
    }
    #midi {
      font-family: 'Courier New', Courier, monospace; /* Fuente monoespaciada */
      text-align: center;
      font-size: 1.4vmin; /* Ligeramente más pequeño */
      border: 0.15vmin solid #777; /* Borde más oscuro */
      border-radius: 0.5vmin;
      padding: 2px 5px;
      color: #bbb; /* Texto más oscuro */
      background: #1a1a1acc; /* Fondo oscuro semi-transparente */
      cursor: pointer;
      visibility: hidden;
      user-select: none;
      margin-top: 0.75vmin;
      transition: color 0.2s, border-color 0.2s;
    }
    .learn-mode #midi { /* Estilo learn mode */
      color: #ff4500; /* Naranja rojizo */
      border-color: #ff4500;
    }
    .show-cc #midi {
      visibility: visible;
    }
    #text {
      font-family: 'Roboto Mono', 'Lucida Console', monospace; /* Fuente monoespaciada moderna */
      font-weight: 500;
      font-size: 1.6vmin; /* Ligeramente más pequeño */
      max-width: 90%; /* Ajustado para mejor visibilidad */
      min-width: 2vmin;
      padding: 0.2em 0.4em;
      margin-top: 0.5vmin;
      flex-shrink: 0;
      border-radius: 0.25vmin;
      text-align: center;
      white-space: wrap;
      word-break: break-word;
      overflow: hidden;
      border: none;
      outline: none;
      -webkit-font-smoothing: antialiased;
      background: #222; /* Fondo oscuro para el texto */
      color: #ddd; /* Texto claro */
      transition: background-color 0.2s;
    }
    #text:focus {
        background: #333; /* Un poco más claro al enfocar */
    }
    :host([filtered=true]) #text {
      background: #8B0000; /* Rojo oscuro para filtrado */
      color: #f0f0f0;
    }
    @media only screen and (max-width: 600px) {
      #text { font-size: 2.1vmin; }
      weight-knob { width: 65%; }
    }
  `;

  @property({ type: String }) promptId = '';
  @property({ type: String }) text = '';
  @property({ type: Number }) weight = 0;
  @property({ type: String }) color = '';
  @property({ type: Number }) cc = 0;
  @property({ type: Number }) channel = 0;
  @property({ type: Boolean }) learnMode = false;
  @property({ type: Boolean }) showCC = false;
  @property({ reflect: true, type: Boolean }) filtered = false; // Para :host([filtered=true])

  @query('weight-knob') private weightInput!: WeightKnob;
  @query('#text') private textInput!: HTMLInputElement;
  @property({ type: Object }) midiDispatcher: MidiDispatcher | null = null;
  @property({ type: Number }) audioLevel = 0;
  private lastValidText!: string;

  override connectedCallback() {
    super.connectedCallback();
    this.midiDispatcher?.addEventListener('cc-message', this.handleCCMessage);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.midiDispatcher?.removeEventListener('cc-message', this.handleCCMessage);
  }
  
  private handleCCMessage = (e: Event) => {
    const customEvent = e as CustomEvent<ControlChange>;
    const { channel, cc, value } = customEvent.detail;
    if (this.learnMode) {
      this.cc = cc;
      this.channel = channel; // Guardar el canal también podría ser útil
      this.learnMode = false;
      this.dispatchPromptChange();
    } else if (cc === this.cc) { // Podría chequear canal también: && channel === this.channel
      this.weight = (value / 127) * 2; // Max weight 2
      this.dispatchPromptChange();
    }
  };

  override firstUpdated() {
    this.textInput.setAttribute('contenteditable', 'plaintext-only');
    this.textInput.textContent = this.text;
    this.lastValidText = this.text;
  }

  update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('showCC') && !this.showCC) {
      this.learnMode = false;
    }
    if (changedProperties.has('text') && this.textInput && this.textInput.textContent !== this.text) {
      this.textInput.textContent = this.text;
    }
    super.update(changedProperties);
  }

  private dispatchPromptChange() {
    this.dispatchEvent(
      new CustomEvent<Prompt>('prompt-changed', {
        bubbles: true, // Importante para que el padre lo reciba
        composed: true, // Importante para que el padre lo reciba
        detail: {
          promptId: this.promptId,
          text: this.text,
          weight: this.weight,
          cc: this.cc,
          color: this.color,
        },
      }),
    );
  }

  private async updateText() {
    const newText = this.textInput.textContent?.trim();
    if (!newText || newText.length === 0) {
      this.textInput.textContent = this.lastValidText; // Revertir si está vacío
    } else {
      this.text = newText;
      this.lastValidText = newText;
    }
    this.dispatchPromptChange();
  }

  private onFocus() {
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(this.textInput);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  private updateWeight(e: CustomEvent<number>) {
    this.weight = e.detail; // El valor viene del evento 'input' del weight-knob
    this.dispatchPromptChange();
  }

  private toggleLearnMode() {
    this.learnMode = !this.learnMode;
  }

  override render() {
    const classes = classMap({
      'prompt': true,
      'learn-mode': this.learnMode,
      'show-cc': this.showCC,
    });
    return html`<div class=${classes}>
      <weight-knob
        id="weight"
        .value=${this.weight}
        .color=${this.color}
        .audioLevel=${this.audioLevel}
        @input=${this.updateWeight}></weight-knob>
      <span
        id="text"
        spellcheck="false"
        @focus=${this.onFocus}
        @blur=${this.updateText}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); this.textInput.blur(); }}}
      ></span>
      <div id="midi" @click=${this.toggleLearnMode}>
        ${this.learnMode ? 'Learn...' : `CC:${this.cc}`}
      </div>
    </div>`;
  }
}


// PhonkRealtimeController (antes PromptDjMidi)
// -----------------------------------------------------------------------------
@customElement('phonk-realtime-controller')
class PhonkRealtimeController extends LitElement {
  static override styles = css`
    :host {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      position: relative;
      background-color: #0d0d0d; /* Fondo base muy oscuro */
      color: #e0e0e0; /* Texto general claro */
      font-family: 'Roboto', sans-serif;
    }
    #background {
      will-change: background-image;
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: -1;
      background: #0a0a0a; /* Un poco más oscuro para el efecto radial */
      mix-blend-mode: screen; /* Puede dar efectos interesantes con los colores Phonk */
      opacity: 0.6; /* Un poco más sutil */
    }
    #grid {
      width: 85vmin; /* Un poco más grande */
      max-width: 900px; /* Límite para pantallas grandes */
      height: auto; /* Ajuste automático de altura */
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* Grid responsivo */
      gap: 2vmin;
      margin-top: 10vmin; /* Más espacio arriba */
      margin-bottom: 2vmin;
      padding: 1vmin;
    }
    prompt-controller { 
      width: 100%;
    }
    play-pause-button {
      position: relative;
      width: 18vmin; /* Un poco más grande */
      max-width: 120px;
      margin-top: 3vmin;
      margin-bottom: 3vmin;
    }
    #controls-bar {
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px; /* Para que el select no se salga */
      padding: 5px;
      display: flex;
      gap: 10px; /* Más espacio */
      align-items: center;
      z-index: 10; /* Encima del fondo */
    }
    button, select {
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      color: #e0e0e0;
      background: #2a2a2a; /* Fondo oscuro para botones */
      -webkit-font-smoothing: antialiased;
      border: 1px solid #555; /* Borde sutil */
      border-radius: 4px;
      user-select: none;
      padding: 6px 10px; /* Más padding */
      transition: background-color 0.2s, color 0.2s;
    }
    button:hover, select:hover {
        background-color: #444;
    }
    button.active {
      background-color: #8A2BE2; /* Color Phonk para activo */
      color: #fff;
      border-color: #8A2BE2;
    }
    select {
      background: #2a2a2a;
      color: #e0e0e0;
      border: 1px solid #555;
    }
    #status-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(0,0,0,0.5);
        color: #ccc;
        padding: 5px 10px;
        font-size: 0.8em;
        text-align: center;
        z-index: 100;
    }
  `;

  private prompts: Map<string, Prompt>;
  private midiDispatcher: MidiDispatcher;
  private audioAnalyser!: AudioAnalyser; // Se inicializará

  @state() private playbackState: PlaybackState = 'stopped';
  private session!: LiveMusicSession; // Se inicializará
  private audioContext!: AudioContext; // Se inicializará
  private outputNode!: GainNode; // Se inicializará
  private nextStartTime = 0;
  private readonly bufferTime = 1.5; // Reducido un poco para menor latencia inicial

  @property({ type: Boolean }) private showMidi = false;
  @state() private audioLevel = 0;
  @state() private midiInputIds: string[] = [];
  @state() private activeMidiInputId: string | null = null;
  @state() private filteredPrompts = new Set<string>();
  private audioLevelRafId: number | null = null;
  private connectionError = false;
  @state() private isConnecting = false;
  @state() private statusMessage = "Ready";


  @query('play-pause-button') private playPauseButton!: PlayPauseButton;
  @query('toast-message') private toastMessage!: ToastMessage;

  constructor(
    initialPrompts: Map<string, Prompt>,
    midiDispatcher: MidiDispatcher,
  ) {
    super();
    this.prompts = initialPrompts;
    this.midiDispatcher = midiDispatcher;
    
    // Event listeners para MIDI
    this.midiDispatcher.addEventListener('midi-error', (e: Event) => {
        const customEvent = e as CustomEvent<string>;
        this.toastMessage.show(`MIDI Error: ${customEvent.detail}`);
    });
    this.midiDispatcher.addEventListener('midi-devices-changed', async () => {
        this.toastMessage.show('MIDI devices updated. Refreshing list...');
        await this.refreshMidiDeviceList();
    });

    this.updateAudioLevel = this.updateAudioLevel.bind(this);
  }

  private initializeAudio() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 48000 });
      this.outputNode = this.audioContext.createGain();
      this.audioAnalyser = new AudioAnalyser(this.audioContext);
      this.outputNode.connect(this.audioAnalyser.node);
      this.audioAnalyser.node.connect(this.audioContext.destination); // Conectar al destino final
    }
  }

  override async connectedCallback() {
    super.connectedCallback();
    this.initializeAudio(); // Asegurar que el contexto de audio esté listo
    if (!this.audioLevelRafId) { // Iniciar solo una vez
        this.updateAudioLevel();
    }
    // Cargar prompts guardados al conectar
    this.prompts = getInitialPhonkPrompts(); 
    // Guardar prompts cuando se descargue el componente
    window.addEventListener('beforeunload', this.savePromptsToLocalStorage);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.audioLevelRafId) {
      cancelAnimationFrame(this.audioLevelRafId);
      this.audioLevelRafId = null;
    }
    if (this.session) {
      this.session.stop(); // Asegurar que se detenga la sesión
    }
    window.removeEventListener('beforeunload', this.savePromptsToLocalStorage);
  }
  
  private savePromptsToLocalStorage = () => {
    setStoredPhonkPrompts(this.prompts);
  }

  private async refreshMidiDeviceList() {
    const inputIds = await this.midiDispatcher.getMidiAccess();
    this.midiInputIds = inputIds;
    if (!this.activeMidiInputId && inputIds.length > 0) {
        this.activeMidiInputId = inputIds[0];
        this.midiDispatcher.activeMidiInputId = inputIds[0];
    } else if (this.activeMidiInputId && !inputIds.includes(this.activeMidiInputId)) {
        // El dispositivo activo ya no está, seleccionar el primero si existe
        this.activeMidiInputId = inputIds.length > 0 ? inputIds[0] : null;
        this.midiDispatcher.activeMidiInputId = this.activeMidiInputId;
    }
  }


  private async connectToSession() {
    if (!apiKey) {
      this.toastMessage.show("Error: GEMINI_API_KEY no está configurada.");
      this.statusMessage = "API Key missing";
      return false;
    }
    if (this.isConnecting || (this.session && !this.connectionError)) return true; // Ya conectado o conectando

    this.isConnecting = true;
    this.playbackState = 'loading';
    this.statusMessage = "Connecting to Lyria...";

    try {
      this.session = await ai.live.music.connect({
        model: model,
        callbacks: {
          onmessage: async (e: LiveMusicServerMessage) => {
            if (e.setupComplete) {
              this.connectionError = false;
              this.isConnecting = false;
              this.statusMessage = "Connected. Ready to play.";
              // Si estaba en loading y se conectó, intentar reproducir
              if (this.playbackState === 'loading') {
                 // Solo cambia a 'playing' si el usuario ya había intentado reproducir.
                 // Si se conectó y estaba en 'stopped' o 'paused', no debería auto-play.
                 // Esto se maneja mejor en handlePlayPause.
              }
            }
            if (e.filteredPrompt) {
              const newFiltered = new Set(this.filteredPrompts);
              newFiltered.add(e.filteredPrompt.text);
              this.filteredPrompts = newFiltered;
              this.toastMessage.show(`Prompt filtered: "${e.filteredPrompt.text}" - ${e.filteredPrompt.filteredReason}`);
              this.requestUpdate(); // Forzar actualización para prompt-controller
            }
            if (e.serverContent?.audioChunks !== undefined) {
              if (this.playbackState === 'paused' || this.playbackState === 'stopped') return;
              
              const audioBuffer = await decodeAudioData(
                decode(e.serverContent?.audioChunks[0].data),
                this.audioContext,
                48000, 2,
              );
              const source = this.audioContext.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(this.outputNode);

              if (this.nextStartTime === 0) { // Primera vez o después de un reset
                this.nextStartTime = this.audioContext.currentTime + this.bufferTime;
                // Transición a 'playing' después del buffer inicial
                setTimeout(() => {
                  if(this.playbackState === 'loading') this.playbackState = 'playing';
                  this.statusMessage = "Playing...";
                }, this.bufferTime * 1000);
              }

              if (this.nextStartTime < this.audioContext.currentTime) {
                console.warn("Audio desync, resetting start time.");
                this.playbackState = 'loading'; // Indicar recarga
                this.statusMessage = "Resyncing audio...";
                this.nextStartTime = this.audioContext.currentTime + this.bufferTime / 2; // Buffer más corto para resync
              }
              source.start(this.nextStartTime);
              this.nextStartTime += audioBuffer.duration;
            }
          },
          onerror: (errEvent: ErrorEvent) => {
            console.error('Lyria Session Error:', errEvent);
            this.connectionError = true;
            this.isConnecting = false;
            this.stop(); // Detener reproducción
            this.toastMessage.show('Connection error. Please try restarting audio.');
            this.statusMessage = "Connection Error";
          },
          onclose: (closeEvent: CloseEvent) => {
            console.warn('Lyria Session Closed:', closeEvent);
            this.connectionError = true;
            this.isConnecting = false;
            if (this.playbackState !== 'stopped') { // No mostrar si el usuario lo detuvo
                 this.stop();
                 this.toastMessage.show('Connection closed. Please restart audio if needed.');
                 this.statusMessage = "Connection Closed";
            }
          },
        },
      });
      // Después de una conexión exitosa, enviar los prompts actuales
      await this.setSessionPrompts();
      return true;
    } catch (error) {
      console.error("Failed to connect to Lyria session:", error);
      this.toastMessage.show(`Failed to connect: ${error instanceof Error ? error.message : String(error)}`);
      this.playbackState = 'stopped';
      this.isConnecting = false;
      this.connectionError = true;
      this.statusMessage = "Connection Failed";
      return false;
    }
  }

  private getPromptsToSend() {
    return Array.from(this.prompts.values())
      .filter((p) => !this.filteredPrompts.has(p.text) && p.weight > 0.01) // Solo enviar si el peso es significativo
      .map(p => ({ text: p.text, weight: p.weight })); // Enviar solo texto y peso
  }

  private setSessionPrompts = throttle(async () => {
    if (!this.session || this.connectionError || this.isConnecting) {
        if(this.getPromptsToSend().length > 0 && (this.playbackState === 'playing' || this.playbackState === 'loading')){
             // Si hay prompts y se supone que está reproduciendo, intentar reconectar
             // console.log("Attempting to reconnect/send prompts due to missing session or error.");
             // const connected = await this.connectToSession();
             // if (!connected) return; // No continuar si la conexión falla
        } else {
            return; // No hacer nada si no hay sesión o hay error y no se está intentando reproducir
        }
    }

    const promptsToSend = this.getPromptsToSend();
    if (promptsToSend.length === 0 && (this.playbackState === 'playing' || this.playbackState === 'loading')) {
      this.toastMessage.show('No active prompts. Music paused.');
      this.pause(); // Pausar si no hay prompts activos
      return;
    }
    
    if (promptsToSend.length > 0) {
        try {
            await this.session.setWeightedPrompts({ weightedPrompts: promptsToSend });
            // console.log("Prompts sent:", promptsToSend);
        } catch (e: any) {
            this.toastMessage.show(`Error setting prompts: ${e.message}`);
            console.error("Error setting prompts:", e);
            // No necesariamente pausar aquí, podría ser un error temporal
        }
    }
  }, 250); // Throttle más agresivo para evitar spam a la API

  private updateAudioLevel() {
    this.audioLevelRafId = requestAnimationFrame(this.updateAudioLevel);
    if (this.audioAnalyser && (this.playbackState === 'playing' || this.playbackState === 'loading')) {
      this.audioLevel = this.audioAnalyser.getCurrentLevel();
    } else {
      this.audioLevel = 0; // Resetear si no está reproduciendo
    }
  }

  private handlePromptChanged(e: CustomEvent<Prompt>) {
    const changedPrompt = e.detail;
    const prompt = this.prompts.get(changedPrompt.promptId);
    if (!prompt) {
      console.error('Prompt not found on change:', changedPrompt.promptId);
      return;
    }

    // Actualizar el prompt en el Map
    this.prompts.set(changedPrompt.promptId, { ...prompt, ...changedPrompt });
    
    // Crear un nuevo Map para forzar la actualización de Lit si es necesario
    // this.prompts = new Map(this.prompts); // Esto re-renderizaría todo el grid
    
    // En lugar de recrear el Map, solo pedimos una actualización.
    // Los prompt-controller individuales se actualizarán por sus propias propiedades.
    this.requestUpdate(); 
    this.setSessionPrompts(); // Enviar los prompts actualizados a la sesión
    // No es necesario despachar 'prompts-changed' si el estado se maneja internamente.
  }


  private makeBackground = throttle(() => {
      const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
      const MAX_WEIGHT_FOR_BG = 0.75; // Para que el efecto no sea demasiado intenso
      const MAX_ALPHA = 0.5; // Opacidad máxima del color en el gradiente

      const bg: string[] = [];
      const activePrompts = Array.from(this.prompts.values()).filter(p => p.weight > 0.01);

      activePrompts.forEach((p, i) => {
        const alphaPct = clamp01(p.weight / MAX_WEIGHT_FOR_BG) * MAX_ALPHA;
        const alphaHex = Math.round(alphaPct * 0xff).toString(16).padStart(2, '0');
        
        // Distribuir los gradientes de forma más dinámica o basada en posición en grid si es posible
        // Aquí una simple distribución cíclica para 4x4 (o similar)
        const xPos = ((i * 2) % 8) / 7 * 100; // Distribución más variada
        const yPos = (Math.floor((i*3) / 8) % 4) / 3 * 100; //
        const spread = (p.weight / 2) * 80; // El tamaño del gradiente depende del peso, hasta 80%

        const s = `radial-gradient(circle at ${xPos}% ${yPos}%, ${p.color}${alphaHex} 0px, ${p.color}00 ${spread}vmin)`;
        bg.push(s);
      });
      return bg.join(', ');
    }, 50 // Actualizar fondo con menos frecuencia
  );

  private async pause() {
    if (this.session && this.playbackState === 'playing') {
      this.session.pause();
    }
    this.playbackState = 'paused';
    this.statusMessage = "Paused";
    if (this.audioContext && this.outputNode) {
        this.outputNode.gain.setValueAtTime(this.outputNode.gain.value, this.audioContext.currentTime);
        this.outputNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.1);
    }
    // No resetear nextStartTime aquí, para poder reanudar
  }

  private async play() {
    if (!this.audioContext) this.initializeAudio(); // Asegurar contexto de audio
    await this.audioContext.resume(); // Esencial para autoplay y después de interacción del usuario

    if (this.connectionError || !this.session) {
        const connected = await this.connectToSession();
        if (!connected) {
            this.playbackState = 'stopped'; // Falló la conexión
            this.statusMessage = "Failed to connect. Can't play.";
            return;
        }
    }
    
    const promptsToSend = this.getPromptsToSend();
    if (promptsToSend.length === 0) {
      this.toastMessage.show('Add some active prompts to play music.');
      // No cambiar estado aquí, dejar que setSessionPrompts lo pause si es necesario
      this.playbackState = 'paused'; // O 'stopped' si se prefiere
      this.statusMessage = "No active prompts.";
      return;
    }

    if (this.session) {
        this.session.play(); // Play en la sesión de Lyria
    }
    
    this.playbackState = 'loading'; // Estará 'loading' hasta que llegue el primer chunk de audio
    this.statusMessage = "Starting playback...";

    if (this.outputNode) { // Asegurar que outputNode existe
        this.outputNode.gain.setValueAtTime(0, this.audioContext.currentTime); // Empezar desde 0 gain
        this.outputNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.2); // Fade in suave
    }

    // nextStartTime se manejará cuando llegue el primer chunk de audio.
    // Si ya estaba pausado y hay un nextStartTime válido, podría intentar reanudarse desde ahí,
    // pero es más simple dejar que el primer chunk lo establezca.
    if (this.playbackState === 'paused') { // Si estaba pausado, resetear para evitar desync
        this.nextStartTime = 0;
    }
  }

  private async stop() {
    if (this.session) {
      this.session.stop();
    }
    this.playbackState = 'stopped';
    this.statusMessage = "Stopped";
    if (this.audioContext && this.outputNode) {
        this.outputNode.gain.setValueAtTime(this.outputNode.gain.value, this.audioContext.currentTime);
        this.outputNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.1);
    }
    this.nextStartTime = 0; // Resetear el tiempo de inicio
    // No es necesario recrear outputNode aquí, solo se resetea el gain
  }

  private async handlePlayPause() {
    if (!apiKey) {
        this.toastMessage.show("Cannot play: GEMINI_API_KEY is not configured.");
        return;
    }
    if (!this.audioContext) this.initializeAudio();
    await this.audioContext.resume(); // Importante para navegadores que bloquean audio

    if (this.playbackState === 'playing') {
      this.pause();
    } else if (this.playbackState === 'paused' || this.playbackState === 'stopped') {
      this.play();
    } else if (this.playbackState === 'loading') { // Si está cargando y se pulsa, se interpreta como stop
      this.stop();
    }
  }

  private async toggleShowMidi() {
    this.showMidi = !this.showMidi;
    if (this.showMidi) {
      await this.refreshMidiDeviceList();
      if (this.midiInputIds.length === 0) {
          this.toastMessage.show('No MIDI input devices found. Connect a device and try again.');
      }
    }
  }

  private handleMidiInputChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newMidiId = selectElement.value;
    this.activeMidiInputId = newMidiId;
    this.midiDispatcher.activeMidiInputId = newMidiId;
    this.toastMessage.show(`MIDI Input changed to: ${this.midiDispatcher.getDeviceName(newMidiId) || 'Unknown Device'}`);
  }

  private resetAllPrompts() {
    this.prompts = buildDefaultPhonkPrompts();
    this.filteredPrompts.clear(); // Limpiar prompts filtrados
    this.requestUpdate();
    this.setSessionPrompts(); // Enviar los prompts reseteados
    this.toastMessage.show("Prompts reset to default Phonk set.");
    this.savePromptsToLocalStorage(); // Guardar los defaults
  }

  override render() {
    const bg = styleMap({ backgroundImage: this.makeBackground() });
    return html`
      <div id="background" style=${bg}></div>
      <div id="controls-bar">
        <button
          @click=${this.toggleShowMidi}
          class=${this.showMidi ? 'active' : ''}>
          MIDI ${this.showMidi && this.activeMidiInputId ? 'On' : 'Off'}
        </button>
        <select
          @change=${this.handleMidiInputChange}
          .value=${this.activeMidiInputId || ''}
          style=${this.showMidi ? '' : 'display: none;'}> <!-- Ocultar en vez de visibility para layout -->
          ${this.midiInputIds.length > 0
            ? this.midiInputIds.map(id => html`
                <option value=${id}>
                  ${this.midiDispatcher.getDeviceName(id) || `Device ${id.substring(0,6)}...`}
                </option>`)
            : html`<option value="">No MIDI devices found</option>`
          }
        </select>
        <button @click=${this.resetAllPrompts} title="Reset all prompts to Phonk defaults">
            Reset Prompts
        </button>
      </div>

      <div id="grid">
        ${[...this.prompts.values()].map((prompt) => html`
          <prompt-controller
            .promptId=${prompt.promptId}
            ?filtered=${this.filteredPrompts.has(prompt.text)}
            .cc=${prompt.cc}
            .text=${prompt.text}
            .weight=${prompt.weight}
            .color=${prompt.color}
            .midiDispatcher=${this.midiDispatcher}
            ?showCC=${this.showMidi}
            .audioLevel=${this.audioLevel}
            @prompt-changed=${this.handlePromptChanged}>
          </prompt-controller>
        `)}
      </div>
      
      <play-pause-button 
        .playbackState=${this.playbackState} 
        @click=${this.handlePlayPause}>
      </play-pause-button>
      
      <toast-message></toast-message>
      <div id="status-bar">${this.statusMessage}</div>
    `;
  }
}


// --- Funciones Helper para Prompts ---
function buildDefaultPhonkPrompts(): Map<string, Prompt> {
  const prompts = new Map<string, Prompt>();
  // Seleccionar 3-4 prompts iniciales con peso
  const initialActiveIndices = [0, 1, 5, 8]; // Ej: Beat, Bass, Eerie Synth, Ominous Textures

  DEFAULT_PHONK_PROMPTS.forEach((promptTemplate, i) => {
    const promptId = `phonk-prompt-${i}`;
    prompts.set(promptId, {
      promptId,
      text: promptTemplate.text,
      weight: initialActiveIndices.includes(i) ? 0.75 : 0, // Peso inicial para algunos
      cc: i, // Asignar CC secuencialmente
      color: promptTemplate.color,
    });
  });
  return prompts;
}

function getInitialPhonkPrompts(): Map<string, Prompt> {
  const { localStorage } = window;
  const storedPrompts = localStorage.getItem('phonkPrompts');
  if (storedPrompts) {
    try {
      const parsedPrompts = JSON.parse(storedPrompts) as Prompt[];
      // Validar que los prompts tengan todos los campos necesarios
      if (parsedPrompts.every(p => p.promptId && p.text && p.color && typeof p.weight === 'number' && typeof p.cc === 'number')) {
         console.log('Loading stored Phonk prompts', parsedPrompts);
         return new Map(parsedPrompts.map((prompt) => [prompt.promptId, prompt]));
      } else {
          console.warn('Stored Phonk prompts are malformed. Using defaults.');
          localStorage.removeItem('phonkPrompts'); // Limpiar datos corruptos
      }
    } catch (e) {
      console.error('Failed to parse stored Phonk prompts, using defaults.', e);
      localStorage.removeItem('phonkPrompts'); // Limpiar datos corruptos
    }
  }
  console.log('No stored Phonk prompts or data was invalid, using default Phonk prompts');
  return buildDefaultPhonkPrompts();
}

function setStoredPhonkPrompts(prompts: Map<string, Prompt>) {
  try {
    const storedPrompts = JSON.stringify([...prompts.values()]);
    const { localStorage } = window;
    localStorage.setItem('phonkPrompts', storedPrompts);
    console.log('Phonk prompts saved to localStorage.');
  } catch (e) {
    console.error('Failed to save Phonk prompts to localStorage:', e);
  }
}


// --- Entry Point ---
async function main(parent: HTMLElement) {
  if (!apiKey) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <h1 style="color: red; text-align: center; margin-top: 50px;">Error: GEMINI_API_KEY is not set!</h1>
      <p style="text-align: center;">Please set your API key in an .env file (GEMINI_API_KEY=YOUR_KEY) or as an environment variable.</p>
      <p style="text-align: center;">The application cannot start without it.</p>
    `;
    parent.appendChild(errorDiv);
    return;
  }

  const midiDispatcher = new MidiDispatcher();
  const initialPrompts = getInitialPhonkPrompts(); // Carga los prompts desde localStorage o los defaults

  const phonkController = new PhonkRealtimeController(
    initialPrompts,
    midiDispatcher,
  );
  
  // Guardar prompts antes de que la página se cierre
  window.addEventListener('beforeunload', () => {
    setStoredPhonkPrompts(phonkController.prompts);
  });
  
  parent.appendChild(phonkController);
}

// Asumimos que 'utils.ts' existe en la misma carpeta o se importa correctamente.
// Si no, necesitarás crear 'decode' y 'decodeAudioData'. Aquí una implementación placeholder:
// Este archivo utils.ts sería algo así:
/*
// utils.ts
export function decode(base64: string): Uint8Array {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  audioData: Uint8Array,
  audioContext: AudioContext,
  sampleRate: number,
  numberOfChannels: number,
): Promise<AudioBuffer> {
   // Esta es una simplificación. La API de Lyria devuelve OPUS encapsulado.
   // Para una decodificación real de OPUS en el navegador, necesitarías una librería como libopus.js o similar.
   // O, si la API devuelve PCM directamente (poco probable para eficiencia), podrías usar audioContext.decodeAudioData.
   // Por ahora, asumimos que el formato es compatible directamente con decodeAudioData
   // o que la API de Lyria ha cambiado para devolver un formato más simple.
   // **ESTA PARTE ES CRÍTICA Y PUEDE NECESITAR AJUSTES SEGÚN EL FORMATO REAL DE LYRIA**

  try {
    // Intenta decodificar como si fuera un formato estándar (wav, mp3, etc.)
    // Esto probablemente fallará con los chunks de Lyria que suelen ser Opus.
    return await audioContext.decodeAudioData(audioData.buffer);
  } catch (e) {
    console.warn(`Direct decodeAudioData failed (as expected for Opus): ${e}. Esto es normal si Lyria envía Opus.`);
    // Aquí es donde integrarías un decodificador Opus si fuera necesario.
    // Por ahora, creamos un buffer de silencio para que la app no se rompa totalmente.
    const durationInSeconds = 0.5; // Duración placeholder
    const length = sampleRate * durationInSeconds * numberOfChannels;
    const silentBuffer = audioContext.createBuffer(numberOfChannels, length, sampleRate);
    // Llenar con silencio (ya lo está por defecto)
    console.error("AUDIO DECODING IS A PLACEHOLDER. Lyria's Opus chunks need proper decoding.");
    return silentBuffer;
  }
}
*/


// Iniciar la aplicación
main(document.body);

// Declaraciones globales para los custom elements (igual que en el ejemplo)
declare global {
  interface HTMLElementTagNameMap {
    'phonk-realtime-controller': PhonkRealtimeController;
    'prompt-controller': PromptController;
    'weight-knob': WeightKnob;
    'play-pause-button': PlayPauseButton;
    'toast-message': ToastMessage;
  }
   // Para webkitAudioContext
   interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}