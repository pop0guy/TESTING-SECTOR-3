// Global cart variable 
let cart = [];

function addToCart(productName, price, image) {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex > -1) {
        // If product already exists, just increase quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add the new item to the cart
        cart.push({ name: productName, price: price, image: image, quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show alert
    alert(`${productName} has been added to your cart!`);
}

// Function to display cart items
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('cart-total');
    
    cartList.innerHTML = ''; // Clear previous items
    let total = 0;

    if (cartItems.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty!</p>';
        totalPriceElement.innerText = 'Total Price: $0.00';
    } else {
        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item'); // Add class for styling
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>${item.name} - $${item.price.toFixed(2)} (Qty: ${item.quantity})</div>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            `;
            cartList.appendChild(cartItemElement);
            total += item.price * item.quantity;
        });
        totalPriceElement.innerText = `Total Price: $${total.toFixed(2)}`;
    }
}



// Call this function to display cart items when the cart page loads
displayCart();
