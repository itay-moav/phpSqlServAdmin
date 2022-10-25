import React from 'react';
import {Routes,Route} from "react-router-dom";
import Layout from "./components/layout";
import { Counter } from './features/counter/Counter';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="servers" element={<h2>servers</h2>} />
        <Route path="servers/:server" element={<h2>aserver</h2>} />
        <Route path="servers/:server/databases" element={<h2>databases</h2>} />
        <Route path="servers/:server/databases/:database" element={<h2>a databases</h2>} />
        <Route path="servers/:server/databases/:database/tables" element={<h2>tables</h2>} />
        <Route path="servers/:server/databases/:database/tables/:table" element={<h2>a table</h2>} />


        <Route path="text" element={    
              <div className="App">
              <header className="App-header">
                <Counter />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <span>
                  <span>Learn </span>
                  <a
                    className="App-link"
                    href="https://reactjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    React
                  </a>
                  <span>, </span>
                  <a
                    className="App-link"
                    href="https://redux.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Redux
                  </a>
                  <span>, </span>
                  <a
                    className="App-link"
                    href="https://redux-toolkit.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Redux Toolkit
                  </a>
                  ,<span> and </span>
                  <a
                    className="App-link"
                    href="https://react-redux.js.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    React Redux
                  </a>
                </span>
              </header>
            </div>
        } />
      </Route>
      <Route path="*" element={<h2>WTF have you gone?!</h2>} />

    </Routes>
  );
}

export default App;
