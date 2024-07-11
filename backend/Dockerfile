FROM node:20.11.1
WORKDIR /usr/code
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]