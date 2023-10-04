import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './reducer';

import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container);

const store = configureStore({ reducer });

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
