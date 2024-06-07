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
          <div className="flex-none w-20 h-7">
            <NavLink to="/login" className="text-white">
              Login
            </NavLink>
          </div>

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
          {/* <Route path="/daily" component={DailyExpenses} /> */}
        </Switch>
      </Router>





    </>
    // <>
    //   <Login/>
    //   <div>
    //     <div className="box float-left bg-gray-400 w-1/5 min-h-screen">
    //       <button  
    //       className="w-4/5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg text-center p-2.5 m-3.5" >
    //       Compose</button>

    //       <ul class="list-none text-gray-700 text-base">
    //       <li className="m-3 px-6">UnRead</li>

    //       <li className="m-3 px-6">Started</li>

    //       <li className="m-3 px-6">Draft</li>

    //       <li className="m-3 px-6">Sent</li>
          
    //       <li className="m-3 px-6">Archive</li>

    //       <li className="m-3 px-6">Spam</li>
          
    //       <li className="m-3 px-6">Delete</li>

    //       </ul>

        
    //       <Menu as="div" className="relative inline-block text-left float-right m-3.5 ">
    //   <div>
    //     <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
    //       Options
    //       <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
    //     </MenuButton>
    //   </div>

    //   <Transition
    //     enter="transition ease-out duration-100"
    //     enterFrom="transform opacity-0 scale-95"
    //     enterTo="transform opacity-100 scale-100"
    //     leave="transition ease-in duration-75"
    //     leaveFrom="transform opacity-100 scale-100"
    //     leaveTo="transform opacity-0 scale-95"
    //   >
    //     <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //       <div className="py-1">
    //         <MenuItem>
    //           {({ focus }) => (
    //             <a
    //               href="#"
    //               className={classNames(
    //                 focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    //                 'block px-4 py-2 text-sm'
    //               )}
    //             >
    //               Edit
    //             </a>
    //           )}
    //         </MenuItem>
    //         </div>
    //         <div className="py-1">
    //         <MenuItem>
    //           {({ focus }) => (
    //             <a
    //               href="#"
    //               className={classNames(
    //                 focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    //                 'block px-4 py-2 text-sm'
    //               )}
    //             >
    //               Duplicate
    //             </a>
    //           )}
    //         </MenuItem>
    //       </div>
    //       <div className="py-1">
    //         <MenuItem>
    //           {({ focus }) => (
    //             <a
    //               href="#"
    //               className={classNames(
    //                 focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    //                 'block px-4 py-2 text-sm'
    //               )}
    //             >
    //               Archive
    //             </a>
    //           )}
    //         </MenuItem>
    //         <MenuItem>
    //           {({ focus }) => (
    //             <a
    //               href="#"
    //               className={classNames(
    //                 focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
    //                 'block px-4 py-2 text-sm'
    //               )}
    //             >
    //               Move
    //             </a>
    //           )}
    //         </MenuItem>
    //       </div>
        

    //     </MenuItems>
    //   </Transition>
    // </Menu>
      

    //     </div>

    //     <div className="float-right bg-slate-100 w-4/5 min-h-screen">main</div>
    //   </div>
    // </>
  );
}

export default App;
