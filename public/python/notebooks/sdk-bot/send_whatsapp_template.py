import argparse
import os
import sys

import requests
from dotenv import find_dotenv, load_dotenv


def require_env(var_name: str) -> str:
    value = os.getenv(var_name)
    if not value:
        raise SystemExit(
            f"Falta variable requerida en .env: {var_name}. "
            f"Edita notebooks/sdk-bot/.env y vuelve a ejecutar."
        )
    return value


def build_payload_template(recipient_number: str) -> dict:
    return {
        "messaging_product": "whatsapp",
        "to": recipient_number,
        "type": "template",
        "template": {
            "name": "hello_world",
            "language": {"code": "en_US"},
        },
    }


def main() -> int:
    # Cargar .env ubicado junto al script (notebooks/sdk-bot/.env). Si no existe, intentar búsqueda ascendente.
    script_dir = os.path.dirname(os.path.abspath(__file__))
    local_env_path = os.path.join(script_dir, ".env")
    if os.path.exists(local_env_path):
        load_dotenv(local_env_path)
        print(f"Usando .env: {local_env_path}")
    else:
        env_path = find_dotenv(filename=".env", usecwd=True)
        if env_path:
            load_dotenv(env_path)
            print(f"Usando .env: {env_path}")

    parser = argparse.ArgumentParser(
        description="Enviar plantilla hello_world vía WhatsApp Cloud API"
    )
    parser.add_argument(
        "--to",
        dest="recipient",
        default=os.getenv("RECIPIENT_NUMBER", "528998733022"),
        help="Número destino en formato E.164 (por ej. 52155...)",
    )
    parser.add_argument(
        "--version",
        dest="api_version",
        default=os.getenv("CLOUD_API_VERSION", "v22.0"),
        help="Versión de Graph API (por defecto v22.0)",
    )
    args = parser.parse_args()

    phone_number_id = require_env("WA_PHONE_NUMBER_ID")
    token = require_env("CLOUD_API_ACCESS_TOKEN")
    api_version = args.api_version

    url = f"https://graph.facebook.com/{api_version}/{phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    payload = build_payload_template(args.recipient)

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        print(response.status_code)
        print(response.text)
        response.raise_for_status()
    except requests.RequestException as exc:
        print(f"Error al enviar la solicitud: {exc}")
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())

import argparse
import os
import sys

import requests
from dotenv import find_dotenv, load_dotenv


def require_env(var_name: str) -> str:
    value = os.getenv(var_name)
    if not value:
        raise SystemExit(
            f"Falta variable requerida en .env: {var_name}. "
            f"Edita notebooks/sdk-bot/.env y vuelve a ejecutar."
        )
    return value


def build_payload_template(recipient_number: str) -> dict:
    return {
        "messaging_product": "whatsapp",
        "to": recipient_number,
        "type": "template",
        "template": {
            "name": "hello_world",
            "language": {"code": "en_US"},
        },
    }


def main() -> int:
    # Carga .env buscando desde el directorio actual
    env_path = find_dotenv(filename=".env", usecwd=True)
    if env_path:
        load_dotenv(env_path)
        print(f"Usando .env: {env_path}")

    parser = argparse.ArgumentParser(
        description="Enviar plantilla hello_world vía WhatsApp Cloud API"
    )
    parser.add_argument(
        "--to",
        dest="recipient",
        default=os.getenv("RECIPIENT_NUMBER", "528998733022"),
        help="Número destino en formato E.164 (por ej. 52155...)",
    )
    parser.add_argument(
        "--version",
        dest="api_version",
        default=os.getenv("CLOUD_API_VERSION", "v22.0"),
        help="Versión de Graph API (por defecto v22.0)",
    )
    args = parser.parse_args()

    phone_number_id = require_env("WA_PHONE_NUMBER_ID")
    token = require_env("CLOUD_API_ACCESS_TOKEN")
    api_version = args.api_version

    url = f"https://graph.facebook.com/{api_version}/{phone_number_id}/messages"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    payload = build_payload_template(args.recipient)

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        print(response.status_code)
        print(response.text)
        response.raise_for_status()
    except requests.RequestException as exc:
        print(f"Error al enviar la solicitud: {exc}")
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())


