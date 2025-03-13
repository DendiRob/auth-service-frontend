FROM node:22-alpine3.21
WORKDIR /frontend


COPY . .

RUN npm install && npm cache clean --force
RUN npm run build


ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3001

CMD ["npm", "run", "start:prod"]

EXPOSE 3001