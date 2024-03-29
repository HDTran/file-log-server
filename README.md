# File Log Server

Basic Express Application that accepts a `POST` to write to a `log.txt` file on port `3000`.

## Installation and Setup

```sh
npm install
npm start
```

## Usage

`POST` to `/` with `message` defined in the `x-www-form-urlencoded`, for example:

```sh
curl -d "message=test" -X POST http://localhost:3000/
```

## Quick Deployment

For quick deployment, consider running the server with `pm2` and reverse-proxy with an Nginx file such as the following:

```nginx
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  root /var/www/html;

  # Add index.php to the list if you are using PHP
  index index.html index.htm index.nginx-debian.html;

  server_name _;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # Assume all logs are *.txt or *.log and repository checked out to /home/ubuntu/file-log-server/
  location ~ \.(txt|log) {
    root /home/ubuntu/file-log-server/;
  }
}
```
