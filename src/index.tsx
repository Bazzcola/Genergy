import * as React from 'react';
import ReactDOM from 'react-dom';
import { CreateRouter } from 'estafette-router';
import { routes } from 'router/routes';
import { Main } from 'components/templates/Main/Main';
import { ProviderContext } from 'context/Context';

import './index.scss';

ReactDOM.render(
  <ProviderContext>
    <CreateRouter routes={routes}>
      <Main />
    </CreateRouter>
  </ProviderContext>,
  document.getElementById('root')
);
