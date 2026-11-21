FROM node:22-alpine

WORKDIR /workspace

ENV NODE_OPTIONS=--max-old-space-size=4096 \
    NPM_CONFIG_CACHE=/tmp/.npm

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4321

CMD ["sh", "-c", "npm run build && npm run preview"]
