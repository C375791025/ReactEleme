import React from 'react';
import {BrowserRouter} from 'react-router-dom'

import One from './one';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <One></One>
      </BrowserRouter>
    </div>
  );
}

export default App;
