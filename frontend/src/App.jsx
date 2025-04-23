import { BrowserRouter } from 'react-router-dom'
import Root from './routes'
import { useEffect, useState } from 'react';
import LoadingSpinner from './components/loading/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <BrowserRouter>
        <LoadingSpinner>
          <Root />
        </LoadingSpinner>
        <ToastContainer
          autoClose={3000}
          style={{
            top: '100px',        // 화면 상단에서 10px 떨어진 위치
          }}
        />
      </BrowserRouter>
    </>
  )
}

export default App;
