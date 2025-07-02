import { BrowserRouter } from "react-router-dom";
import Root from "./routes";
import LoadingSpinner from "./components/loading/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
            top: "100px",
          }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
