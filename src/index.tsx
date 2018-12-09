import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import * as React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
