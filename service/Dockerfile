FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/public ./dist/public
EXPOSE 8008
CMD ["node", "dist/index.js"]