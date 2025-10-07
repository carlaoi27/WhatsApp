// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Sorvete WhatsApp",
        price: 9.99,
        image: "image/9l027q9bpxq21.webp"
    },
    {
        id: 2,
        name: "Caneca WhatsApp",
        price: 45.90,
        image: "image/32bad7651f1-3d3da41b270a3e5b015e0efa44cc0caf-1024-1024.jpg"
    },
    {
        id: 3,
        name: "Carro WhatsApp",
        price: 0.01,
        image: "image/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
    },
    {
        id: 4,
        name: "Camiseta WhatsApp",
        price: 25.90,
        image: "image/camiseta_whatsapp-r521fdcedaa9c47fdbf8aed1253474611_k2g54_644.jpg"
    },
    {
        id: 5,
        name: "Almofada WhatsApp",
        price: 59.99,
        image: "image/images.jpg"
    },
    {
        id: 6,
        name: "Almofadas Emoji",
        price: 27.82,
        image: "image/almofada_emoji_whatsapp_pelucia_bordado_dinheiro_28x28cm_885_3_9f7d7f0ca34f48ce40ade246ea57e049.webp"
    },
    {
        id: 7,
        name: "Lápis WhatsApp",
        price: 13.59,
        image: "image/lapis_de_cor_polychromos_faber_castell_112_leaf_gr_19115_1_7def786f4c335e841fc144ad30732008_20220717031014.webp"
    },
    {
        id: 8,
        name: "Emoji Divertido Pelúcia",
        price: 39.99,
        image: "image/almofada_emoji_emoticon_whatsapp_cocozinho_1559_1_20220606145717.webp"
    },
    {
        id: 9,
        name: "Capinha de Celular WhatsApp",
        price: 14.50,
        image: "image/images (1).jpg"
    },
    {
        id: 10,
        name: "Kit de Festa WhatsApp",
        price: 179.99,
        image: "image/festa-whatsapp-1.jpg"
    },
    {
        id: 11,
        name: "Balão WhatsApp",
        price: 4.99,
        image: "image/53-b1pnjrp3aj.webp"
    },
    {
        id: 12,
        name: "Adesivos Emojis",
        price: 10.00,
        image: "image/5047364662348d999f.webp"
    },
];

// Estado do carrinho
let cart = [];

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});

// Renderizar produtos
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Adicionar event listeners aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Verificar se o produto já está no carrinho
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover produto do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Atualizar carrinho
function updateCart() {
    // Atualizar contador
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Atualizar lista de itens
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Seu carrinho está vazio</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Atualizar total
    cartTotal.textContent = total.toFixed(2);
    
    // Adicionar event listeners aos botões de remover
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Mostrar notificação
function showNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        transition: transform 0.3s, opacity 0.3s;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateY(20px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Abrir/fechar carrinho
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});