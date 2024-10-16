// apiService.js

export const addToCart = async(cartData) => {
    const response = await fetch('https://localhost:7178/api/CartItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }
    return response; 
  };

  export const getCart = async(userId) => {
    const response = await fetch(`https://localhost:7178/api/CartItem/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return response.json()
    // const result = await response.json(); 
    // return result;
  };



  export const deleteCartItem = async(cartItemId)=>{
    const response =  await fetch(`https://localhost:7178/api/CartItem?cartitemId=${cartItemId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      } 
    });

    if (!response.ok) {
      throw new Error('Failed to delete cart item');
    }
    
    return response;

  };

  