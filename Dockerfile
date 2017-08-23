FROM node:latest

COPY . /app

WORKDIR app

CMD ["npm", "install"]

CMD ["node", "./index.js"]



