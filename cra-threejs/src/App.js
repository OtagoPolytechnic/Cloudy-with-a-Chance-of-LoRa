import React from 'react';
import './App.css';
import Temp from './components/temp';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cloudy With a chance of lora</h1>
        <Temp/>
      </header>
    </div>
  );
}

export default App;
