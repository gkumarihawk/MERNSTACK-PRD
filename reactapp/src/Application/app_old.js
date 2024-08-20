import React, { Component } from "react";
import "./app.css";
import HeaderComponent from "./Common/HeaderComponent";
import Footer from "./Common/FooterComponent";
import "./app.css";
import NotFound from "./Common/NotFoundComponent";
import HomeComponent from "./Common/HomeComponent";


export default class ApplicationComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "Khan"
        }
    }

    ChangeNameEvent = () => {
        alert("Name change")
        this.setState({ 
            name: "Gauri",
            header: "backend dec",
        })
    }

    getChildData = (data) => {
        //alert(data)
        this.setState({
            name: data
        })
    }
    
    render(){
        let a=10, b = 5
        //let header = "App Component"
        return (
            <>
                <h1>{this.state.header}</h1>
                <HeaderComponent header={this.state.header} name = {this.state.name} getChildData={this.getChildData} />
                <b>The arithmetic operation {a+b}</b>
                <h1>This is the Application Component</h1>
                <button onClick={this.ChangeNameEvent}>Change Name</button>
                <HomeComponent />
                <NotFound />
                <Footer>
                    {/* <HeaderComponent />
                    <h3>Keep Shopping with us</h3>
                    <h3>Most discounted on each purchase</h3>  */}
                </Footer>
                
            </>
        )
    }
}

//let ApplicationComponent = () => {
//let a=10, b = 5
//    return (
//        <div>
//            <HeaderComponent />
//            <b>The arithmetic operation {a+b}</b>
//            <h1>This is the Application Component</h1>
//        </div>
//    )
//}

//export default ApplicationComponent;