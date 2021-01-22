import 'jest';
import * as request from 'supertest';
import { app } from '../src/index';

const CONTROLLER_URL = '/v1/picture';
const CORRECT_BODY = {
  "image": "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"
}

describe('POST ' + CONTROLLER_URL, () => {
  test('/png/10/10 with correct body respond with status 200', (done) => {
    request(app)
      .post(CONTROLLER_URL + '/png/10/10')
      .send(CORRECT_BODY)
      .set('Accept', 'application/json')
      .expect(200, done);
  })

  test('/jpg/10/10 with correct body respond with status 200', (done) => {
    request(app)
      .post(CONTROLLER_URL + '/jpg/10/10')
      .send(CORRECT_BODY)
      .set('Accept', 'application/json')
      .expect(200, done);
  })

  test('/jpg/10/10 with bad body respond with status 400', (done) => {
    request(app)
      .post(CONTROLLER_URL + '/jpg/10/10')
      .send({
        "image": false
      })
      .set('Accept', 'application/json')
      .expect(400, done);
  })

  test('/aaa/10/10 with correct body respond with status 400', (done) => {
    request(app)
      .post(CONTROLLER_URL + '/aaa/10/10')
      .set('Accept', 'application/json')
      .expect(400, done);
  })

  test('/jpg/2137/10 with correct body respond with status 400', (done) => {
    request(app)
      .post(CONTROLLER_URL + '/aaa/10/10')
      .set('Accept', 'application/json')
      .expect(400, done);
  })

  test('/jpg/10/2137 with correct body respond with status 400', (done) => {
    request(app)
      .post(CONTROLLER_URL + '/aaa/10/10')
      .set('Accept', 'application/json')
      .expect(400, done);
  })
})