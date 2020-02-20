/**
 * Application-wise router.
 */
import { Application } from 'express';

import contentItemRouter from './api/controllers/content-item/router';

export default function routes(app: Application): void {
  app.use('/api/v1/content-item', contentItemRouter);
}
