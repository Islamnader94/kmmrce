FROM node

WORKDIR /app/frontend
COPY package.json /app/frontend

RUN npm install

RUN mkdir -p /app/frontend/node_modules/.cache && chmod -R 777 /app/frontend/node_modules/.cache

EXPOSE 3000
CMD ["npm", "start"]