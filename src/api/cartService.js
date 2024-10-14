// apiService.js

export const addToCart = async (cartItem) => {
    const response = await fetch('https://localhost:7178/api/Cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItem),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }
  
    return await response.json(); // Assuming the API returns the updated cart or item
  };
  