
import logging
import os

from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup
)

from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters
)

import responses

# Token privado configurado en Windows
API_KEY = os.getenv("TELEGRAM_BOT_TOKEN")

# Dirección pública de SIGEA
SIGEA_URL = "https://tamararojas38.github.io/SIGEA/"

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)


# Botón para ingresar a SIGEA
def crear_teclado():
    teclado = [
        [
            InlineKeyboardButton(
                "🌐 Ingresar a SIGEA",
                url=SIGEA_URL
            )
        ]
    ]

    return InlineKeyboardMarkup(teclado)


# Comando inicial
async def start_command(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):
    await update.message.reply_text(
        "¡Hola! Soy el asistente virtual de SIGEA.\n\n"
        "Puedo orientarte sobre los módulos del sistema "
        "y ayudarte con consultas.\n\n"
        "También podés ingresar directamente a SIGEA "
        "utilizando el siguiente botón:",
        reply_markup=crear_teclado()
    )


# Procesar mensajes
async def handle_message(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):
    texto_usuario = update.message.text

    respuesta = responses.handle_response(texto_usuario)

    await update.message.reply_text(
        respuesta,
        reply_markup=crear_teclado()
    )


# Iniciar el bot
def main():

    if not API_KEY:
        raise ValueError(
            "No se encontró el token TELEGRAM_BOT_TOKEN."
        )

    app = Application.builder().token(API_KEY).build()

    app.add_handler(
        CommandHandler("start", start_command)
    )

    app.add_handler(
        MessageHandler(
            filters.TEXT & ~filters.COMMAND,
            handle_message
        )
    )

    print("BOT SIGEA iniciado correctamente...")

    app.run_polling()


if __name__ == "__main__":
    main()
