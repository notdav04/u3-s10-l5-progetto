import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./components/Home";
import CustomNavbar from "./components/CustomNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./components/Details";
function App() {
  return (
    <>
      <BrowserRouter>
        <CustomNavbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:lat/:lon" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
