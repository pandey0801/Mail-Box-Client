// import Login from "./component/Login";
// import Compose from "./component/Compose";
// import Home from "./component/Home";
// import LogOut from "./component/LogOut";

// import {
//   BrowserRouter as Router,
//   Switch,
//   NavLink,
//   Route,
//   Redirect,
// } from "react-router-dom";

// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { useSelector } from "react-redux";

// function App() {
//   const auth = useSelector((state) => state.log);
//   let isLoggedIn = auth.islogin;

//   return (
//     <>
//       <Router>
//         <nav className="p-3 flex bg-black justify-center items-center">
//           <div className="flex-none w-20 h-7">
//             <NavLink to="/home" className="text-white">
//               Home
//             </NavLink>
//           </div>

//           {!isLoggedIn && (
//             <div className="flex-none w-20 h-7">
//               <NavLink to="/login" className="text-white">
//                 Login
//               </NavLink>
//             </div>
//           )}

//           {isLoggedIn && (
//             <div className="flex-none w-20 h-7">
//               <NavLink to="/compose" className="text-white">
//                 Compose
//               </NavLink>
//             </div>
//           )}

//           {isLoggedIn && (
//             <div className="flex-none w-20 h-7">
//               <NavLink to="/logout" className="text-white">
//                 LogOut
//               </NavLink>
//             </div>
//           )}
//         </nav>

//         <Switch>
//         <Route path="/" exact>
//           <Redirect to="/home" />
//         </Route>
//           <Route path="/home" exact component={Home} />
//           <Route path="/login" component={Login} />
//           <Route path="/logout" component={LogOut} />
//           <Route path="/compose" component={Compose} />
//         </Switch>
//       </Router>
//     </>
//   );
// }

// export default App;


import Login from "./component/Login";
import Compose from "./component/Compose";
import Home from "./component/Home";
import LogOut from "./component/LogOut";

import {
  BrowserRouter as Router,
  Routes,
  NavLink,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.log);
  let isLoggedIn = auth.islogin;

  return (
    <>
      <Router>
        <nav className="p-3 flex bg-black justify-center items-center">
          <div className="flex-none w-20 h-7">
            <NavLink to="/home" className="text-white">
              Home
            </NavLink>
          </div>

          {!isLoggedIn && (
            <div className="flex-none w-20 h-7">
              <NavLink to="/login" className="text-white">
                Login
              </NavLink>
            </div>
          )}

          {isLoggedIn && (
            <div className="flex-none w-20 h-7">
              <NavLink to="/compose" className="text-white">
                Compose
              </NavLink>
            </div>
          )}

          {isLoggedIn && (
            <div className="flex-none w-20 h-7">
              <NavLink to="/logout" className="text-white">
                LogOut
              </NavLink>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/compose" element={<Compose />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
