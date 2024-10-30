// apiService.js

export const addToCart = async(cartData) => {
    const token = localStorage.getItem('token');
    const id= localStorage.getItem('id');
    try{
    const response = await fetch('https://localhost:7178/api/CartItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(cartData),
    });
    return response; 
  }
    catch (error) {
    console.log('Error:', error);
    }
  
    
  };
  
  export const getCart = async(userId) => {

    const token = localStorage.getItem('token');
    

    const response = await fetch(`https://localhost:7178/api/CartItem/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    const token = localStorage.getItem('token');
    const response =  await fetch(`https://localhost:7178/api/CartItem?cartitemId=${cartItemId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      } 
    });

    if (!response.ok) {
      throw new Error('Failed to delete cart item');
    }
    
    return response;

  };

  