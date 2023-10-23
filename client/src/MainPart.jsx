import React from 'react';
import Toolbar from './components/Toolbar';
import Settingsbar from './components/Settingsbar';
import Canvas from './components/Canvas';

const MainPart = () => {
  return (
    <>
        <Toolbar />
        <Settingsbar />
        <Canvas />
    </>
  )
}

export default MainPart