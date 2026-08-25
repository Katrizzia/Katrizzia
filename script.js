// Execute code once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const productCountInput = document.getElementById("productCount");
    const productsContainer = document.getElementById("productsContainer");
    const calculateBtn = document.getElementById("calculateBtn");
    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");

    // Automatically generate inputs on load and whenever productCount changes
    productCountInput.addEventListener("input", generateProductFields);
    generateProductFields();

    function generateProductFields() {
        productsContainer.innerHTML = "";
        const count = parseInt(productCountInput.value) || 0;

        if (count <= 0) return;

        // Use a for loop to dynamically create product entry blocks
        for (let i = 0; i < count; i++) {
            const productDiv = document.createElement("div");
            productDiv.className = "product-box";
            
            productDiv.innerHTML = `
                <h4>Item #${i + 1}</h4>
                <div class="form-group">
                    <label for="productName-${i}">Product Name</label>
                    <input type="text" id="productName-${i}">
                </div>
                <div class="form-group">
                    <label for="productPrice-${i}">Price</label>
                    <input type="number" id="productPrice-${i}" step="0.01" min="0">
                </div>
                <div class="form-group">
                    <label for="productQuantity-${i}">Quantity</label>
                    <input type="number" id="productQuantity-${i}" min="1">
                </div>
            `;
            productsContainer.appendChild(productDiv);
        }
    }

    // Main calculation process
    calculateBtn.addEventListener("click", () => {
        // Clear previous outputs
        validationMessage.textContent = "";
        orderSummary.textContent = "";

        const customerName = document.getElementById("customerName").value.trim();
        const count = parseInt(productCountInput.value) || 0;

        // 1. Validate Customer Name and Product Count
        if (customerName === "") {
            validationMessage.textContent = "Validation Error: Customer Name cannot be empty.";
            return;
        }
        if (count <= 0 || isNaN(count)) {
            validationMessage.textContent = "Validation Error: Number of Products must be a valid positive number.";
            return;
        }

        let subtotal = 0;
        let itemDetailsText = "";

        // 2. Loop through dynamic product inputs and calculate values
        for (let i = 0; i < count; i++) {
            const nameEl = document.getElementById(productName-${i});
            const priceEl = document.getElementById(productPrice-${i});
            const qtyEl = document.getElementById(productQuantity-${i});

            if (!nameEl || !priceEl || !qtyEl) continue;

            const pName = nameEl.value.trim();
            const pPrice = Number(priceEl.value);
            const pQty = Number(qtyEl.value);

            // Item Validation
            if (pName === "") {
                validationMessage.textContent = Validation Error: Product Name at item ${i + 1} cannot be empty.;
                return;
            }
            if (isNaN(pPrice) || pPrice <= 0) {
                validationMessage.textContent = Validation Error: Price at item ${i + 1} must be a valid positive number.;
                return;
            }
            if (isNaN(pQty) || pQty <= 0 || !Number.isInteger(pQty)) {
                validationMessage.textContent = Validation Error: Quantity at item ${i + 1} must be a valid positive integer.;
                return;
            }

            // Calculate current item amount using mandatory top-level function
            const itemAmount = calculateItemAmount(pPrice, pQty);
            subtotal += itemAmount;

            // Save text item lines for the summary layout
            itemDetailsText += - ${pName}: ₱${pPrice.toFixed(2)} x ${pQty} = ₱${itemAmount.toFixed(2)}\n;
        }

        // 3. Compute Discount and Delivery Fee using required functional breakdown
        const discountAmount = calculateDiscount(subtotal);
        const deliveryOptionVal = document.getElementById("deliveryOption").value;
        const deliveryFee = getDeliveryFee(deliveryOptionVal);
        const finalAmount = subtotal - discountAmount + deliveryFee;

        // 4. Generate visual UI overview utilizing template literals
        orderSummary.textContent = `
            === ORDER SUMMARY ===
            Customer Name: ${customerName}
            
            Items Purchased:
            ${itemDetailsText}
            Subtotal: ₱${subtotal.toFixed(2)}
            Discount Applied: -₱${discountAmount.toFixed(2)}
            Delivery Fee: ₱${deliveryFee.toFixed(2)}
            ------------------------------
            Final Amount: ₱${finalAmount.toFixed(2)}
        `.trim();
    });
});

// === MANDATORY TOP-LEVEL FUNCTIONS FOR AUTOGRAPHER COMPATIBILITY ===

function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    if (subtotal >= 5000) {
        return subtotal * 0.10; // 10%
    } else if (subtotal >= 3000) {
        return subtotal * 0.07; // 7%
    } else if (subtotal >= 1000) {
        return subtotal * 0.05; // 5%
    } else {
        return 0; // No discount
    }
}

function getDeliveryFee(option) {
    // Convert choice string to integer mapping 
    switch (Number(option)) {
        case 1:
            return 0;   // Store Pickup
        case 2:
            return 80;  // Standard Delivery
        case 3:
            return 150; // Express Delivery
        default:
            return 0;
    }
}
