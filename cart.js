document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");

    // Obtener el carrito del almacenamiento local
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Mostrar los productos en el carrito
    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <p>${item.name} - $${item.price} x ${item.quantity}</p>
                    <button class="remove-item" data-index="${index}">❌</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        // Calcular el total
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = `$${total}`;
    }

    // Evento para eliminar productos del carrito
    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });

    // Finalizar compra (puede redirigir a WhatsApp o un formulario de pago)
    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Tu carrito está vacío.");
        } else {
            alert("¡Pedido realizado con éxito!");
            localStorage.removeItem("cart");
            cart = [];
            renderCart();
        }
    });

    renderCart();
});
