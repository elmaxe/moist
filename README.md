# moist
A project for the [DH2642](https://www.kth.se/student/kurser/kurs/DH2642) course using the [Trefle API](https://trefle.io/).

Created by Axel Elmarsson and Douglas Fischer.

---
# Description
Lorem ipsum

---
# Installation
* `Sqlite3` is used for the backend database
* `Redis` is used for cookie storage together with `express-session`

## Prerequisites
1. Install `Node.js` by running `sudo apt-get install nodejs`
2. Install `sqlite3` by running `sudo apt-get install sqlite3`
3. Install `redis` by running `sudo apt-get install redis-server`
   1. Check that `redis` is running: `sudo service redis-server status`
   2. If not, run: `redis-server`

## Development
1. Clone this repository
2. Run `npm install` in both `/server` and `/client`
3. Run `npm start` in both `/server` and `/client`

Frontend is at `localhost:3000`<br>
Backend is at `localhost:4000`

## Deploying
1. Clone this repository
2. Run `npm install` in both `/server` and `/client`
3. Run `npm run build` in `/server`
3. Run `node app.js` in `/server`

Hosts a HTTP-server on `localhost:4000`<br>

---
# Required Environment tables
The following environment variables are required to run the project:

| Variable              | Description                           | Default                       |
|-----------------------|---------------------------------------|-------------------------------|
| REEE                  | REEEEE                                | ---                           |
---
# Documentation
* [Trefle API](https://trefle.io/)
* [Moist API](/server/api.md)
