FROM node:latest as livraria-angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN  npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=livraria-angular app/dist/buscante /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


# docker build -t livraria-buscante .
# docker run -p 8081:80 livraria-buscante

