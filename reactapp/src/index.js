//console.log("Shopping Cart Application - To be Built on React will be loaded through this file!!!")
//alert("Index js file loaded")

import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; //provides redux state as props in react component

import ApplicationComponent from "./Application/app";
import store from "./State/store";


//creating root of the react application where we can load the react app
const root = ReactDOM.createRoot(document.getElementById("root"));

//bootstrapping react application in root element of index.html
root.render( //this creates the virtual dom (copy of actual dom in js object format)
    <Provider store={store}>
        <ApplicationComponent/>
    </Provider>
)