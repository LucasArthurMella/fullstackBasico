FROM node:20 as build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "serve:ssr:front"]


