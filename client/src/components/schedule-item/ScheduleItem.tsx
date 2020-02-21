/**
 * The schedule item component.
 */
import * as React from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { parseInt } from '../../util/Util';
import { ContentItemModel } from '../../models/ContentItemModel';
import { ServiceError } from '../../service/BaseService';
import { ContentItemService } from '../../service/ContentItemService';
import Item from '../item/Item';

import './ScheduleItem.css'


/**
 * Component initial state. 
 */
const initialState = {
  item: undefined as ContentItemModel | undefined,
  error: '',
};

/**
 * Interface for the component state object.
 */
type State = typeof initialState;

/**
 * Type for reducer actions.
 */
type Action =
 | { type: 'SET_ITEM'; result: ContentItemModel }
 | { type: 'SET_ERROR'; error: ServiceError }


/**
 * Component state reducer.
 * 
 * @param state current state
 * @param action action to process
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ITEM':
      return {
        ...state,
        item: action.result,
        error: '',
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error.userMessage,
      }
    }
}

/**
 * Component function.
 * 
 * @param props component properties
 */
function ScheduleItem(): JSX.Element {
  const { id } = useParams();
  const itemId: number = parseInt(id, -1);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  /**
   * Handles API call error.
   * 
   * @param error API error to handle
   */
  const onError = React.useCallback(
    (error: ServiceError): void => {
      console.log(error);
      dispatch({type: 'SET_ERROR', error});
    },
    []
  );

  /**
   * Handles content item list page fetching success.
   * 
   * @param result API result to process
   */
  const onGetContentItemByIdSuccess = React.useCallback(
    (result: ContentItemModel): void => {
      dispatch({type: 'SET_ITEM', result})
    },
    []
  );

  /**
   * Loads content to shos.
   */
  const loadItem = React.useCallback(
    (): void => {
      new ContentItemService().getContentItemById(
        itemId,
        onGetContentItemByIdSuccess,
        onError
      );
    },
    [itemId, onGetContentItemByIdSuccess, onError]
  );

  /**
   * Loads content item to show.
   */
  React.useEffect(
    (): void => {
      loadItem();
    },
    [loadItem]
  );  

  /**
   * Renders content item to schedule.
   */
  const renderItem = (): JSX.Element | null => {
    if (state.item) {
      return (
        <>
          <Item item={state.item} />
          <Alert variant='filled' severity='warning'>
            We are hard at work to provide this functionality. Please be patient...
          </Alert>
        </>
      );
    } else {
      return null;
    }
  }

  /**
   * Renders component.
   */
  const render = (): JSX.Element => {
    return (
      <Container maxWidth='md' className='schedule-item'>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              Schedule Content Item
            </Typography>
          </Toolbar>
        </AppBar>

        <div className='body-container'>
          <div className='body'>
            {state.error ? (
            <Alert variant='filled' severity='error'>
              {state.error}
            </Alert>
            ) : 
            state.item ? (
              renderItem()
            ) : (
            <Alert variant='filled' severity='info'>
              Loading data - please wait...
            </Alert>
            )
            }
          </div>
        </div>
      </Container>
    );
  };

  return render();
}

export default withRouter(ScheduleItem);
