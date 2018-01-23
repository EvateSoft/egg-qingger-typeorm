'use strict';

const mock = require('egg-mock');

describe('test/qingger-typeorm.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/qingger-typeorm-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, qinggerTypeorm')
      .expect(200);
  });
});
