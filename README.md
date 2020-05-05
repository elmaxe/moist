# bukket
A project for the [DH2642](https://www.kth.se/student/kurser/kurs/DH2642) course using the [Bored API](https://www.boredapi.com/).

Created by Axel Elmarsson and Douglas Fischer.

## Why is this repo called moist?
We changed project plan in the middle of the assignment because the previous API we used sucked.

---
# Description
Bukket is an interactive bucket list app . We combine the Bored API with our own database to generate random tasks which you can add to your bukketlists.  That is, Bukket randomly suggest activities from either the API or the data in our database. Users can create their own activities which they can store in our database if they want to.

You can manage several bukketlists and view other users' bukketlists and profiles.

# Features
* Fully functional registration and login system.
* Basic bucket list functions: addition and removal of both bukketlists and activities. Bukketlists can be private or public.
* Api calls that generate random task from either the API or our database.
* User page: profile picture, user description, bukketlists and their activities.

# Project file structure

| File              						      | Description                           |
|-------------------------------------------------|---------------------------------------|
| server/           						  | Contains the backend server  |
| client/           						  | Contains the React app  |
| client/components           						  | Contains the components and views of the app |
| client/actions           						  | Contains the redux actions |
| client/reducers           						  | Contains the redux reducers  |

---
# Installation
* `Sqlite3` is used for the backend database
* `Redis` is used for cookie storage together with `express-session`

## Prerequisites
### Linux
1. Install `Node.js` by running `sudo apt-get install nodejs`
2. Install `sqlite3` by running `sudo apt-get install sqlite3`
3. Install `redis` by running `sudo apt-get install redis-server`
   1. Check that `redis` is running: `sudo service redis-server status`
   2. If not, run: `redis-server`

### Windows
Why?

## Development
1. Clone this repository
2. Run `npm install` in both `/server` and `/client`
3. Run `npm start` in both `/server` and `/client`

Frontend is at `localhost:3000`<br>
Backend is at `localhost:8002`

## Deploying
1. Clone this repository
2. Run `npm install` in both `/server` and `/client`
3. Run `npm run build` in `/server`
3. Run `node app.js` in `/server`

Hosts a HTTP-server on `localhost:8002`<br>

---
# Documentation
* [Bored API](https://www.boredapi.com/)
* [bukkit API](/server/api.md)
