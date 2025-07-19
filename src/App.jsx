// import React from "react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import "./App.css";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   authService
  //     .getCurrentUser()
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(login(userData));
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     // if user is not logged in then in that conditon get current user fucntion does not works to handle that condition catch is required and in catch condition we can update the state as logout
  //     // .catch((error) => {
  //     //   console.log(`User not logged in yet `, error.message);
  //     //   dispatch(logout()) ;
  //     // })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);



  useEffect(() => {
    
  const getUserData = async () => {
    try {
      const user = await authService.getCurrentUser()
      .then((userData) => {
        if (userData)
        {
          dispatch(login(userData)) ;
        }
        else{
          dispatch(logout()) ;
        }
      })
      .finally(() => {
        setLoading(false) ;
      })
    } catch (error) {
      console.log(`User not logged in, skipping getCurrentUser()`);
      dispatch(logout()) ;
    }
  }
    getUserData() ;
  }, [])
  

  // return <>Blog website with appwrite</>;
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div
        className="w-full block"
      >
        <Header />
        <main>
          {/* We need to Handel after sttting up the react router  */}
          {/* ot after completing the routing */}
          {/* <Outlet /> */}
          ToDo: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
