import { useRoutes } from "react-router-dom";
import Home from "./components/home";
import Addtask from "./components/addtasks";
import Alltasks from "./components/alltasks";
import Signup from "./components/signup";
import Login from "./components/login";
import Navbar from "./components/navbar";
import View from "./components/view";
import Update from "./components/update";
import LoginWithOTP from "./components/loginwithotp";



function App() {

  let routes=useRoutes([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/addtask",
      element:<Addtask/>
    },
    {
      path:"/alltasks",
      element:<Alltasks/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/alltasks/viewtask/:_id",
      element:<View/>
    },
    {
      path:"/alltasks/updatetask/:_id",
      element:<Update/>
    },
    {
      path:"/loginwithotp",
      element:<LoginWithOTP/>
    }
  ])
  return (
    <div >
    <Navbar navpath={{url1:"/",url2:"/addtask",url3:"/alltasks",url4:"/login",url5:"/signup"}} />

        {routes}


    
    </div>
  );
}

export default App;
