FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

COPY public/ ./
COPY src/ ./src/

EXPOSE 80
