/**
 * The component to contain routes.
 */
import * as React from 'react';
import { Switch, Redirect, Route, RouteComponentProps, withRouter } from 'react-router-dom';

import { AppRoutes } from '../../util/AppRoutes';
import ItemList from '../item-list/ItemList';
import ScheduleItem from '../schedule-item/ScheduleItem';

/**
 * Component function.
 * 
 * @param props component properties
 */
function Routes(props: RouteComponentProps<{}>): JSX.Element {
  /**
   * Renders component.
   */
  const render = (): JSX.Element => {
    return (
      <Switch>
        <Route path={AppRoutes.ScheduleItem} component={ScheduleItem} exact={true} />
        <Route path={AppRoutes.ItemList} component={ItemList} exact={true} />
        <Redirect to={AppRoutes.ItemList} />
      </Switch>
    );
  };

  return render();
}

export default withRouter(Routes);
