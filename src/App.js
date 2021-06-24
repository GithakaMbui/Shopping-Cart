import React from "react";
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
//feature 1

//react toast for fancy success msgs and emojis
//import toast, { Toaster } from 'react-hot-toast';


import data from "./data.json"

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [],
      size:"",
      sort:"",
    };
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }
  //implementation to remove from Cart
  //use array_filter to remove selected item
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(x => x.id !== product.id),
    });
    
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x.id !== product.id)));
  };

  // //attempting implemnting toast success message
  // someNotification = () => {
  //   toast(" here is your success message");
  // }

  //this part is not working

  //this part is now working
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({...product, count: 1 });
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  // addToCart = (product) => {
  // const { cartItems } = this.state;
  // // find whether the product is there in the cartItems
  // const isProductPresent = cartItems.some(item => item.id === product.id);
  // if(isProductPresent){
  //   const updatedCartItems = cartItems.map(item => {
  //     if(item.id === product.id){
  //       return { ...item, count: ++item.count}
  //     }
  //     return item;
  //   })
  //   this.setState({cartItems: updatedCartItems});
  // }
  // else {
  //   this.setState({cartItems: [...cartItems, {...product, count: 1}] });
  // }
  // };

  // addToCart = (product) => {
  //   const cartItems = [...this.state.cartItems];
  //   let alreadyInCart = false;
  //  cartItems.map(eachCartItem=>{
  //    if (eachCartItem._id === product._id) {
  //       eachCartItem.count = eachCartItem.count+1;
  //       alreadyInCart = true;
  //     }
  //  })
  //   if (!alreadyInCart) {
  //     cartItems.push({...product, count: 1 });
  //   }
  //   this.setState({cartItems});
  // };
    

  sortProducts = (event) => {
    //implemenet sort
    const sort = event.target.value;
    //console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
      .slice()
      .sort((a, b) =>
      
        sort === "lowest"
        ? a.price > b.price
        ? 1
        : -1
        :sort === "highest"
        ? a.price < b.price
        ? 1
         : -1
         :
        a._id < b._id
        ? 1
        : -1
      ), 
    }));
    
  };
  filterProducts = (event) => {
    //implement filter by size
    console.log(event.target.value);
    if(event.target.value === ""){
      this.setState({size: event.target.value, product: data.products });
    } else
    {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
        (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
      
    }
    
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/"> Vans Online Shop</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
            
                <Filter 
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                  >
                </Filter>
                <Products products={this.state.products} addToCart={this.addToCart} someNotification={this.someNotification} ></Products>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder} />
            </div>

          </div>
        </main>
        <footer>
        Site under Construction! <br></br>
        
        2021. Githaka &copy; All rights Reserved. 
        </footer>
      </div>
    );
  }
  
}

export default App;
