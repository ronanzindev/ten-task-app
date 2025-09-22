FROM node:20.13.1 AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.13.1-alpine AS release
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/next.config.ts ./next.config.ts

EXPOSE 3000
CMD ["npm", "start"]
