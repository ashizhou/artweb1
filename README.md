
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
     🚀Simple Art Social Network in NodeJs, KoaJs, Mysql stack 
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
* [Getting Started](#getting-started)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project
  
  
![](https://github.com/ashizhou/koa-artweb/blob/master/public/images/artdemo.gif)
  
  
The basic idea is that people can **create a profile**, and then **browse the art**, **commenting**, giving up or down **votes**, and **bookmark**. The idea is that it is a space for be people to explore and discuss art.

Here's why koa:
* Koa's middleware composed and executed in a stack-like manner
* Allowing to perform actions downstream then filter and manipulate the response upstream.
* No middleware are bundled


### Built With
1. Bootswatch
2. EJS
3. KoaJS
4. MySql

<!-- GETTING STARTED -->
## Getting Started

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

> database: mysql tables: users comment like  (lib/mysql.js => creat tables)

![](https://github.com/ashizhou/koa-artweb/blob/master/public/images/sql%20info.png)

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

- [ ] Post

- [ ] BookMark

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

Project Link - [repo](https://github.com/ashizhou/koa-artweb)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
  
* [koa-bodyparser](https://github.com/koajs/bodyparser)
* [koa-mysql-session](https://shields.io)
* [koa-router](https://github.com/koajs/router)
* [koa-session-minimal](https://github.com/lzztt/koa-session-minimal)
* [koa-static](https://github.com/koajs/static)
* [koa-static-cache](https://github.com/koajs/static)
* [koa-views](https://github.com/queckezz/koa-views)




