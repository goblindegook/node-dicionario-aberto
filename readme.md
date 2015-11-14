# dicionario-aberto [![Build Status](https://travis-ci.org/goblindegook/node-dicionario-aberto.svg?branch=master)](https://travis-ci.org/goblindegook/node-dicionario-aberto)

Query the [Dicionário Aberto](http://dicionario-aberto.net) project API using a promisified (A+ compliant) interface.

## Install

```
$ npm install --save dicionario-aberto
```


## Usage

The `search()` and `define()` methods return promises to the objects deserialized from Dicionário Aberto's JSON responses.

```js
var DicionarioAberto = require('dicionario-aberto')();

DicionarioAberto.define('a')
	.then(function(entry) {
		//=> Object
	});

DicionarioAberto.search({'prefix': 'a'})
	.then(function(results) {
		//=> Object
	});

DicionarioAberto.search({'suffix': 'z'})
	.then(function(results) {
		//=> Object
	});

DicionarioAberto.search({'prefix': 'a', 'suffix': 'z'})
	.then(function(results) {
		//=> Object
	});

DicionarioAberto.search({'like': 'a'})
	.then(function(results) {
		//=> Object
	});
```

## API

### dicionarioAberto([options])

Factory function that creates a new Dicionário Aberto client object which provides `search()` and `define()` methods to query the Dicionário Aberto API.

#### options

Can be used to compose the created object.

##### baseUrl

Type: `string`  
Default: `http://dicionario-aberto.net/search-json`

Base URL for the Dicionário Aberto RESTful API.

## License

MIT © [Luís Rodrigues](https://github.com/goblindegook)
