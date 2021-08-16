import React from 'react'
import DataProvider from './components/DataProvider';
import Weather from './components/Weather'


function App() {
  
  return (
    <DataProvider>
      <div className="App">
      <Weather/>
    </div>
    </DataProvider>
  );
}

export default App;
