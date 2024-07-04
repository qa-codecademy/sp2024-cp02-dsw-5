document.addEventListener('DOMContentLoaded', function () {
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

    updateTotalPrice();
});


const btnCheckout = document.getElementById("goToCheckout");
function checkout(){
    const checkoutAlert = document.getElementById("checkoutAlert");
    const totalAmount= document.getElementById("total-amount");
    if(totalAmount  <= 0){
    checkoutAlert.innerText = "Your cart is empty. Add items to cart!"
    }
    else{
        checkoutAlert.innerText = "Choose your payment method and shipping address to complete your order!"
    };
    };
    
    btnCheckout.addEventListener("click",checkout);




    
document.addEventListener('DOMContentLoaded', function () {
    const orderForm = document.getElementById('orderForm');

    orderForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (orderForm.checkValidity()) {
            alert('The order is successfully submitted.');
        } else {
            // Optionally, highlight the fields with errors
            orderForm.reportValidity();
        }
    });
});