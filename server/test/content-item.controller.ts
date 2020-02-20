import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('ContentItems', () => {
  it('should get the first page with content items', () =>
    request(Server)
      .get('/api/v1/content-item?page_no=0&page_size=10')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body.items)
          .to.be.an('array')
          .of.length(10);
      }));

  it('should get a content item by id', () =>
    request(Server)
      .get('/api/v1/content-item/2')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('id')
          .equal(2);
      }));

  it('should dismiss a content item by id', () =>
    request(Server)
      .delete('/api/v1/content-item/2')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('id')
          .equal(2);

        expect(r.body)
          .to.be.an('object')
          .that.has.property('dismissed')
          .equal(true);
      }));
});
