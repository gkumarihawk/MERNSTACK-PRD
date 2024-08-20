import React, { Component, PureComponent } from "react";
import {PropTypes} from "prop-types"; 

//is used to compare all the props and states as we do in should component update
export default class HomeComponent extends PureComponent {

//export default class HomeComponent extends Component {

    //Creation Life Cycle Methods
    constructor(props){ //props - is used to pass information from parent to child component
        super(props); //this is used to push back updated state in parent components

        this.state = {
            userName : props.userName,
            userSession : "MERNSTack"
        }

        this.intervalObj = ""

        //creating reference elements to access directly when we need
        this.address = React.createRef()
        this.age = React.createRef()
    }

    //ensures that component has rendered first time and html is in place on browser
    //we can do state change and also make server calls
    componentDidMount(){
        this.callInterval()      
        
        // setTimeout(() => {
        //     this.address.current.value = "Address Changed"
        //     this.age.current.value = "Age Changed"
        //     this.age.current.focus();
        // }, 3000);
    }

    callInterval = ()=>{
        // this.intervalObj = setInterval(() => {
        //     console.log("Inteval gets called in Home Component")
        //     this.setState({
        //         userName : "Annie"
        //     })    
        // }, 3000);
    }

    //destruction life cycle method - used to clear callbacks and api subscriptions
    componentWillUnmount(){
        console.log("Component is unmounted")
        clearInterval(this.intervalObj)
    }

    textChange = (evt)=>{
        let target = evt.target;
        let classList = evt.target.classList;

        //console.log(target)
        if (classList.contains("userName")) {
            this.setState({
                userName : target.value
            })    
        } else {
            this.setState({
                userSession : target.value
            })
        }

        evt.preventDefault()
    }

    formSubmit = (evt)=>{
        let address = this.address.current.value
        let age = this.age.current.value

        //api to change the state - to be used
        this.setState({address, age})

        // this.state.address = address
        // this.state.age = age

        //api to call render method, by skipping life cycle methods - should be avoided
        //this.forceUpdate();

        //alert(address + " " + age)

        evt.preventDefault()
    }

    //update life cycle method - decides whether re-render should happen or not
    // shouldComponentUpdate(nextProps, nextState){
    //     console.log(nextProps, nextState)

    //     if (nextState.address === this.state.address && nextState.age === this.state.age) {
    //         return false //no need to call render method as states are same
    //     } else {
    //         return true
    //     }
        
    //     //return true
    // }

    getSnapshotBeforeUpdate(prevState, prevProps){
        console.log("getSnapshotBeforeUpdate");
        console.log("prevState", prevState);
        console.log("prevProps", prevProps);
        return {
            prevState,
            prevProps
        }
    }

    componentDidUpdate(prevState, prevProps){
        console.log("componentDidUpdate");
        console.log("prevState",prevState);
        console.log("prevProps", prevProps);

        // this.setState({
        //     uState : prevState.uState
        // })
    }

    render(){
        console.log("render method called! to create virtual dom")
        return(
            <div className={"loadimage form"} >
                <h1>{this.state.title}</h1>
                <b className="feature">{"Product Feature's :"}</b>
                <ul>                     
                    <li>Sign up new users</li>
                    <li>Login existing users.</li>                
                    <li>Allow user's to add to cart.</li>
                    <li>Save the user's cart.</li>
                    <li>Checkout and pay for items.</li>
                    <li>Allow users to cancel the order.</li>
                    <li>Allow users to reorder the cart.</li>
                    <li>Add products/items to create product collection.</li>
                    <li>Allow users to give ratings to each product.</li>
                    <li>Have notifications on top right with logout.</li>
                </ul>

                {/* <video width="320" height="240" controls autoplay>
                    <source src={require('../../videos/video.mp4')} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> */}
            </div>

            // <>
            //     <h1>Home Component</h1>
            //     <b>{this.props.userName}</b>
            //     <b>{this.state.userName}</b>
            //     <b>{this.state.address}</b>
            //     <b>{this.state.age}</b>

            //     {/* controlled way of component creation */}
            //     <div className="col-md-12">
            //         <div className="col-md-8">
            //             <label>User Name</label>
            //             <input type="text" value={this.state.userName} className="userName"
            //                     onChange={this.textChange} maxLength={20}></input>
            //         </div>
            //         <div className="col-md-8">
            //             <label>User Session</label>
            //             <input type="text" value={this.state.userSession} className="session"
            //                     onChange={this.textChange} maxLength={20}></input>
            //         </div>
            //     </div>


            //     {/* un-controlled way of component creation */}
            //     <form className="form" action="/api/loginUser" onSubmit={this.formSubmit}>
            //         <b>Address</b>
            //         <input type="text" placeholder={"Default User Address"} 
            //             ref={this.address} maxLength={20}></input>
            //         <b>Age</b>
            //         <input type="text" placeholder={"Default User Age"} 
            //             ref={this.age} maxLength={20}></input>

            //         <button type="submit" >Save</button>
            //     </form>
            // </>
        )
    }
}



// HomeComponent.defaultProps = {
//     userName : "Gauri!!"
// }

HomeComponent.propTypes = {
    userName : PropTypes.string.isRequired
}