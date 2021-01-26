FROM node:13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install \
  npm install react-scripts@3.4.0 -g

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
