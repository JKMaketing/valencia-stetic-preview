# Dockerfile para un Space de Hugging Face (SDK Docker). Descarga el repositorio público y arranca la demo.
FROM node:24-slim
RUN apt-get update && apt-get install -y --no-install-recommends git ca-certificates && rm -rf /var/lib/apt/lists/*
RUN useradd -m -u 1000 user
USER user
WORKDIR /home/user
# Cambia el valor de REPO_REF (o haz «Factory rebuild») para traer la última versión del repositorio.
ARG REPO_REF=main
RUN git clone --depth 1 --branch ${REPO_REF} https://github.com/JKMaketing/valencia-stetic-preview.git app
WORKDIR /home/user/app/sitio-web-reservas
ENV MODO_DEMO=1 NODE_ENV=production DEMO_PORT=7860
EXPOSE 7860
CMD ["node", "demo.mjs"]
