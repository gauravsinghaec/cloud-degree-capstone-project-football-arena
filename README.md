# Footballers Arena Project (Containerised App)

In this project, I am refactoring my footballers monolith app(https://github.com/gauravsinghaec/footballers-arena-mern) that allows you to find all the footballers and their details e.g club, country age etc. You can edit the players details as well if you find the detail are outdated. To perform any modification, you have to login to the application.

## Table of Contents

- [Footballers Arena Project (Containerised App)](#footballers-arena-project-containerised-app)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Project URL](#project-url)
    - [Screenshots](#screenshots)
  - [Tech stack](#tech-stack)
  - [Folder Structure](#folder-structure)
  - [Prerequisites](#prerequisites)
  - [How to launch the app locally?](#how-to-launch-the-app-locally)
    - [Installation](#installation)
  - [Resources](#resources)
  - [Authors](#authors)
  - [Acknowledgments](#acknowledgments)

## Getting Started
The app shows the players listings on the homepage and you can view the details about each players by clicking on them.

To get started right away:
* start the development server with `docker-compose up`

## Project URL

### Screenshots
![homepage](https://user-images.githubusercontent.com/15084301/45930171-1e4bce80-bf7a-11e8-804f-83e619ffcbda.png)

## Tech stack
K8s, AWS EKS, AWS RDS (Postgres), React, Node

## Folder Structure
After creation, your project should look like this:
```bash
├── README.md
├── travis.yml # CI integrations
├── docker-compose-build.yaml # To build docker images locally
├── docker-compose.yaml # To run all the docker container
├── env-configmap.yaml # Env variables for backend server in K8s
├── env-secret.yaml # Env secrets for backend server in K8s
├── set_env_sample.sh # You can source this file in mac terminal to set all env at once 
├── screensots # Project run capture
├── deploy # K8s deployment and services for all microservices
├── fa-user-server # Server having code for authentication(signin, signup)
├── fa-player-server # Server having code for players actions(create,edit,delete,update)
├── fa-reverseproxy # nginx reverseproxy
└── fa-frontend # Frontend code for react components
```

## Prerequisites
* ES6, Promises, REACT, Postgres, Webpack, Node, Express, HTTP requests

## How to launch the app locally?
docker-compose up
### Installation

1. Clone the Project - `https://github.com/gauravsinghaec/footballers-arena-mern.git`
2. Go into the directory where the project now lives - `cd footballers-arena-mern`
3. Install the dependencies - `npm install`
4. Start the app - `npm start`
```
The application will be running at http://localhost:3000 URL
```

## Resources
* [Cloud Developer Nanodegree](https://www.udacity.com/course/cloud-developer-nanodegree--nd9990)
* [Pagination reference](https://jsmegatools.com/2017/12/09/creating-a-pagination-component-with-react-js/)
* [Creating your first MERN stack application](https://hackernoon.com/episode-43-the-art-of-setting-up-a-mern-stack-final-project-week-d554bffe2c0e)

## Authors
* **Gaurav Singh**

## Acknowledgments
* **Special thanks to [Udacity](https://www.udacity.com/) Team**
