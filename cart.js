document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Opciones de toppings disponibles
    const availableToppings = ["Huevo", "Cebolla", "Alga", "Carne extra", "Queso", "Chiles"];

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
                    <img src="${item.image}" alt="${item.name}" class="cart-image">
                    <p>${item.name} - $${item.price} x ${item.quantity}</p>
                    
                    <label for="toppings-${index}"><strong>Elige tus toppings:</strong></label>
                    <select multiple class="toppings-select" id="toppings-${index}" data-index="${index}">
                        ${availableToppings.map(topping => `
                            <option value="${topping}" ${item.toppings.includes(topping) ? "selected" : ""}>${topping}</option>
                        `).join("")}
                    </select>

                    <button class="update-toppings" data-index="${index}">Actualizar Toppings</button>
                    <button class="remove-item" data-index="${index}">❌</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        // Calcular el total
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

    // Actualizar los toppings de un producto
    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("update-toppings")) {
            const index = e.target.dataset.index;
            const toppingsSelect = document.getElementById(`toppings-${index}`);
            const selectedToppings = Array.from(toppingsSelect.selectedOptions).map(option => option.value);

            cart[index].toppings = selectedToppings;
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Toppings actualizados!");
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


        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} agregado al carrito con toppings: ${toppings.join(", ") || "Ninguno"}`);
    });
});
