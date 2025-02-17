document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Mostrar productos en el carrito
    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-image">
                    <p>${item.name} - $${item.price} x ${item.quantity}</p>
                    <p><strong>Toppings:</strong> ${item.toppings.join(", ") || "Ninguno"}</p>
                    <button class="remove-item" data-index="${index}">❌</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = `$${total}`;
    }

    // Eliminar productos del carrito
    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });

    // Finalizar compra
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

// Agregar productos al carrito
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const name = this.dataset.name;
        const price = parseInt(this.dataset.price);
        const image = this.dataset.image;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Preguntar por toppings
        let toppings = prompt("Ingresa los toppings separados por comas (ejemplo: huevo, cebolla, algas)").split(",").map(t => t.trim());

        // Buscar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.toppings.push(...toppings);
        } else {
            cart.push({ name, price, quantity: 1, image, toppings });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} agregado al carrito con toppings: ${toppings.join(", ") || "Ninguno"}`);
    });
});
