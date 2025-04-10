// Menu items data
const menuItems = [
    {
        id: 1,
        name: "Chicken Kottu",
        price: 12.99,
        image: "./chicken_kottu.jpg",
        description: "A coastal twist to the classic kottu",
        details: "Our signature chicken kottu is made with fresh roti, tender chicken, and a blend of aromatic spices."
    },
    {
        id: 2,
        name: "Cheese Kottu",
        price: 13.99,
        image: "./cheese_kottu1.jpg",
        description: "Creamy cheese kottu with mixed vegetables",
        details: "Rich and creamy cheese kottu perfect for cheese lovers."
    },
    {
        id: 3,
        name: "Mixed Kottu",
        price: 14.99,
        image: "./mixed-kottu.jpg",
        description: "Satisfy your cravings with mixed kottu magic",
        details: "Experience the best of Kottu Roti with a savory mix of meats and spices in every bite"
    },
    {
        id: 4,
        name: "Beef Kottu",
        price: 15.99,
        image: "./beef_kottu.jpg",
        description: "Savory beef in every delicious shred of kottu",
        details: "Our Beef Kottu combines tender beef and spices for an unforgettable taste experience"
    },   {
        id: 5,
        name: "Egg Kottu",
        price: 10.99,
        image: "./egg_kottu.jpg",
        description: "Fluffy eggs meet spicy kottu goodness",
        details: "Every bite of egg kottu is packed with the perfect balance of spices and eggs"
    },
    {
        id: 6,
        name: "Seafood Kottu",
        price: 15.99,
        image: "./seafood_kottu.jpg",
        description: "Spicy, savory, and with fresh seafood",
        details: "Dive into the flavors of our delicious Seafood Kottu!"
    },
    {
        id: 7,
        name: "Cut Fish Kottu",
        price: 14.99,
        image: "./cutfish_kottu.jpg",
        description: "Savor the tender fish in every flavorful bite",
        details: "Satisfy your cravings with our delicious Cut Fish Kottu"
    },
    {
        id: 11,
        name: "Mutton Kottu",
        price: 14.99,
        image: "./mutton_kottu.jpg",
        description: "Mutton kottu a rich, hearty delight",
        details: "Tender mutton and spices, perfectly mixed in every bite"
    },
    {
        id: 8,
        name: "Noodless Kottu",
        price: 13.99,
        image: "./noodles_kottu.jpg",
        description: "A delicious fusion of noodles and kottu",
        details: "Savory noodles and spices, perfectly combined in every bite"
    },
    {
        id: 10,
        name: "Prawns Kottu",
        price: 15.99,
        image: "./prawns_kottu.jpg",
        description: "Prawns kottu: bold, spicy, and irresistible",
        details: "The mix of prawns and spices creates a unique flavor"
    },

    {
        id: 9,
        name: "Vegetable Kottu",
        price: 10.99,
        image: "./veg_kottu.jpg",
        description: "A healthy, hearty twist on classic kottu",
        details: "The dish is a mix of nutrition and taste, making it a favorite among people of all age"
    },
    {
        id: 12,
        name: "Chicken Masala Kottu",
        price: 15.99,
        image: "./chicken_masala_kottu.jpg",
        description: "Tender chicken in a masala-infused kottu",
        details: "Rich masala and juicy chicken in every shred of kottu"
    },
];

let cart = [];


// Initialize menu
function initializeMenu() {
    const menuGrid = document.getElementById('menu-items');
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-price">$${item.price}</div>
                <div class="item-buttons">
                    <button class="add-to-cart" onclick="addToCart(${item.id},'${item.name}')" >Add to Cart</button>
                    <button class="view-details" onclick="viewDetails(${item.id})">View Details</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}


// Add to cart function
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartCount();
    showPopupMessage(`${item.name} added to the cart!`);
}

// Show popup message function
function showPopupMessage(message) {
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = 0;
        setTimeout(() => popup.remove(), 500); // Ensure removal after fade-out
    }, 2000); // Display message for 2 seconds
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// View details function
function viewDetails(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const detailsModal = document.getElementById('details-modal');
    const detailsContent = document.getElementById('item-details');

    detailsContent.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
        <h2>${item.name}</h2>
        <p>${item.details}</p>
    `;

    detailsModal.style.display = 'block';
}

// Cart functions
function openCart() {
    document.getElementById('cart-modal').style.display = 'block';
    updateCartDisplay();
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function closeDetails() {
    document.getElementById('details-modal').style.display = 'none';
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="quantity-btn remove" onclick="removeItem(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeItem(itemId);
        return;
    }

    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        updateCartCount();
    }
}

function removeItem(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    updateCartCount();
}

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => tab.style.display = 'none');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).style.display = 'block';
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
}

function submitOrder(event) {
    event.preventDefault();
    showPopupMessage("Your order has been successfully placed! Thank you!");
    cart = [];
    updateCartCount();
    closeCart();
}


// Initialize the menu when the page loads
document.addEventListener('DOMContentLoaded', initializeMenu);


function prepareFormData() {
    const hiddenTotalAmount = document.getElementById('hidden-total-amount');
    const hiddenOrderItems = document.getElementById('hidden-order-items');

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    hiddenTotalAmount.value = totalAmount.toFixed(2);

    const orderItems = cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
    }));
    hiddenOrderItems.value = JSON.stringify(orderItems);
}

document.getElementById('order-form-element').addEventListener('submit', prepareFormData);


//
