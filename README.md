# Quiver Cast

## Installation

Front-end environments

1. Edit `app/environments/app-env.dev.js`
2. Edit `app/environments/app-env.prod.js`

Firebase Functions environments

1. Edit `app/functions/environments/functions-env.test.js`
2. Edit `app/functions/environments/functions-env.test.js`

### Make sure to base64 encode your service-acount.json file

See [Export secret file to Gitlab pipeline](https://medium.com/@michalkalita/export-secret-file-to-gitlab-pipeline-75789eee35bd)

### Set the environment variables in your CI/CD environment

- FIREBASE_TOKEN, obtained by running `yarn ci:login` from inside the `dev` container.
- FIREBASE_DATABASE_URL
- SERVICE_ACCOUNT_BASE64

# Certbot

See [@pentacent's article on Certbot with Docker Compose](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71)

You have to serve Chromecast apps from HTTPS. I've configured an nginx reverse proxy and a certbot server in this project.

Run `docker-compose run certbot` to create or renew your certs. You may need to change `local.chrisesplin.com` in both `dev/certbot/scripts/challenge.sh` and `dev/nginx/app.conf`

Huge props to [Nic Raboy](https://twitter.com/nraboy) for [this article on Docker Compose reverse proxies](https://www.thepolyglotdeveloper.com/2017/03/nginx-reverse-proxy-containerized-docker-applications/)

