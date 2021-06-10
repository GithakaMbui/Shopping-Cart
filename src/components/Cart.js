import React, { Component } from 'react'
import formatCurrency from '../util';


export default class Cart extends Component {
    render() {
        const { cartItems } = this.props;
        //this part is not displaying the number of items in the cart
        return (
            <div>
                {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}

                <div>
                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item._id}>
                                <div>
                                     <img src={item.image} alt={cartItems.title}></img>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                    {formatCurrency(item.price)} * {item.count}
                                        <button onClick={ () => this.props.removeFromCart(item)}> Remove</button>
                                    </div>
                                    
                                </div>
                            </li>
                        ) )}
                    </ul>

                </div>
            </div>

            </div>
            
           
        );
    }
} 
 