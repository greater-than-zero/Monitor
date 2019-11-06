import { ipcRenderer, IpcRendererEvent } from 'electron';
import React from 'react';
import './App.css';
import logo from './logo.svg';
import { Button } from '@material-ui/core';

const App: React.FC = () => {
  ipcRenderer.on('world', (event: IpcRendererEvent, arg1: string) => {
    alert(arg1);
  })
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button variant="outlined" color="primary" onClick={() => { ipcRenderer.send('hello', '456') }}>
          Hello
        </Button>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
