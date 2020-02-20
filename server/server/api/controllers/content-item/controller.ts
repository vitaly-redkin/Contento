/**
 * Controller for teh content item end points.
 */
import { Request, Response } from 'express';

import ContentItemService from '../../services/content-item.service';
import { parseInt } from '../../util/util';

export class Controller {
  /**
   * Retuns a list of content items.
   * @param req request to handle
   * @param res response to provide
   */
  list(req: Request, res: Response): void {
    const pageNo = parseInt(req.query['page_no'], 0, 0);
    const pageSize = parseInt(req.query['page_size'], 10, 1, 100);
    ContentItemService.list(pageNo, pageSize).then(r => res.json(r));
  }

  /**
   * Retuns a content item by the the given ID.
   * @param req request to handle
   * @param res response to provide
   */
  byId(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id']);
    ContentItemService.byId(id).then(r => {
      if (r) {
        res.json(r);
      } else {
        res.status(404).end();
      }
    });
  }

  /**
   * Dismisses the content item.
   * @param req request to handle
   * @param res response to provide
   */
  dismiss(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id']);
    ContentItemService.dismiss(id).then(r => {
      if (r) {
        res.json(r);
      } else {
        res.status(404).end();
      }
    });
  }

  /**
   * Resets the content items.
   * @param req request to handle
   * @param res response to provide
   */
  reset(req: Request, res: Response): void {
    ContentItemService.reset().then(() => res.json({}));
  }
}

export default new Controller();
