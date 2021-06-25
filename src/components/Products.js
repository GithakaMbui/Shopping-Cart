import React, { Component } from 'react'
import formatCurrency from "../util";
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal'; 
import Zoom from "react-reveal/Zoom";

//react toast for fancy success msgs and emojis
//import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default class Products extends Component {
    constructor(props){
        super(props);
        this.state={
            product: null,
        }

    }
    openModal = (product) => {
        this.setState( { product});
    };
    closeModal = () => {
        this.setState({ product:null });
    };



    render() {
        const { product } = this.state;
        //Toastify
    const successToaster = () =>{
        toast.success('Succesfully added to Cart...',{
            position: 'top-left',
            autoClose: 4000,
            draggable: false 

        })
        
    }
        return (
            <div>
            <ToastContainer/>
            <Fade bottom cascade={true}>
                <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id} onClick={() => this.openModal(product) }>
                                    <img src={product.image} alt={product.title}></img>
                                    <p>
                                        {product.title}
                                    </p>
                                </a>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button onClick={ () => {this.props.addToCart(product); successToaster() }} className="button primary"> Add To Cart </button>
                                        {/* <button onClick={() => successToaster()} > Successful</button> */}
                                        {/* onclick={()=>{ f1(); f2() }} */}
                                        
                                        

                                    </div>
                                
                            </div>
                        </li>
                    ))}
                </ul>
                </Fade>
                {
                    product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className="close-modal" onClick={this.closeModal}> X </button>
                                    <div className="product-details">
                                        <img src={product.image} alt={product.title}></img>
                                        <div className="product-details-description">
                                            <p>
                                                <strong>{product.title}</strong>
                                            </p>
                                            <p>{product.description}</p>
                                            <p>
                                            Available Sizes: { " "}
                                            {product.availableSizes.map(x=>(
                                                <span> { "  "  } <button className="button">{x}</button></span>
                                            ))}
                                            </p>
                                            <div className="product-price">
                                                <div>
                                                    {formatCurrency(product.price)}
                                                </div>
                                                <button className="button primary" onClick={ ()=>{
                                                    this.props.addToCart(product);
                                                    this.closeModal();

                                                }                                                    
                                                }> Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>

                            </Zoom>

                        </Modal>
                    )
                }
            </div>
        )
    }
}
