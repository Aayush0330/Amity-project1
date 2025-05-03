// Product Categories
const CATEGORIES = {
    AUDIO: 'audio',
    WEARABLES: 'wearables',
    COMPUTERS: 'computers',
    ACCESSORIES: 'accessories'
  };
  
  // Sample product data
  const products = [
    {
      id: 'audio-001',
      title: "Premium Wireless Headphones",
      price: 299.99,
      category: CATEGORIES.AUDIO,
      description: "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation.",
      image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 'wear-001',
      title: "Smart Watch Series 5",
      price: 199.99,
      category: CATEGORIES.WEARABLES,
      description: "Track your fitness goals and stay connected with our latest smartwatch featuring health monitoring.",
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 'audio-002',
      title: "Portable Bluetooth Speaker",
      price: 89.99,
      category: CATEGORIES.AUDIO,
      description: "Take your music anywhere with this compact yet powerful bluetooth speaker with 24-hour battery life.",
      image: "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 'comp-001',
      title: "Ultra-thin Laptop",
      price: 1299.99,
      category: CATEGORIES.COMPUTERS,
      description: "Powerful performance in an incredibly thin and light design with all-day battery life.",
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    
    {
      id: 'audio-003',
      title: "True Wireless Earbuds",
      price: 159.99,
      category: CATEGORIES.AUDIO,
      description: "Premium true wireless earbuds with spatial audio and transparency mode.",
      image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
 
    {
      id: 'comp-002',
      title: "4K Gaming Monitor",
      price: 499.99,
      category: CATEGORIES.COMPUTERS,
      description: "144Hz refresh rate gaming monitor with HDR support and minimal input lag.",
      image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 'acc-003',
      title: "Premium Keyboard",
      price: 149.99,
      category: CATEGORIES.ACCESSORIES,
      description: "Mechanical keyboard with customizable RGB lighting and premium switches.",
      image: "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];
  
  // Cart functionality
  let cart = [];
  const productsGrid = document.getElementById('products');
  const cartModal = document.getElementById('cartModal');
  const cartIcon = document.getElementById('cartIcon');
  const closeCart = document.getElementById('closeCart');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  // Display products
  function displayProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card animate-fadeIn';
      
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p class="product-description">${product.description}</p>
          <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      `;
      
      productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }
  
  // Add product to cart
  function addToCart(e) {
    const productId = e.target.dataset.id;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }
    
    // Animate the button
    e.target.classList.add('animate-pulse');
    setTimeout(() => {
      e.target.classList.remove('animate-pulse');
    }, 350);
    
    updateCart();
  }
  
  // Update cart UI
  function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems > 0 ? totalItems : '';
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty</p>
        </div>
      `;
    } else {
      cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn increase" data-id="${item.id}">+</button>
          </div>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        `;
        
        cartItems.appendChild(cartItem);
      });
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Add event listeners to cart item buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
      button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
      button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(button => {
      button.addEventListener('click', removeFromCart);
    });
  }
  
  // Decrease item quantity
  function decreaseQuantity(e) {
    const productId = e.target.dataset.id;
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart = cart.filter(item => item.id !== productId);
      }
      updateCart();
    }
  }
  
  // Increase item quantity
  function increaseQuantity(e) {
    const productId = e.target.dataset.id;
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      item.quantity += 1;
      updateCart();
    }
  }
  
  // Remove item from cart
  function removeFromCart(e) {
    const productId = e.target.dataset.id;
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  
  // Toggle cart modal
  function toggleCart() {
    cartModal.classList.toggle('active');
  }
  
  // Event listeners
  cartIcon.addEventListener('click', toggleCart);
  closeCart.addEventListener('click', toggleCart);
  
  checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      alert('Thank you for your purchase!');
      cart = [];
      updateCart();
      toggleCart();
    }
  });
  
  // Initialize
  displayProducts();
  updateCart();