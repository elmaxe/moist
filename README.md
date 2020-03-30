# bukket
A project for the [DH2642](https://www.kth.se/student/kurser/kurs/DH2642) course using the [Trefle API](https://trefle.io/).

Created by Axel Elmarsson and Douglas Fischer.

---
# Description
bukket is an interactive bucket list app . You get random suggestions of activities to add to your bucket list. You can organize your bucket list items: filter, sort, mark as done, etc. We get activity suggestions from the API. We store everything in our own database.

# Done
* Fully functional registration and login system based on `Sqlite3`
* Basic bucket list functions
* Api calls that generate random tasks

# TODO
* User interaction
* Option to add custom bucket list items
* Ability to mark items as done
* List filtering and sorting

# Project file structure

| File              						      | Description                           |
|-------------------------------------------------|---------------------------------------|
| index.html            						  | The only html file in the app. (SPA)  |
| index.js           			  				  | Root js file. Sets up redux and app.  |
| routes.js           			 				  | Defines the routes of the app.        |
| serviceWorker.js     							  | Autogenerated by create-react-app.    |
| actions/user.js      						      | Actions for user.                     |
| reducers/index.js     						  | Root reducer. Combines all reducers.  |
| reducers/user.js      						  | User reducer.                         |
| components/App/App.js 						  | Handles app routing.                  |
| components/Home/Home.js 						  | Homepage. (logged in users). Manage bucket list from here                    |
| components/Landing/Landing.js 				  | Homepage. (not logged in users). registration and login.                    |
| components/Login/Login.js						  | Login container.                     |
| components/NotFound/Notfound.js 				  | View that renders on invalid path.                     |
| components/ProtectedRoute/ProtectedRoute.js 	  | Higher order component. Makes sure that to access the component, the user is logged in. Redirects to landing otherwise                    |
| components/Register/Register.js 				  | Register container.                     |
| components/UnprotectedRoute/UnprotectedRoute.js | the inverse of ProtectedRoute.                     |
| components/Accounts/Accounts.js 				  | Shows account info and settings.                     |
| components/Logout/Logout.js 					  | Handles logout when mounted. Renders nothing.                     |
| components/Bar/Bar.js				 			  | Navbar component for logged-in users.                     |
| Images/spinner.gif 							  | spinner.                     |
| Images/profile1600x1600.png 				      | default profile picture.                     |







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
There are currently no environment variables required to run the project:

| Variable              | Description                           | Default                       |
|-----------------------|---------------------------------------|-------------------------------|
| ----                  | ------                                | ---                           |
---
# Documentation
* [Bored API](https://www.boredapi.com/)
* [bukkit API](/server/api.md)
