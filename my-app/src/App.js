import React,{Component} from 'react';
import {BrowserRouter} from 'react-router-dom'

import One from './one';


export class App extends Component {
  

  render() {
    return (
      <div className="App">
        <BrowserRouter>
           <One></One>
        </BrowserRouter>
      </div>
    );
  }
}

export default App


// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//          <One></One>
//       </BrowserRouter>
//       <CdyLogin/>
//     </div>
//   );
// }

// export default App;
