FROM node:20.13.1-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20.13.1-alpine AS release
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY --from=build /app/dist ./dist

EXPOSE 4000
ENV NODE_ENV=production
CMD ["node", "dist/main"]
