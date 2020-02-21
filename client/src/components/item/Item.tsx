/**
 * The item component.
 */
import * as React from 'react';
import { 
  Button, Typography, 
  Card, CardMedia, CardContent
} from '@material-ui/core';

import { ContentItemModel } from '../../models/ContentItemModel';

import './Item.css';

/**
 * Interface for the component properties.
 */
interface Props {
  item: ContentItemModel;
  onSchedule?: (item: ContentItemModel) => void;
  onDismiss?: (item: ContentItemModel) => void;
}

/**
 * Component function.
 * 
 * @param props component properties
 */
function Item(props: Props): JSX.Element {
  const {item, onSchedule, onDismiss} = props;

  /**
   * Schedules item.
   */
  const schedule = React.useCallback(
    (): void => {
      if (onSchedule) {
        onSchedule(item);
      }
    },
    [item, onSchedule]
  )

  /**
   * Dismisses item.
   */
  const dismiss = React.useCallback(
    (): void => {
      if (onDismiss) {
        onDismiss(item);
      }
    },
    [item, onDismiss]
  )

  /**
   * Renders component.
   */
  const render = (): JSX.Element => {
    return (
      <Card className='item'>
        <div className='details'>
          <CardMedia
            image={item.imageUrl}
            title={item.title}
            className='image'
          />

          <CardContent className='content'>
            <Typography gutterBottom variant="h6" component="h6">
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Link:&nbsp;
              <a href={item.pageUrl} target='_blank' rel='noreferrer noopener'>
                {item.pageUrl}
              </a>
            </Typography>
          </CardContent>

          {(onSchedule || onDismiss) &&
          <CardContent className='content button-panel'>
            <div className='buttons'>
              {onSchedule && 
              <Button onClick={schedule} color='primary' variant='contained'>
                Schedule
              </Button>
              }
              {onDismiss &&
              <Button onClick={dismiss} variant='contained' >
                Dismiss
              </Button>
              }
            </div>
          </CardContent>
          }
        </div>
      </Card>
    );
  };

  return render();
}

export default Item;
