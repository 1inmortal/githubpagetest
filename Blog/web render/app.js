// app.js
// Aether Player - Visualización 3D reactiva y UI animada
// Requiere interacción del usuario para iniciar el AudioContext por políticas de los navegadores modernos.
// El AudioContext solo puede iniciarse tras una acción del usuario (clic, toque, etc.) para evitar bloqueos automáticos de reproducción.

import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';

class AetherPlayer {
  constructor() {
    // Elementos DOM
    this.canvas = document.getElementById('bg-canvas');
    this.overlay = document.getElementById('initial-overlay');
    this.playlistItems = document.querySelectorAll('.playlist-item');
    this.songTitle = document.getElementById('song-title');
    this.artistName = document.getElementById('artist-name');
    this.btnPrev = document.getElementById('btn-prev');
    this.btnPlayPause = document.getElementById('btn-play-pause');
    this.btnNext = document.getElementById('btn-next');
    this.currentSongIndex = 0;
    this.isPlaying = false;
    this.songs = Array.from(this.playlistItems).map(item => ({
      url: item.getAttribute('data-song'),
      color: item.getAttribute('data-color'),
      title: item.querySelector('h3').textContent,
      artist: item.querySelector('p').textContent
    }));

    // Three.js
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.geometry = null;
    this.material = null;
    this.originalPositions = [];

    // Audio
    this.audioContext = null;
    this.audioListener = null;
    this.audio = null;
    this.audioLoader = null;
    this.analyser = null;
    this.audioSource = null;
    this.frequencyData = null;

    // Inicialización
    this.initScene();
    this.initAudio();
    this.initGSAPAnimations();
    this.addEventListeners();
    this.animate = this.animate.bind(this);
  }

  initScene() {
    // Escena y cámara
    this.scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 120;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Partículas
    const numParticles = 2000;
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numParticles * 3);
    this.originalPositions = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 40 + Math.random() * 30;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      this.originalPositions[i * 3] = x;
      this.originalPositions[i * 3 + 1] = y;
      this.originalPositions[i * 3 + 2] = z;
    }
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.material = new THREE.PointsMaterial({
      color: parseInt(this.songs[0].color),
      size: 2.2,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    this.particles = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.particles);

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  initAudio() {
    // No inicializar el AudioContext hasta interacción del usuario
    this.audioContext = null;
    this.audioListener = null;
    this.audio = null;
    this.audioLoader = null;
    this.analyser = null;
    this.audioSource = null;
    this.frequencyData = null;
  }

  startAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.audioListener = new THREE.AudioListener();
      this.audio = new THREE.Audio(this.audioListener);
      this.audioLoader = new THREE.AudioLoader();
      this.analyser = new THREE.AudioAnalyser(this.audio, 128);
      this.frequencyData = new Uint8Array(this.analyser.analyser.frequencyBinCount);
      this.loadAndPlaySong(this.currentSongIndex);
    }
  }

  loadAndPlaySong(index) {
    const song = this.songs[index];
    if (!this.audioLoader) return;
    this.audioLoader.load(song.url, (buffer) => {
      this.audio.setBuffer(buffer);
      this.audio.setLoop(false);
      this.audio.setVolume(0.7);
      this.audio.play();
      this.isPlaying = true;
      this.updateSongInfo(index);
    });
    // Cambia el color de las partículas
    gsap.to(this.material.color, {
      r: ((parseInt(song.color) >> 16) & 0xff) / 255,
      g: ((parseInt(song.color) >> 8) & 0xff) / 255,
      b: (parseInt(song.color) & 0xff) / 255,
      duration: 1.2,
      ease: 'power2.inOut'
    });
  }

  updateSongInfo(index) {
    const song = this.songs[index];
    gsap.to([this.songTitle, this.artistName], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        this.songTitle.textContent = song.title;
        this.artistName.textContent = song.artist;
        gsap.to([this.songTitle, this.artistName], {
          opacity: 1,
          y: 0,
          duration: 0.4
        });
      }
    });
  }

  initGSAPAnimations() {
    // Animación de entrada de paneles
    gsap.set('.playlist-panel', { x: 200, opacity: 0 });
    gsap.set('.player-controls', { y: 100, opacity: 0 });
    // Se animan tras ocultar el overlay
  }

  addEventListeners() {
    // Overlay inicial: inicia el AudioContext tras clic
    this.overlay.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.startAudioContext();
      gsap.to('.playlist-panel', { x: 0, opacity: 1, duration: 1, ease: 'power3.out' });
      gsap.to('.player-controls', { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
      this.animate();
    });

    // Playlist click
    this.playlistItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        if (idx === this.currentSongIndex) return;
        const tl = gsap.timeline();
        tl.to([this.songTitle, this.artistName], { opacity: 0, y: 20, duration: 0.3 })
          .to(this.material.color, {
            r: ((parseInt(this.songs[idx].color) >> 16) & 0xff) / 255,
            g: ((parseInt(this.songs[idx].color) >> 8) & 0xff) / 255,
            b: (parseInt(this.songs[idx].color) & 0xff) / 255,
            duration: 1.2,
            ease: 'power2.inOut'
          }, '<')
          .add(() => {
            this.currentSongIndex = idx;
            this.loadAndPlaySong(idx);
          }, '>-0.5')
          .to([this.songTitle, this.artistName], { opacity: 1, y: 0, duration: 0.4 });
      });
    });

    // Botones de control
    this.btnPrev.addEventListener('click', () => {
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
      this.loadAndPlaySong(this.currentSongIndex);
    });
    this.btnNext.addEventListener('click', () => {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
      this.loadAndPlaySong(this.currentSongIndex);
    });
    this.btnPlayPause.addEventListener('click', () => {
      if (!this.audio) return;
      if (this.isPlaying) {
        this.audio.pause();
        this.isPlaying = false;
        this.btnPlayPause.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="8,6 26,16 8,26" fill="currentColor"/></svg>`;
      } else {
        this.audio.play();
        this.isPlaying = true;
        this.btnPlayPause.innerHTML = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="6" width="5" height="20" fill="currentColor"/><rect x="19" y="6" width="5" height="20" fill="currentColor"/></svg>`;
      }
    });
  }

  animate() {
    requestAnimationFrame(this.animate);
    if (this.analyser && this.audio && this.audio.isPlaying) {
      this.analyser.getFrequencyData();
      const freq = this.analyser.data;
      const positions = this.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        const fIdx = Math.floor((i / (positions.length / 3)) * freq.length);
        const factor = 1 + (freq[fIdx] / 255) * 0.7;
        positions[i * 3] = this.originalPositions[i * 3] * factor;
        positions[i * 3 + 1] = this.originalPositions[i * 3 + 1] * factor;
        positions[i * 3 + 2] = this.originalPositions[i * 3 + 2] * factor;
      }
      this.geometry.attributes.position.needsUpdate = true;
    }
    this.renderer.render(this.scene, this.camera);
  }
}

// Instancia principal
window.addEventListener('DOMContentLoaded', () => {
  new AetherPlayer();
}); 