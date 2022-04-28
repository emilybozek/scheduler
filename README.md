# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Project Description

A single-page scheduling app that allows users to create, edit, and delete appointments. To create an appointment a user chooses a time, an available interviewer, and inputs their name to book. The number of remaining spots for that day updates when a user makes a change to the appointments.

### Adding an Interview

![Adding an interview](https://github.com/feltfan/scheduler/blob/master/docs/addappointment.gif?raw=true)

### Editing an Interview

![Editing an interview](https://github.com/feltfan/scheduler/blob/master/docs/editappointment.gif?raw=true)

### Deleting an Interview

![Deleting an interview](<https://github.com/feltfan/scheduler/blob/master/docs/deleteappointment(1).gif?raw=true>)

### Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### API Server and Database Setup

To Implement Database and Server:

- Start by forking and cloning the scheduler-api server: https://github.com/lighthouse-labs/scheduler-api
- Follow the steps outlined in README to setup the database
- Run `npm start` to start the server

## Dependencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
