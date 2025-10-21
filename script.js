document.addEventListener('DOMContentLoaded', function() {
    // Page Navigation
    const pages = document.querySelectorAll('.page');
    const productDetailPages = document.querySelectorAll('.product-detail-page');
    const energyPage = document.getElementById('energy');
    const ujiPowerPage = document.getElementById('uji-power-page');
    const mensCupPage = document.getElementById('mens-cup-page');
    // Show home page by default
    energyPage.style.display = 'block';
    // Product detail page navigation
    const learnMoreButtons = document.querySelectorAll('[data-page]');
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const pageId = this.getAttribute('data-page');
            // Hide all pages
            energyPage.style.display = 'none';
            ujiPowerPage.style.display = 'none';
            mensCupPage.style.display = 'none';
            // Show selected page
            if (pageId === 'uji-power') {
                ujiPowerPage.style.display = 'block';
            } else if (pageId === 'mens-cup') {
                mensCupPage.style.display = 'block';
            }
        });
    });
    // Back buttons
    document.getElementById('backToEnergy').addEventListener('click', function(e) {
        e.preventDefault();
        ujiPowerPage.style.display = 'none';
        energyPage.style.display = 'block';
    });
    document.getElementById('backToEnergy2').addEventListener('click', function(e) {
        e.preventDefault();
        mensCupPage.style.display = 'none';
        energyPage.style.display = 'block';
    });
    // Order modal functionality
    const orderButtons = document.querySelectorAll('.order-btn');
    const orderModal = document.getElementById('orderModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const sizeOptions = document.getElementById('sizeOptions');
    const orderSummary = document.getElementById('orderSummary');
    const selectedItem = document.getElementById('selectedItem');
    const totalAmount = document.getElementById('totalAmount');
    const completeOrder = document.getElementById('completeOrder');
    const whatsappRedirect = document.getElementById('whatsappRedirect');
    let currentProduct = null;
    let selectedSize = null;
    let selectedPrice = null;
    // WhatsApp number for the shop owner (Kenyan format)
    const shopWhatsApp = "254706822154";
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentProduct = {
                name: this.getAttribute('data-product'),
                prices: JSON.parse(this.getAttribute('data-prices'))
            };
            modalTitle.textContent = `Order ${currentProduct.name}`;
            // Populate size options based on product prices
            sizeOptions.innerHTML = '';
            let firstSize = null;
            for (const [size, price] of Object.entries(currentProduct.prices)) {
                const sizeOption = document.createElement('div');
                sizeOption.className = 'size-option';
                if (!firstSize) {
                    sizeOption.classList.add('active');
                    firstSize = size;
                    selectedSize = size;
                    selectedPrice = price;
                }
                sizeOption.innerHTML = `
                    <h4>${size}</h4>
                    <p>Ksh. ${price}</p>
                `;
                sizeOption.addEventListener('click', function() {
                    document.querySelectorAll('.size-option').forEach(opt => {
                        opt.classList.remove('active');
                    });
                    this.classList.add('active');
                    selectedSize = size;
                    selectedPrice = price;
                    updateOrderSummary();
                });
                sizeOptions.appendChild(sizeOption);
            }
            // Update order summary with first size
            if (firstSize) {
                updateOrderSummary();
            }
            orderSummary.style.display = 'block';
            whatsappRedirect.style.display = 'none';
            completeOrder.style.display = 'block';
            orderModal.style.display = 'flex';
        });
    });
    function updateOrderSummary() {
        selectedItem.textContent = `${currentProduct.name} (${selectedSize})`;
        totalAmount.textContent = `Ksh. ${selectedPrice}`;
    }
    closeModal.addEventListener('click', function() {
        orderModal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
        if (e.target === orderModal) {
            orderModal.style.display = 'none';
        }
    });
    completeOrder.addEventListener('click', function() {
        // Show redirect message
        completeOrder.style.display = 'none';
        whatsappRedirect.style.display = 'block';
        // Create WhatsApp message with order details
        const message = `Hello Sofresh Juices & Uji Power, I'd like to order ${currentProduct.name} (${selectedSize}) for Ksh. ${selectedPrice}. Please confirm my order.`;
        const whatsappUrl = `https://wa.me/${shopWhatsApp}?text=${encodeURIComponent(message)}`;
        // Redirect to WhatsApp after a short delay
        setTimeout(() => {
            window.location.href = whatsappUrl;
        }, 1500);
    });
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
});