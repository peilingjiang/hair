import React, { useState } from 'react'

import SetColor from './components/setColor/setColor'
import MySketch from './components/mySketch/mySketch'

import './App.css'

const debug = false

function App() {
  const [colorState, setColorState] = useState(debug ? '#00d1ff' : null)

  const handleSetColor = color => {
    setColorState(color)
  }

  return (
    <div className="App">
      {colorState === null ? (
        <SetColor handleSetColor={handleSetColor} />
      ) : (
        <MySketch color={colorState} />
      )}
    </div>
  )
}

export default App
