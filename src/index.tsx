import * as React from 'react';
import ReactDOM from 'react-dom';
import { CreateRouter } from 'estafette-router';
import { routes } from 'router/routes';
import { Main } from 'components/templates/Main/Main';

import './index.scss';

ReactDOM.render(
  <CreateRouter routes={routes}>
    <Main />
  </CreateRouter>,
  document.getElementById('root')
);
