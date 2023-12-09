FROM node:iron-alpine
FROM mcr.microsoft.com/playwright:v1.34.0-jammy

WORKDIR /app

COPY . .

RUN npm install
RUN npm prune --production

CMD ["npm", "run", "start"]
