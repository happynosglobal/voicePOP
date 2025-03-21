import { BrowserRouter } from 'react-router-dom'
import Root from './routes'
import { useEffect, useState } from 'react';

function App() {

  return (
    <>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </>
  )
}

export default App;
