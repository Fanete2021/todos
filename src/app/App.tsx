import React from 'react';
import { Todos } from '../components/widgets';
import './App.css';

function App() {
  return (
    <div className="App">
      <div
        className="app__title"
      >
        todos
      </div>

      <div
        className="app__content"
      >
        <Todos />
      </div>
    </div>
  );
}

export default App;
