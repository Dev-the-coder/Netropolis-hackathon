// import React,{useEffect} from "react";
// import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
// import './App.css';

// import Navbar from "./components/navbar";
// import Footer from "./components/Footer";
// import Register from './components/register';
// import Home from "./components/Home";
// import PostQuest from "./components/PostQuest";
// import Applications from "./components/Applicatons";
// import CMRegister from "./components/CMregistrationform";
// import Login from "./components/Login";
// import CMLogin from "./components/CMlogin";
// import Myapplication from "./components/Myapplications";
// import Questpage from "./components/Questpage";
// import CMDashboard from "./components/Community_manager_dashbord";

// function App() {
//   return (
//     <>
//     {/* <Navbar/> */}
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Home/>} />
//         <Route path='/cm' element={<CMDashboard/>} />
//         <Route path='/register' element={<Register/>} />
//         <Route path='/cmregister' element={<CMRegister/>} />
//         <Route path='/login' element={<Login/>} />
//         <Route path='/cmlogin' element={<CMLogin/>} />
//         <Route path='/postquest' element={<PostQuest/>}  />
//         {/* <Route path='/itempage/:itemId' element={<ItemPage/>}  /> */}
//         <Route path='/applications/:questId' element={<Applications/>}  />
//         <Route path='/myapplications' element={<Myapplication/>}  />
//         <Route path='/footer' element={<Footer/>}/>
//         <Route path='/questpage' element={<Questpage/>}/>
//       </Routes>
//     </BrowserRouter>
//     {/* <Footer/> */}
//     </>
//   );
// }

// export default App;


import React from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;

