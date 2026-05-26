FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY frontend .

EXPOSE 4000

CMD ["npm", "start"]