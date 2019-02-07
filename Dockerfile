 #Pull a pre-built alpine docker image with nginx and python3 installed
FROM tiangolo/uwsgi-nginx:python3.6-alpine3.7

# web ports
ENV LISTEN_PORT=8000
EXPOSE 8000

# mysqlclient
RUN apk add mariadb-dev build-base

# Indicate where uwsgi.ini lives
ENV UWSGI_INI uwsgi.ini

# Copy the app files to a folder and run it from there
WORKDIR /app
ADD . /app

RUN chmod g+w /app

# Make sure dependencies are installed
RUN python3 -m pip install -r requirements.txt