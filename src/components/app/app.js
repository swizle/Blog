import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import './app.scss';

import { testAction } from '../../actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(testAction('work'));
  }, [dispatch]);

  return (
    <Router>
      <header>
        <h1>Hello world!</h1>
      </header>
      <main>
        <section className="container">
          <Link to="/test">Test</Link>
          <Routes>
            <Route
              path="/test"
              element={<h1>Work!</h1>}
            />
          </Routes>
        </section>
      </main>
    </Router>
  );
}

export default App;
