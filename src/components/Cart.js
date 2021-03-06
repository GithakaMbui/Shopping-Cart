import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';

//react toast for fancy success msgs and emojis

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckOut : false
        };
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }; 
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,

        };
        this.props.createOrder(order);
    };
    
    render() {

        const { cartItems } = this.props;
        console.log(cartItems);
        console.log(cartItems.length);

        //toastify warning message
        const errorToaster = () =>{
            toast.error('ooh shit you just removed an item from Cart...',{
                position: 'top-left',
                autoClose: 4000,
                draggable: false 
    
            })
            
        }

        //this part is not displaying the number of items in the cart
        return (
            <div>
            <ToastContainer/>
                {cartItems.length === 0 ? (
                <div className="cart cart-header">Cart is empty</div>
                ) : (
                <div className="cart cart-header">
                    You have {cartItems.length} in the cart{" "}
                </div>
                )}

                <div>
                    <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={cartItems.title}></img>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                        {formatCurrency(item.price)} * {item.count} {" "}
                                            <button className="button" onClick={ () => {this.props.removeFromCart(item); errorToaster() }}> Remove </button>
                                        </div>
                                        
                                    </div>
                                </li>
                            ) )}
                        </ul>
                        </Fade>

                </div>

                {cartItems.length!==0 && (
                    <div>
                    <div className="cart">
                <div className="total">
                    <div>
                      Total: {" "}  { formatCurrency(cartItems.reduce((a,c) => a + (c.price *c.count), 0 ) )}
                    </div>
                    <button onClick={ ()=> {
                        this.setState({showCheckOut: true});
                        }} 
                        className="button primary">
                        Proceed
                    </button>
                </div>

                </div>
                {this.state.showCheckOut && (
                    <Fade right cascade>
                    <div className="cart"> 
                        <form onSubmit={this.createOrder}>
                            <ul className="form-container">
                                <li>
                                    <label> Email</label>
                                    <input ame="email" type="email" required onChange={this.handleInput} ></input>
                                </li>
                                <li>
                                    <label> Name</label>
                                    <input ame="name" type="text" required onChange={this.handleInput} ></input>
                                </li>
                                <li>
                                    
                                    <label> Address</label>
                                    <input name="address" type="text" required onChange={this.handleInput} ></input>
                                </li>
                                <li>
                                    <button className="button primary" type="submit"> Checkout</button>
                                </li>
                            </ul>
                        </form>                    
                    </div>
                    </Fade>
                )}
                </div>
                )}
                
            </div>

        </div>
            
           
        );
    }
} 
 