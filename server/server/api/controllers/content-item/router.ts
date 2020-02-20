/**
 * Routes for the content item end points.
 */
import express from 'express';

import controller from './controller';

export default express
  .Router()
  .get('/', controller.list)
  .get('/:id', controller.byId)
  .delete('/:id', controller.dismiss)
  .post('/reset', controller.reset);
