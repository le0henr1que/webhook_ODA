
FROM node:14 AS build


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm ci


COPY . .


RUN npm run build


FROM node:14-slim


WORKDIR /usr/src/app


COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env.production ./.env

ENV NODE_ENV=production


RUN npm ci --only=production


EXPOSE 3000


CMD ["node", "dist/server.js"]