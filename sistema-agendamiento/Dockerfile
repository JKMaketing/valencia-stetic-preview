FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production DATA_DIR=/data
COPY package.json ./
# El SDK de Anthropic es opcional (solo para la IA de preguntas libres)
RUN npm install --omit=dev --no-audit --no-fund || true
COPY . .
VOLUME ["/data"]
EXPOSE 3200
CMD ["node", "--disable-warning=ExperimentalWarning", "src/server.js"]
