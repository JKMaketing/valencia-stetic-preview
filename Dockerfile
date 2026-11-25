# Preview de Valencia Stetic (web de reservas + asistente + demo) en un contenedor.
# Funciona en Render, Hugging Face Spaces (Docker), Fly.io, Railway, etc. Solo necesita Node 24 (sin instalar paquetes).
FROM node:24-slim
WORKDIR /app
COPY . .
RUN useradd -m -u 1000 user && chown -R user:user /app
USER user
WORKDIR /app/sitio-web-reservas
# La demo usa una base de datos de prueba (se borra al reiniciar), no envía nada a WhatsApp y deja el panel bloqueado.
ENV MODO_DEMO=1 NODE_ENV=production
# El hosting define PORT (Render) o se usa 7860 (Hugging Face Spaces).
ENV DEMO_PORT=7860
EXPOSE 7860
CMD ["node", "demo.mjs"]
