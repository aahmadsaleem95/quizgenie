import React from "react";
import ReactDOM from "react-dom/client";
/*
--- parcel things
HMR - Hot Module Replacement
File Watcher algorithm - C++
Bundling
Minify
cleaning our code console.log
Dev and prodution build
super fast build algorithm
IMage optimization
Caching while development
compressing
older versions Compatible
it also adds polyfills
HTTPS on dev
manages port number
conistent hashing algorithm
zero config
-- we have package manager to take care of 
transitive dependency
*/
/* Commands
 npx parcel index.html
npx parcel index.html --https
npx parcel build index.html
 npm i react-dom
 npm i react
npm i -D parcel
npm init */
// const root = document.getElementById('root');

// const h1 = document.createElement('h1');
// h1.innerText = "Hello World";
// console.log('H1', h1);

// root.appendChild(h1)

const root = document.getElementById("root");

// const h1 = React.createElement('h1',{key:"1",className:"top_heading", style:{"backgroundColor":"red"}}, "Hello World!");
// const h2 = React.createElement('h2',{key:"2", className:"simple_text"}, "Hello Naina!");
const nav = React.createElement("li", { key: "1" }, "home");
const nav_1 = React.createElement("li", { key: "2" }, "about");
const nav_2 = React.createElement("li", { key: "3" }, "services");
const nav_3 = React.createElement("li", { key: "4" }, "contact us");
const text = React.createElement(
  "p",
  { key: "5", style: { backgroundColor: "orange", padding: "20px" } },
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
);
const footer = React.createElement(
  "h4",
  {
    key: "6",
    style: {
      backgroundColor: "black",
      color: "white",
      padding: "40px",
      display: "flex",
      justifyContent: "center",
      marginTop: "230px",
    },
  },
  "A footer is a section at the bottom of a document or webpage. It provides additional information, navigation links, copyright notices, and other relevant details."
);

const navDiv = React.createElement(
  "div",
  {
    style: {
      display: "flex",
      listStyle: "none",
      justifyContent: "space-evenly",
      backgroundColor: "black",
      color: "#fff",
      padding: "20px",
    },
    key: "39",
  },
  [nav, nav_1, nav_2, nav_3]
);
const imageUrl = "https://source.unsplash.com/user/c_v_r/1900x800";
const image = React.createElement("img", {
  src: imageUrl,
  alt: "Image",
  key: "6",
  style: { width: "100%" },
});

const imageDiv = React.createElement("div", { key: "33" }, image);

const textDiv = React.createElement("div", { key: "34" }, text);
const footerDiv = React.createElement("div", { key: "35" }, footer);

const mainDiv = React.createElement("div", null, [
  navDiv,
  textDiv,
  imageDiv,
  footerDiv,
]);
// console.log("DIV", div);
const rt = ReactDOM.createRoot(root);
rt.render(mainDiv);

// root.appendChild(h1);

// HWK
// 1. study CDN
// 2. crossorigin
// 3. simple web page header, footer and content

// const bilal="789";
// function info(){
//     bilal = 9;
//     console.log("bilal: ", bilal);
//     let bilal = "HI";
// }
// info();
