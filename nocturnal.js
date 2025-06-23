// Product Data
const products = [
    {
        id: 1,
        title: "Sintetinis kraujo pakaitalas",
        description: "Sintetinė alternatyva žmonių ar gyvūnų kraujui. Sudėtyje yra visos vampyrams reikalingos maistinės medžiagos.",
        category: "vampire",
        variants: "Coffee Black, Crimson Blood, Mojito Green, Orange Juice",
        price: 9.99,
        image: "https://i.pinimg.com/736x/85/73/b0/8573b001671dd018b018441cb17b6b77.jpg"
    },
    {
        id: 2,
        title: "Apsauginis losjonas nuo saulės",
        description: "Padengia odą apsauginiu sluoksniu, kuris neleidžia prasiskverbti saulės spinduliams, todėl oda tiesioginėje saulėkaitoje nežvilga.",
        category: "vampire",
        variants: "30 ml / 100 ml / 500 ml",
        price: 39.99,
        image: "https://i.pinimg.com/736x/3a/69/18/3a6918e32feefa76d6fd0385d63d298e.jpg"
    },
    {
        id: 3,
        title: "Anti-powers eliksyras",
        description: "Nuodai, laikinai atimantys vampyrų antgamtinius gebėjimus, įskaitant jėgą ir greitį. <i>Parduodama tik įgaliotiems asmenims.</i>",
        category: "hunter",
        variants: "30 ml",
        price: 5.99,
        image: "https://i.pinimg.com/736x/aa/87/f6/aa87f61c925741ff9f88c07125e87cd2.jpg"
    },
    {
        id: 4,
        title: "Emotional Sobriety eliksyras",
        description: "Skirtas numalšinti neracionalias emocijas ir įnešti balanso, kad sudėtingose situacijose jį suvartojęs asmuo sugebėtų mąstyti šaltai ir racionaliai, užuot kliovęsis karštomis, klaidinančiomis emocijomis.",
        category: "universal",
        variants: "50 ml",
        price: 49.99,
        image: "https://i.pinimg.com/736x/79/e7/93/79e7936a95998cc695bed8fd1173696c.jpg"
    },
    {
        id: 5,
        title: "Neužpučiamos žvakės",
        description: "Žvakės, užgęstančios tik ištarus užpūtimo burtažodį. Puikiai tinka ritualams lauke vėjuotomis dienomis.",
        category: "witches",
        variants: "3 vnt.",
        price: 8.99,
        image: "https://i.imgur.com/j47ZNYL.jpeg"
    },
    {
        id: 6,
        title: "Lašai nuo sapnų",
        description: "Geriamieji lašai tiems, kuriems tinkamai išsimiegoti trukdo neramūs sapnai. Ypač veiksmingai išvaiko košmarus.",
        category: "universal",
        variants: "20 ml",
        price: 20.99,
        image: "https://i.pinimg.com/736x/e4/7a/b8/e47ab8788989e7aebf4dd4a30880234a.jpg"
    },
  {id: 7,
        title: "Kontaktiniai lęšiai",
        description: "Nuodams atsparūs daugkartinio naudojimo kontaktiniai lęšiai.",
        category: "vampire",
        variants: "Įvairių spalvų",
        price: 39.99,
        image: "https://i.pinimg.com/736x/70/34/65/703465da726a15afdd7e3c85a3e5a8d4.jpg"
    },
  {id: 8,
        title: "Augantys drabužiai",
        description: "Vaikiški drabužiai, prisitaikantys prie sparčiai augančių mažųjų mišrūnų kūnų, kad spintos turinys tarnautų ilgiau.",
        category: "hybrid",
        variants: "Įvairių dizainų",
        price: 15.99,
        image: "https://i.pinimg.com/736x/77/2d/a3/772da39c4acc52794c497be2373d412a.jpg"
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const categoryBtns = document.querySelectorAll('.category-btn');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');

// Cart State
let cart = [];

// Display Products
function displayProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    // Sort products by ID in descending order
    const sortedProducts = [...products].sort((a, b) => b.id - a.id);
    
    const filteredProducts = filter === 'all' 
        ? sortedProducts 
        : sortedProducts.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const categoryClass = `${product.category}-category`;
        const categoryText = product.category === 'vampire' ? 'Vampyrams' 
                  : product.category === 'hunter' ? 'Medžiotojams'
                  : product.category === 'witches' ? 'Raganoms'
                  : product.category === 'werewolf' ? 'Vilkolakiams'
        : product.category === 'hybrid' ? 'Mišrūnams'
                  : 'Tinka visiems';
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <span class="product-category ${categoryClass}">${categoryText}</span>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-variants">${product.variants}</p>
                <div class="product-footer">
                    <span class="product-price">nuo ${product.price.toFixed(2)} €</span>
                    <button class="add-to-cart" data-id="${product.id}">į krepšelį</button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to new buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Filter Products by Category
function filterProducts() {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.dataset.category;
            displayProducts(category);
        });
    });
}

// Add to Cart Functionality
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showCartNotification(product.title);
    updateCartPopup(); // Update the popup if it's open
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show Notification
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '100px';
    notification.style.right = '30px';
    notification.style.backgroundColor = '#292725';
    notification.style.color = '#a2988e';
    notification.style.padding = '10px 15px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    notification.style.zIndex = '1000';
    notification.style.fontSize = '12px';
    notification.style.transition = 'all 0.3s ease';
    notification.textContent = `pridėta į krepšelį ${productName}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Cart Popup Functions
function toggleCartPopup() {
    const popup = document.getElementById('cartPopup');
    if (popup) {
        popup.remove();
    } else {
        showCartPopup();
    }
}

// Update cart popup content without closing/reopening
function updateCartPopup() {
    const popup = document.getElementById('cartPopup');
    if (!popup) return;
    
    if (cart.length === 0) {
        popup.innerHTML = '<p style="text-align: center;">krepšelis tuščias</p>';
    } else {
        let total = 0;
        popup.innerHTML = `
            <h3 style="font-family: 'Lemon/Milk light', sans-serif; color: #BFA980; margin-bottom: 15px; font-size: 16px; letter-spacing: 1px;">Prekės krepšelyje:</h3>
            <div id="cartItems"></div>
            <div style="border-top: 1px solid #333330; margin-top: 15px; padding-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-family: 'Lemon/Milk light', sans-serif; color: #BFA980;">Total:</span>
                <span id="cartTotal" style="font-family: 'Lemon/Milk light', sans-serif; color: #BFA980;">€0.00</span>
            </div>
        `;
        
        const cartItemsContainer = popup.querySelector('#cartItems');
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.style.marginBottom = '15px';
            itemElement.style.paddingBottom = '15px';
            itemElement.style.borderBottom = '1px solid #333330';
            itemElement.style.fontSize = '12px'; // Smaller font size
            itemElement.innerHTML = `
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <img src="${item.image}" alt="${item.title}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="font-weight: bold;">${item.title}</span>
                            <span>€${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; align-items: center;">
                                <button class="cart-item-decrease" data-id="${item.id}" style="background: #444b44; color: #BFA980; border: none; border-radius: 4px; width: 20px; height: 20px; cursor: pointer;">-</button>
                                <span style="margin: 0 10px;">${item.quantity}</span>
                                <button class="cart-item-increase" data-id="${item.id}" style="background: #444b44; color: #BFA980; border: none; border-radius: 4px; width: 20px; height: 20px; cursor: pointer;">+</button>
                            </div>
                            <button class="cart-item-remove" data-id="${item.id}" style="background: #934343; color: #f5f5f5; border: none; border-radius: 4px; padding: 2px 8px; font-size: 10px; cursor: pointer;">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            
            total += item.price * item.quantity;
        });
        
        popup.querySelector('#cartTotal').textContent = `€${total.toFixed(2)}`;
        
        // Add event listeners to cart item buttons
        addCartItemEventListeners(popup);
    }
}

function showCartPopup() {
    const popup = document.createElement('div');
    popup.id = 'cartPopup';
    popup.style.position = 'fixed';
    popup.style.bottom = '100px';
    popup.style.right = '30px';
    popup.style.width = '300px';
    popup.style.maxHeight = '400px';
    popup.style.overflowY = 'auto';
    popup.style.backgroundColor = '#292725';
    popup.style.borderRadius = '7px';
    popup.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    popup.style.zIndex = '1000';
    popup.style.padding = '15px';
    popup.style.color = '#a2988e';
    
    if (cart.length === 0) {
        popup.innerHTML = '<p style="text-align: center;">krepšelis tuščias</p>';
    } else {
        let total = 0;
        popup.innerHTML = `
            <h3 style="font-family: 'Lemon/Milk light', sans-serif; color: #BFA980; margin-bottom: 15px; font-size: 16px; letter-spacing: 1px;">Prekės krepšelyje:</h3>
            <div id="cartItems"></div>
            <div style="border-top: 1px solid #333330; margin-top: 15px; padding-top: 15px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-family: 'Lemon/Milk light', sans-serif; color: #BFA980;">Total:</span>
                <span id="cartTotal" style="font-family: 'Lemon/Milk light', sans-serif; color: #BFA980;">€0.00</span>
            </div>
        `;
        
        const cartItemsContainer = popup.querySelector('#cartItems');
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.style.marginBottom = '15px';
            itemElement.style.paddingBottom = '15px';
            itemElement.style.borderBottom = '1px solid #333330';
            itemElement.style.fontSize = '12px'; // Smaller font size
            itemElement.innerHTML = `
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <img src="${item.image}" alt="${item.title}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="font-weight: bold;">${item.title}</span>
                            <span>€${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; align-items: center;">
                                <button class="cart-item-decrease" data-id="${item.id}" style="background: #444b44; color: #BFA980; border: none; border-radius: 4px; width: 20px; height: 20px; cursor: pointer;">-</button>
                                <span style="margin: 0 10px;">${item.quantity}</span>
                                <button class="cart-item-increase" data-id="${item.id}" style="background: #444b44; color: #BFA980; border: none; border-radius: 4px; width: 20px; height: 20px; cursor: pointer;">+</button>
                            </div>
                            <button class="cart-item-remove" data-id="${item.id}" style="background: #934343; color: #f5f5f5; border: none; border-radius: 4px; padding: 2px 8px; font-size: 10px; cursor: pointer;">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            
            total += item.price * item.quantity;
        });
        
        popup.querySelector('#cartTotal').textContent = `€${total.toFixed(2)}`;
        
        // Add event listeners to cart item buttons
        addCartItemEventListeners(popup);
    }
    
    document.body.appendChild(popup);
    
    // Close popup when clicking outside
    const closePopupHandler = function(e) {
        if (!popup.contains(e.target) && e.target !== cartBtn && !cartBtn.contains(e.target)) {
            popup.remove();
            document.removeEventListener('click', closePopupHandler);
        }
    };
    
    document.addEventListener('click', closePopupHandler);
}

// Helper function to add event listeners to cart item buttons
function addCartItemEventListeners(popup) {
    popup.querySelectorAll('.cart-item-decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            const id = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === id);
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
            updateCartCount();
            updateCartPopup();
        });
    });
    
    popup.querySelectorAll('.cart-item-increase').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            const id = parseInt(e.target.dataset.id);
            const item = cart.find(item => item.id === id);
            item.quantity += 1;
            updateCartCount();
            updateCartPopup();
        });
    });
    
    popup.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            const id = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== id);
            updateCartCount();
            updateCartPopup();
        });
    });
}

// Initialize
displayProducts();
filterProducts();

// Add click event to cart button
cartBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent immediate closing
    toggleCartPopup();
});
