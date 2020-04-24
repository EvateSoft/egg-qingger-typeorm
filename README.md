# egg-qingger-typeorm

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-qingger-typeorm.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-qingger-typeorm
[travis-image]: https://img.shields.io/travis/eggjs/egg-qingger-typeorm.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-qingger-typeorm
[codecov-image]: https://img.shields.io/codecov/github/eggjs/egg-qingger-typeorm.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-qingger-typeorm?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-qingger-typeorm.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-qingger-typeorm
[snyk-image]: https://snyk.io/test/npm/egg-qingger-typeorm/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-qingger-typeorm
[download-image]: https://img.shields.io/npm/dm/egg-qingger-typeorm.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-qingger-typeorm

<!--
Description here.
-->

## Install

```bash
$ npm i egg-qingger-typeorm --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.qinggerTypeorm = {
  enable: true,
  package: 'egg-qingger-typeorm',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
// see detail : http://typeorm.io/#/connection-options
exports.qinggerTypeorm = {
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "test",
   "password": "test",
   "database": "test",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ]
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```javascript
    // @see detail : http://typeorm.io/
    // save object
    const photo = new Photo();
    photo.name = 'P1';
    photo.fileName = 'p1.png';
    photo.isPublished = true;
    photo.views = 0;
    let ret = await this.app.qinggerTypeorm.manager.save(photo);
    
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).


## Update
```bash
注意，不使用dist目录下编译的文件
$ tsc
$ git add . / git commit
$ npm config set registry https://registry.npmjs.org/
$ npm login  
$ npm whoami
$ npm version patch / minor / major
$ npm publish
$ npm logout
$ git push
```

## License

[MIT](LICENSE)
