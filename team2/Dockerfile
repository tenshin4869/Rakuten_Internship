FROM node:20.12.2

WORKDIR /app

COPY package*.json ./

RUN npm install -g firebase-tools

RUN npm install && npm install -D tailwindcss postcss autoprefixer

RUN npm install firebase

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]


