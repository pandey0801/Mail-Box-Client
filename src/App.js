// import logo from './logo.svg';
// import './App.css';
import Login from "./component/Login";

// import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Compose from "./component/Compose";
import Home from "./component/Home";
import LogOut from "./component/LogOut";

import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";

import { useSelector } from "react-redux";



// function classNames(...classes) {
  // return classes.filter(Boolean).join(' ')
// }


function App() {


  const auth = useSelector((state) => state.log);

  console.log(auth.islogin);

  let isLoggedIn = auth.islogin;
  // console.log(isLogdedIn);



  return (
    <>
    <Router>
        <nav className="p-3 flex bg-black justify-center items-center">
          <div className="flex-none w-20 h-7">
            <NavLink to="/home" className="text-white">
              Home
            </NavLink>
          </div>
          
         { !isLoggedIn && ( <div className="flex-none w-20 h-7">
            <NavLink to="/login" className="text-white">
              Login
            </NavLink>
          </div>)}

  {isLoggedIn && ( <div className="flex-none w-20 h-7">
            <NavLink to="/compose" className="text-white">
              Compose
            </NavLink>
          </div>)}       

{isLoggedIn && (<div className="flex-none w-20 h-7">
            <NavLink to="/logout" className="text-white">
              LogOut
            </NavLink>
          </div>)}
          
        </nav>

        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={LogOut}/>
          <Route path="/compose" component={Compose} />
        </Switch>
      </Router>
    </>

  );
}

export default App;
