const products = [
    {
        id: 1,
        name: "14k Gold Classic Huggies",
        category: "Earrings",
        material: "Gold",
        price: 196,
        onSale: false,
        discount: null,
        img: "https://www.gorjana.com/cdn/shop/files/219-002-G-v2-1_1caf9a3b-1a84-43b3-8df2-fa6380675b22.jpg?v=1695252610&%3Bwidth=1080&em-format=avif&em-width=1080",
        description: "These 14k solid gold huggie earrings are timeless - show them off by wearing them with your favorite solid gold studs, huggies and hoops."
    },
    {
        id: 2,
        name: "Diamond Double Down Huggies",
        category: "Earrings",
        material: "Gold",
        price: 560,
        onSale: true,
        discount: 20,
        img: "https://www.gorjana.com/cdn/shop/files/FEB24_PRO_242-008-185-G_01_c4e0f116-c3b2-4b03-9dee-6f2cb354c636.jpg?v=1706021548&%3Bwidth=1080&em-format=avif&em-width=1080",
        description: "Featuring a double row of thirty-six diamonds set in solid gold, these huggie earrings are sure to make a statement in your ear stack."
    },
    {
        id: 3,
        name: "Diamond Jolie Studs",
        category: "Earrings",
        material: "Gold",
        price: 260,
        onSale: false,
        discount: null,
        img: "https://www.gorjana.com/cdn/shop/files/2110-002-185-G_1_1.jpg?v=1698101354&%3Bwidth=1080&em-format=avif&em-width=1080",
        description: "The beauty of earring stacking lies in the opportunity to mix and match different styles, shapes, and sizes. Style this pair of diamond studs in first, second or third piercings."
    },
    {
        id: 4,
        name: "Pearl Newport Chain Huggies",
        category: "Earrings",
        material: "Gold",
        price: 196,
        onSale: true,
        discount: 15,
        img: "https://www.gorjana.com/cdn/shop/files/224-002-186-G_1_5ecb4268-71ef-46c3-9ca4-6bfa9ff65f8c.jpg?v=1698163725&%3Bwidth=1080&em-format=avif&em-width=1080",
        description: "Crafted with a genuine freshwater pearl set on a 14k solid gold chain, this pair of modern huggie earrings are perfect for everyday wear or special occasions."
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cart-container');

    // Function to render products in the cart
    const renderCartItems = (products) => {
        products.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.className = 'row cart-item';
            cartItem.dataset.price = product.price;

            cartItem.innerHTML = `
                <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                        <img class="productImg w-100" src="${product.img}" alt="${product.name}" />
                        <a href="#!">
                            <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                        </a>
                    </div>
                </div>

                <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    <p class="productName">${product.name}</p>
                    <p class="productCategory">Category: ${product.category}</p>
                    <p class="productDiscount">${product.onSale ? `Discount: ${product.discount}%` : ''}</p>
                    <p class="data-price">Price: $${product.price}</p>

                    <button type="button" class="btn btn-primary btn-sm me-1 mb-2 remove-item" data-mdb-tooltip-init title="Remove item">
                        <i class="fas fa-trash"></i>Remove item
                    </button>
                </div>

                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <div class="d-flex mb-4" style="max-width: 300px">
                        <button class="btn btn-primary px-3 me-2 btn-minus">
                            <i class="fas fa-minus"></i> 
                        </button>
                        <div data-mdb-input-init class="form-outline">
                            <input min="1" name="quantity" value="1" type="number" class="form-control quantity" />
                            <label class="form-label" for="form1">Quantity</label>
                        </div>
                        <button class="btn btn-primary px-3 ms-2 btn-plus">
                            <i class="fas fa-plus"></i> 
                        </button>
                    </div>
                    <p class="text-start text-md-center item-total-price">$${product.price}</p>
                </div>
            `;

            cartContainer.appendChild(cartItem);
        });

        addEventListeners();
        updateTotalPrice();
    };

    const discountRate = 0.1; // 10% discount

    const updateTotalPrice = () => {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalPrice = 0;

        cartItems.forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity').value);
            const price = parseFloat(item.dataset.price);
            const itemTotalPrice = quantity * price;
            item.querySelector('.item-total-price').textContent = `$${itemTotalPrice.toFixed(2)}`;
            totalPrice += itemTotalPrice;
        });

        const discount = totalPrice * discountRate;
        const totalAmount = totalPrice - discount;

        document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
        document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
    };

    const addEventListeners = () => {
        document.querySelectorAll('.btn-plus').forEach(btn => {
            btn.addEventListener('click', function () {
                const quantityInput = this.closest('.d-flex').querySelector('.quantity');
                quantityInput.stepUp();
                updateTotalPrice();
            });
        });

        document.querySelectorAll('.btn-minus').forEach(btn => {
            btn.addEventListener('click', function () {
                const quantityInput = this.closest('.d-flex').querySelector('.quantity');
                quantityInput.stepDown();
                updateTotalPrice();
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function () {
                this.closest('.cart-item').remove();
                updateTotalPrice();
            });
        });
    };

    renderCartItems(products);

    const btnCheckout = document.getElementById("goToCheckout");
    function checkout() {
        const checkoutAlert = document.getElementById("checkoutAlert");
        const totalAmount = parseFloat(document.getElementById("total-amount").textContent.substring(1));
        if (totalAmount <= 0) {
            checkoutAlert.innerText = "Your cart is empty. Add items to cart!";
        } else {
            checkoutAlert.innerText = "Choose your payment method and shipping address to complete your order!";
        }
    };

    btnCheckout.addEventListener("click", checkout);
});

document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('orderForm');

    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (orderForm.checkValidity() ) {
            alert('The order is successfully submitted.');
            
        } else {
            // Highlight the fields with errors
            orderForm.reportValidity() ;
            alert('Your cart is empty! Add products to submit your order!');
        }
    });
});



