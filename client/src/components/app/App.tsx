/**
 * Application main component.
 */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '../routes/Routes';

/**
 * Component function.
 */
function App(): JSX.Element {
  /**
   * Renders the component.
   */
  const render = (): JSX.Element => (
    <BrowserRouter >
      <Routes /> 
    </BrowserRouter> 
  );

  return render();
}

export default App;
