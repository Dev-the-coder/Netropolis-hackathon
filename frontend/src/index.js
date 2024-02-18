import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// {const sectionSearch = document.querySelector(".searchbox");
// const observer = new IntersectionObserver(
//   () => {
//     alert("hii");
//   },
//   {
//     root: null,
//     rootMargin: "",
//     threshold: 0,
//   }
// );

// observer.observe(sectionSearch);}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
