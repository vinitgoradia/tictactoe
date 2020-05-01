import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MultiplayerBoard } from './MultiplayerBoard.component';
import { NavigateAppComponent } from './NavigateApp.component';

function App() {
  return (
    <div className="App"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: '100%'
    }}>
      <NavigateAppComponent/>
    </div>
  );
}

export default App;
