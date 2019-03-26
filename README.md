[![Build Status](https://travis-ci.org/bstavroulakis/vue-spa.svg?branch=master)](https://travis-ci.org/bstavroulakis/vue-spa)

# CPF && CNPJ Validator

This is a simple validator, to save, delete, retrieve and blacklist
cpf and cnpj.

To use this repo first run:

$ `npm install` <br><br>

- If any problem with node-sass occurs, just run `npm i node-sass` that it will work

Then if its not already initialized, start <b>mongod</b>
service <br> with:

$ `sudo service mongod start` --> Ubuntu <br>
$ `brew services start mongodb` --> Mac


To run dev mode: <br><br>
$ `npm run dev` <br><br>
To run tests: <br><br>
$ `npm run test` <br><br>
To run production files: <br><br>
$ `npm run start:prod`<br><br>

<hr>

### Project Frameworks and Design Choices

This project uses _Vuejs_ in front and _Nodejs/Express_ in the backend <br>
with _MongoDB_ as NoSQL server.<br><br>
Starting with the backend, it was aimed to be as simple as possible, <br>
just to support the front-end needs, that's why it does the job of serving
the static file of the front-end as also running the **REST** API. <br>
The front-end uses _Vue_ and _Vuex_ as a way to keep all the important data
in one place. <br>
The model of front mimics the model of the back, that is an object holding
the current view type and a list of certifications.
```
const state = {
  type: '',
  certifications: []
}
```
For the styling the chosen framework is _Bulma_ because its lighter then the others frameworks



