# Dinr

A Fall 2021 CS35L group project made by:\
Anmolpreet Kaur - anmolgrewal@g.ucla.edu\
Aakarsh Anand - aanand2@g.ucla.edu\
Lam Hoang - lamhoang1213@ucla.edu\
Lucian Li - lucianli@g.ucla.edu\
Mitchell Parker - mitchellparker@ucla.edu

# IMPORTANT: HOW TO RUN THIS PROJECT

## .env file

This step is very important, the project doesn't work without it.\
Create a file: /backend/.env and add this line to it:\
DB_URI=mongodb+srv://admin:hunter2@cluster0.ljdnu.mongodb.net/dinr?retryWrites=true&w=majority

It links the project to our mongoDB database. I believe you wouldn't
put this in the repository normally, but it's necessary for grading purposes.

## Installing dependencies

In case it is not obvious by the package.js, this app needs several node_modules.
Install them with `npm install` in the project directory

## Starting the server

Start the server with `npm start` in the project directory.
This will hog the terminal

Then, you can connect to it with your browser by navigating to [http://localhost:3001](http://localhost:3001)

Also if you want to provide a publicly accessible url, in a new terminal
use `npx localtunnel --port 3001` and share the url that gives you.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

This is the 'production' version of the project.

Builds and runs the app. Must have dependencies installed and .env to work.
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npx localtunnel --port 3001`

Creates a public url so anyone can connect to your local version.

First do `npm start` to start the server. Once that is running,
Open another terminal and run this command.
It will spit out a link anyone can connect to.\
This only works with
`npm start`, so do not try to use it with `start-server` and `start-client`
because it will not work.

### `npm run start-server`

Development express server

Runs just the express server on port 3001. Needs .env of course.\
Don't try to view this in your browser directly, it will serve
The most recent production build of the react app, which isn't
necessarily what you want.\
To see development changes in real time,
use this with `npm run start-client` in a different terminal,
and connect to that instead.

### `npm run start-client`

Development React client

Runs just the React app on port 3000. Connect to this at
[http://localhost:3001](http://localhost:3001)\
Pretty much useless without `npm run start-server`,
seeing as you need access to the backend to login.
To see your development changes in real time,
use this with `npm run start-server` in a different terminal,
and be sure to connect to this one on port 3000.

### `npm test`

Don't do this. We have no tests.

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Don't mess with this. It's necessary for npm start. Please don't ask why.

Builds the React app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
