
# Art Social Network
[![time tracker](https://wakatime.com/badge/github/ashizhou/artweb1.svg)](https://wakatime.com/badge/github/ashizhou/artweb1)
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ashizhou/koa-artweb">
    <img src="public/images/artlogo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Art Social Network</h3>

  <p align="center">
     🚀Simple Art Social Networ in Node.js, Koa2.js, Mysql stack 
    <br />
    <a href="https://github.com/ashizhou/koa-artweb"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ashizhou/koa-artweb">View Demo</a>
    ·
    <a href="https://github.com/ashizhou/koa-artweb/issues">Report Bug</a>
    ·
    <a href="https://github.com/ashizhou/koa-artweb/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

![](https://github.com/ashizhou/koa-artweb/public/images/artdemo.gif)

The basic idea is that people can create a profile, and then browse the art, commenting, giving up or down votes, or whatever you decide. The idea is that it is a space for be people to explore and discuss art.

Here's why koa:
* Koa's middleware composed and executed in a stack-like manner
* Allowing to perform actions downstream then filter and manipulate the response upstream.
* No middleware are bundled


### Built With
* [Bootswatch](https://bootswatch.com/)
* [EJS](https://ejs.co/)
* [KoaJS](https://koajs.com/)
* [MySql](https://www.mysql.com/)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
* mysql
* art.sql

### Installation

1. Clone the repo
```sh
git clone https:://github.com/ashizhou/koa-artweb.git
```
2. Install NPM packages
```sh
npm install
```
3. Setup MySql in `config.js`
```
$ mysql -u root -p
$ create database mysql;
$ use mysql;
```
4. Run
```
$ npm install -g pm2
$ pm2 start index.js
```


<!-- USAGE EXAMPLES -->
## Usage

> database: mysql  tables: users comment like  (lib/mysql.js => creat tables)

|   users  	| comment 	| likes 	|    art    	|
|:--------:	|:-------:	|:-----:	|:---------:	|
|    id    	|    id   	|   id  	|     id    	|
|   name   	|   name  	|  name 	|   Author  	|
|   pass   	| content 	| artid 	|  BornDiec 	|
|  avator  	|  moment 	|       	|   Title   	|
|    job   	|  artid  	|       	|    Date   	|
|  company 	|  avator 	|       	| Technique 	|
|  introdu 	|         	|       	|  Location 	|
| userhome 	|         	|       	|    Url    	|
|  github  	|         	|       	|    Form   	|
|          	|         	|       	|   School  	|
|          	|         	|       	| Timeframe 	|
|          	|         	|       	|     pv    	|
|          	|         	|       	|  comments 	|
|          	|         	|       	|   likes   	|


<!-- ROADMAP -->
## Roadmap
- [x] User 

- [x] About

- [x] Profile

- [x] Home Side Navigation 

- [x] Pagination

- [x] Vote & Comment | hot reloader page

- [ ] Search

- [ ] Recommend



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Contact

Ashi Zhou - zhou1@kenyon.edu

Project Link: [https://github.com/ashizhou/koa-artweb](https://github.com/ashizhou/koa-artweb]



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [koa-bodyparser](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [koa-mysql-session](https://shields.io)
* [koa-router](https://choosealicense.com)
* [koa-session-minimal](https://pages.github.com)
* [koa-static](https://daneden.github.io/animate.css)
* [koa-static-cache](https://connoratherton.com/loaders)
* [koa-views](https://kenwheeler.github.io/slick)




