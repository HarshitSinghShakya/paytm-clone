import {Route,Routes,BrowserRouter} from "react-router-dom";
import {Signup} from "./page/Signup";
import {Signin} from "./page/Signin";
import {Dashboard} from "./page/Dashboard";
import {SendMoney} from "./page/SendMoney";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<SendMoney/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
