// This runs only on the landing page and triggers a welcome alert.
// If it the user's first visit to the page, they receive a 20% discount code
$(".lndBody").ready(function () {
    // If statement serves as insurance that the code only runs on the landing page.
    if ($('.lndBody').length > 0) {
        // Checks the local storage to see if the user has visited the page before.
        let frstPromo = localStorage.getItem('frstPromo') || '';
        // If not, the promo code is generated.
        if (frstPromo != 'yes') {
            // Note that the promoGen() function is only called inside this block to ensure that the code is only generated when the if statement returns true.
            let promoCode = `artD${promoGen()}`;
            alert(`Welcome to artDecor!\r\n 
            As a first time visitor you get a once off 20% discount. \r\n
            Simply apply this PROMO code when you check out. \r\n
            Code: ${promoCode}`);
            // Save status of the page visit to local storage.
            localStorage.setItem('frstPromo', 'yes');
            // Save the promo code generated in this block to local storage, to be recalled later.
            localStorage.setItem('promo', promoCode);
            // Writes code to console for debugging purposes.
            console.log(promoCode);
            // If statement returns false and a simple welcome alert is triggered.
        } else {
            alert(`Welcom to artDecor!`);
        }
    }
});

// Generic funtions

// Function to generate a promo code. Function is only called in one instance.
function promoGen() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

/*let cartItems = document.getElementById('shpCart');
cartItems.style.visibility = "hidden";*/
$("#shpCart").hide();

// Shopping Cart

// Internal code
// Declare variable for elements that will be used.
let cart = [];

// Product constructor
function product(prod, count, price) {
    this.prod = prod;
    this.count = count;
    this.price = price;
}

// Function that stores the cart array as JSON file.
function storeCart() {
    sessionStorage.setItem("shopCart", JSON.stringify(cart));
}

// Function that takes an amount string paramater and converts it to a float with two decimals after the comma.
function itemTotal(itemPrice) {
    let item_price = itemPrice.replace(/ /g, '');
    return parseFloat(item_price).toFixed(2);
}

// Funtion that converts the string amount of and item and then calculates the vat amount on that item.
function vatCalc(itemPrice) {
    let item_price = itemPrice.replace(/ /g, '');
    let vat_amount = parseFloat(item_price) / 115 * 15;
    return vat_amount;
}

// Funtion to clear the session storage
$('.clear').on('click', function () {
    sessionStorage.clear();
})

// Function that loads the shopping cart page.
// This function contains mostly private methods/functions and calls public methods/functions as needed
$('.shoppingCart').ready(function loadCart() {
    // Console to use during debugging to see if the ready function ran.
    console.log('ready');

    // Check to see if cart has items loaded
    if (sessionStorage.getItem('cartItemsLoaded' === null)) {
        sessionStorage.setItem("shopCart", JSON.stringify(cart));
        sessionStorage.setItem("cartItemsLoaded", true);
    } else {
        // Retrieve array from sessionStorage
        cart = JSON.parse(sessionStorage.getItem("shopCart"));
        cart = cart != null ? cart : [];

        // Declare iterator
        let cartItems;
        // Loop over array objects with forEach and create <tr> for each object.
        $.each(cart, function (index, value) {
            // Create <tr> element to hold items
            cartItems = $("<tr id='cartItem'>" +
                // Product name
                "<td>" + value.prod + "</td>" +
                // Individual product price
                "<td>R" + value.price + "</td>" +
                // Quantity of product
                "<td>" + "<input type='number' class='form-control border border-dark rounded qntCount' data-id=' " + index + " ' id='' data-name=" + value.prod + " value='" + value.count + "'>" + "<label class='form-label' for='qntCount'>Qnt</label>" + "</td>" +
                // Total price of selected product items
                "<td>" +
                "<div class='form'>" +
                "<div class='input-group'>" +
                "<div class='input-group-prepend'>" +
                "<span class='input-group-text' id=''> R </span>" +
                "</div>" +
                // Amount display
                "<input type='text' inputmode='numeric' class='form-control border border-dark rounded prodTotal' data-name=" + value.prod + " value='" + new Intl.NumberFormat().format(value.count * itemTotal(value.price)) + "' aria-describedby='" + index + value.prod + "' disabled style='background: white;'>" +
                "<span class='input-group-btn'>" +
                // VAT display popover
                "<button class='btn btn-secondary has-popover vatBtn' data-toggle='popover' title='VAT incl.' data-content='A VAT amount of R" + new Intl.NumberFormat().format((vatCalc(value.price) * value.count).toFixed(2)) + " is included.'>" + '(VAT)' + "</button>" +
                "</span>" +
                "</div>" +
                "<label class='input-label' for='total'>Total</label>" +
                "</div>" +
                "</td>" +
                // Remove product
                "<td>" + "<button class='btn btn-outline-danger removeBtn' data-id='" + index + "'>" + "<i class='bi bi-cart-dash'></i>" + "</button>" + "</td>" +
                "</tr>");

            // Writing each index number to the console to make sure the .each loop covered all.
            // Can call cart[index] to print the index items
            console.log(index);

            // Chained functions to append each <tr> to the table and show(unhide) the table.
            $("#shpCart").append(cartItems).show();

        });

        /* Functions and variable declared here are limited to the shopping cart page but needs to operate outside the
         scope of the .each() loop. */

        // jQuery to show/hide popovers on the VAT buttons inside the .each loop.
        // It is placed outside of the loop to ensure that it is applied to all the dynamically loaded elements.
        $('[data-toggle="popover"]').popover();

        // Animation chain to animate the VAT button to fade in and out when clicked.
        // It promotes good user experience to see that the button was in fact clicked.
        $(".vatBtn").on('click', function (e) {
            $(e.target).animate({
                    opacity: 0.4
                }, 100, )
                .animate({
                    opacity: 1
                })
        });

        // Add eventListener to removeBtn which removes the selected item from the cart array.
        // Note that this removes the entire item seeing as there is already a function to change quantity.
        $(".removeBtn").on('click', function () {
            // Check to see that the correct element is used.
            console.log($(this));
            // Declare variable for index.
            let i = parseInt($(this).data('id'));
            // Check variable
            console.log(i);
            // Remove object from cart at selected index
            cart.splice(i, 1);
            // Store current cart array
            sessionStorage.setItem("shopCart", JSON.stringify(cart));
            // Reload page
            location.reload();
        });

        /* Add eventListener to Qnty input that increases the count value in the cart array when it is changed
         in the HTML element */
        $(".qntCount").change(function changeQnty(event) {
            let j = parseInt($(event.target).data('id'), 10);
            // Change count at given index
            cart[j].count = $(event.target).val();
            // Store current cart array
            sessionStorage.setItem("shopCart", JSON.stringify(cart));
            // Reload page
            location.reload();
        });
    }

    // Declare a public value for the cart total.
    /* The cartTotal value is set equal to the return value of a function that gets the sum price of all items in the cart */
    cartTotal = cart.reduce(function (sum, current) {
        console.log(itemTotal(current.price));
        return sum + (itemTotal(current.price) * current.count);
    }, 0);
    // Check to ensure that it is of type number.
    console.log(typeof (cartTotal));

    // Set the value of the cartTotal input equal to the cartTotal variable.
    $(".cartTotal").val('R' + new Intl.NumberFormat().format(cartTotal));

    // Delivery options event on radio buttons
    $(document).on('change', 'input:radio[name="deliveryRadios"]', function (event) {
        // If statement returns true if the user selected deliver option
        // This option triggers a modal.
        if (event.target.value == 'deliver') {
            alert("Deliver");
        // If statement retruns true if user selected collect and pushes the normal total to the input.
        } else if (this.value == 'collect') {
            alert("Collect");
            $(".cartTotal").val('R' + new Intl.NumberFormat().format(cartTotal));
        }
    });

    // Delivery-Form options event on radio buttons
    $(document).on('change', 'input:radio[name="deliveryOptRadios"]', function () {
        // If statement returns true if 'standard delivery' is chosen
        if (this.value == 'standard') {
            // Free deliver for items over R20 000, if statement returns true if items are under that amount.
            if (cartTotal < 20000) {
                alert("Standard Delivery");
                console.log(cartTotal);
                // Adds standard delivery fee to total.
                let deliveryTotal = cartTotal + 100;
                $(".cartTotal").val('R' + new Intl.NumberFormat().format(deliveryTotal));
            }
        // If statement returns true when 'express delivery' is chosen.
        } else if (this.value == 'express') {
            alert("Express Delivery");
            // Delivery fee of R1000 is added to the total.
            let deliveryTotal = cartTotal + 1000;
            $(".cartTotal").val('R' + new Intl.NumberFormat().format(deliveryTotal));
        // If statement returns true when 'overnight delivery' is chosen.
        } else if (this.value == 'overnight') {
            alert("Overnight Delivery");
            // Delivery fee of R2000 is added to the total.
            let deliveryTotal = cartTotal + 2000;
            $(".cartTotal").val('R' + new Intl.NumberFormat().format(deliveryTotal));
        }
    });

    // Retrieve the promoCode from the local storage.
    let promoCode = localStorage.getItem('promo') || '';
    // Write it to console for debugging purposes.
    console.log(promoCode);

    // Calls discount form modal.
    $('#discountModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-body input').val(recipient)
    });

    // Applies discount
    $('#discountModal').on('click', '#applyDiscount', function () {
        if ($('.discCode').val() === promoCode) {
            // Declare variable for discount total with discounted total.
            let discountTotal = cartTotal - (cartTotal / 100 * 20);
            // Set new total to input.
            $(".cartTotal").val('R' + new Intl.NumberFormat().format(discountTotal));
            alert(`Your new total is R ${new Intl.NumberFormat().format(discountTotal.toFixed(2))}`);
            $('.btnModalConfirm').modal('show');
        // If statement returns false, inform user that code is invalid
        } else {
            console.log($('.discCode').val());
            alert('Your promo code seems to be invalid.');
        }
    });

    // Does not apply discount
    $('#discountModal').on('click', '#noDiscount', function () {
        $('.btnModalConfirm').modal('show');
    });

    // Confirm order

    //  This function generates a unique reference number for the order.
    function referenceGen() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    // Event that calls the referenceGen() and then pushes a message to the confirm order screen/ modal.
    $('#btnConfirmModal').on('click', '.confirmBtn', function (e) {
        e.preventDefault();
        let order_refernce = `Thank you for creating your space with us!</br>Please keep the following reference number safe.</br></br><b>Ref: ${referenceGen()}</b>`;
        console.log(order_refernce);
        $('.orderReference').html(order_refernce);
    });

});

// Generic methods and properties

// Event to add items to the cart array when the add button is clicked.
$(".prodItem").on("click", ".addCart", function (e) {
    // Get the cart array from the sessionStorage
    cart = JSON.parse(sessionStorage.getItem('shopCart'));
    // If it doesn't exist or is empty, create a new cart array.
    cart = cart != null ? cart : [];

    // Declare a product variable with jQuery for the selected item
    let selectedProd = $(e.target).closest('.prodItem').find('.prodName').html();
    // Write to console for debugging
    console.log(selectedProd);
    // Declare a price variable with jQuery for the selected item
    let selectedPrice = $(this).siblings('.price').html();
    // Write to console for debugging
    console.log(selectedPrice);
    // Set the count to one (when item is selected it should automatically be one and not zero items.)
    let count = 1;

    // Create new product object using the product constructor.
    let currentProd = new product(
        selectedProd,
        count,
        selectedPrice);

    // Make sure the cart is of type array
    console.log($.type(cart));

    // Declare a boolean to check the existence of array item.
    let exists = false;
    // Use the .each() function to loop throught the array and check for product items.
    $.each(cart, function (index, value) {
        // Make sure the cart is of type array
        console.log($.type(cart));
        // If statement returns true if the selected item already exists in the array.
        if (selectedProd === value.prod) {
            // The count property is increased by one.
            value.count++;
            // Ensure that selected item and array item match.
            console.log(selectedProd);
            console.log(value.prod);
            // Set boolean to true.
            exists = true;
            storeCart();
        }
    });
    // Check boolean status, if false, add new object to array.
    if (!exists) {
        cart.push(currentProd);
    }

    // Save array to sessionStorage
    storeCart();

    // Update cart total.
    cartTotal = cart.reduce(function (sum, current) {
        console.log(itemTotal(current.price));
        return sum + (itemTotal(current.price) * current.count);
    }, 0);
    console.log(cartTotal);
    // Alert user of new cart total.
    alert(`Your new total is R${new Intl.NumberFormat().format(cartTotal.toFixed(2))}`);
});