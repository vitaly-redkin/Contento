/**
 * The item list component.
 */
import * as React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, IconButton, Container, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import ShowMoreIcon from '@material-ui/icons/ExpandMore';
import ResetIcon from '@material-ui/icons/Refresh';

import { composeScheduleItemPath } from '../../util/AppRoutes';
import { ContentItemModel } from '../../models/ContentItemModel';
import { ServiceError } from '../../service/BaseService';
import { ContentItemService, ContentItemListResult } from '../../service/ContentItemService';
import Item from '../item/Item';

import './ItemList.css'

/**
 * Content item page size.
 */
const PAGE_SIZE = 10;

/**
 * Component initial state. 
 */
const initialState = {
  items: Array<ContentItemModel>(),
  isLoading: true,
  error: '',
  pageNo: 0,
  totalItemCount: 0,
  scrollToEnd: false,
  redirectPath: '',
};

/**
 * Interface for the component state object.
 */
type State = typeof initialState;

/**
 * Type for reducer actions.
 */
type Action =
 | { type: 'RESET' }
 | { type: 'ADD_PAGE_DATA'; result: ContentItemListResult }
 | { type: 'SHOW_NEXT_PAGE' }
 | { type: 'SET_ERROR'; error: ServiceError }
 | { type: 'SCHEDULE'; id: number }
 | { type: 'DISMISS'; id: number }
 | { type: 'CLEAR_SCROLL_TO_END' };


/**
 * Component state reducer.
 * 
 * @param state current state
 * @param action action to process
 */
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESET': 
      return {...initialState, pageNo: -1};
    case 'ADD_PAGE_DATA':
      return {
        ...state,
        items: [
          ...state.items, 
          ...action.result.items.filter(ni => !state.items.find(i => i.id === ni.id))],
        pageNo: (action.result.pageNo > state.pageNo ? action.result.pageNo : state.pageNo),
        isLoading: false,
        error: '',
        totalItemCount: action.result.totalItemCount,
        scrollToEnd: true,
      }
    case 'SHOW_NEXT_PAGE': {
      let pageNo: number = Math.ceil(state.items.length / PAGE_SIZE);
      if (pageNo >= state.pageNo && pageNo * PAGE_SIZE < state.items.length) {
        pageNo = state.pageNo;
      } else if (pageNo >= state.pageNo && pageNo * PAGE_SIZE > state.items.length) {
        pageNo = Math.max(state.pageNo - 1, 0);
      }

      return {
        ...state,
        isLoading: true,
        pageNo: pageNo,
      }
    }
    case 'SET_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error.userMessage,
      }
    case 'SCHEDULE':
      return {
        ...state,
        redirectPath: composeScheduleItemPath(action.id),
      }
    case 'DISMISS':
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.id),
        totalItemCount: Math.max(state.totalItemCount - 1, 0),
      }
    case 'CLEAR_SCROLL_TO_END':
      return {
        ...state,
        scrollToEnd: false,
      }
    }
}

/**
 * Component function.
 * 
 * @param props component properties
 */
function ItemList(): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const bottomDivRef = React.useRef<HTMLDivElement>(null);

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
  const onFetchContentItemSuccess = React.useCallback(
    (result: ContentItemListResult): void => {
      dispatch({type: 'ADD_PAGE_DATA', result})
    },
    []
  );

  /**
   * Loads next content item list page.
   */
  const loadNextPage = React.useCallback(
    (): void => {
      if (state.pageNo >= 0) {
        new ContentItemService().fetchContentItems(
          state.pageNo,
          PAGE_SIZE,
          onFetchContentItemSuccess,
          onError
        );
      } else {
        dispatch({type: 'SHOW_NEXT_PAGE'});
      }
    },
    [state.pageNo, onFetchContentItemSuccess, onError]
  );

  /**
   * Dismisses content item.
   */
  const scheduleContentItem = React.useCallback(
    (item: ContentItemModel): void => {
      dispatch({type: 'SCHEDULE', id: item.id});
    },
    []
  );

  /**
   * Dismisses content item.
   */
  const dismissContentItem = React.useCallback(
    (item: ContentItemModel): void => {
      new ContentItemService().dismisContentItemById(
        item.id,
        () => null,
        onError
      );

      // Do the "optimistic processing" - if the API call fails the error will be shown
      dispatch({type: 'DISMISS', id: item.id});
    },
    [onError]
  );

  /**
   * Shows next page with the content items;
   */
  const showNextPage = React.useCallback(
    (): void => {
      dispatch({type: 'SHOW_NEXT_PAGE'});
    },
    []
  );

  /**
   * Resets the componet state after API call to reset the content items succeed.
   */
  const onResetSuccess = React.useCallback(
    (): void => {
      dispatch({type: 'RESET'});
    },
    []
  );
  
  /**
   * Resets the content items.
   */
  const reset = React.useCallback(
    (): void => {
      new ContentItemService().resetContentItems(
        onResetSuccess,
        onError
      );
    },
    [onResetSuccess, onError]
  );

  /**
   * Scrolls to the end of the item list.
   */
  React.useLayoutEffect(
    (): void => {
      if (state.scrollToEnd && state.pageNo > 0
      ) {
        setTimeout(
          (): void => {
            if (bottomDivRef.current) {
              bottomDivRef.current.scrollIntoView();
            }
          },
          100
        )
        dispatch({type: 'CLEAR_SCROLL_TO_END'});
      }
    },
    [state.scrollToEnd, state.pageNo]
  );

  /**
   * Loads next content item list page when the page number si changed.
   */
  React.useEffect(
    (): void => {
      if (state.isLoading) {
        loadNextPage();
      }
    },
    [state.isLoading, loadNextPage]
  );

  /**
   * Renders content item list.
   */
  const renderList = (): JSX.Element => {
    const itemsLeft: number = state.totalItemCount - state.items.length;

    return (
      <>
        {state.items.map(ci => (
          <Item key={ci.id}
                item={ci}
                onSchedule={scheduleContentItem}
                onDismiss={dismissContentItem}
          />
        ))}
        {itemsLeft > 0 && 
        <>
          <Button onClick={showNextPage} 
                  title={`Show the next ${Math.min(PAGE_SIZE, itemsLeft)} content items`}
                  disabled={state.isLoading}
                  variant='contained'
                  className='next-page-button'
          >
            <ShowMoreIcon fontSize='large' />
          </Button>
        </>
        }
        <div ref={bottomDivRef}/>
      </>
    );
  };

  /**
   * Renders component.
   */
  const render = (): JSX.Element => {
    if (state.redirectPath) {
      return (
        <Redirect to={state.redirectPath} push={true} />
      );
    }

    return (
      <Container maxWidth='md' className='item-list'>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              Content Items to Schedule or Dismiss ({state.items.length} of {state.totalItemCount})
            </Typography>
            <IconButton onClick={reset} className='reset-button' title='Reset the dismissed status'>
              <ResetIcon fontSize='large' />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className='body-container'>
          <div className='body'>
            {state.isLoading ? (
            <Alert variant='filled' severity='info'>
              Loading data - please wait...
            </Alert>
            ) : state.error ? (
            <Alert variant='filled' severity='error'>
              {state.error}
            </Alert>
            ) : (
              null
            )
            }
            {state.totalItemCount > 0 && renderList()}
          </div>
        </div>
      </Container>
    );
  };

  return render();
}

export default withRouter(ItemList);
