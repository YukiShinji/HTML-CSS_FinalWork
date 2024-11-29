const cartArray = [];

class itemCard {
    constructor(card, quantity = 1) {
        this.card = card;
        this.quantity = quantity;
    }
}

const pack = document.getElementById("pack");
const children = pack.children;

const take = document.getElementById("take");
const take__container = document.getElementById("take__container");

const addToCart = document.querySelectorAll(".card__button");

const cartCounter = document.getElementById("parent");

hide();

for (let index = 0; index < children.length; index++) {
    children[index].setAttribute("data-index", index);
}

[].forEach.call(addToCart, function (el) {
    el.onclick = function () {
        const parentCard = el.closest(".card");
        let cardNumber = parentCard.getAttribute("data-index");
        let probe = findCard(cartArray, cardNumber);
        if (probe === -1) {
            const newCard = new itemCard(cardNumber, 1);
            cartArray.push(newCard);
        }
        if (probe >= 0) {
            cartArray[probe].quantity++;
        }
        render();
    };
});

take.addEventListener("click", function (e) {
    if (e.target.classList.contains("cartitem__remove")) {
        const card = e.target.getAttribute("data-index");
        let probe = findCard(cartArray, card);
        let checkQuantity = cartArray[probe].quantity;
        if (checkQuantity > 1) {
            cartArray[probe].quantity--;
        }
        if (checkQuantity <= 1) {
            cartArray.splice(probe, 1);
        }
        render();
    }
});

function render() {
    hide();
    take__container.innerHTML = ``;
    cartArray.forEach((element) => {
        take__container.innerHTML += cardBuild(element.card, element.quantity);
    });
    take.innerHTML = `
	    <div class="take__header">
	        <h2 class="goods__header text__center">Cart Items</h2>
	    </div>
	    <div class="take__container">
	        ${take__container.innerHTML}
	    </div>
    `;
}

function hide() {
    if (cartArray.length === 0) {
        take.style.display = "none";
        cartCounter.classList.remove("parent__info");
    }
    if (cartArray.length > 0) {
        take.style.display = "block";
        cartCounter.setAttribute("count", countCart(cartArray));
        cartCounter.classList.add("parent__info");
    }
}

function cardBuild(number, quantity) {
    number = parseInt(number) + 1;
    let cardHTML = `
            <div class="cartitem">
                <div class="cartitem__imagebox">
                    <img
                        class="cartitem__img"
                        src="img/goods0${number}.png"
                        alt="goods01"
                    />
                </div>
                <div class="cartitem__box">
                <div class="text__container">
                    <h3 class="cartitem__header">MANGO PEOPLE T&#8209SHIRT</h3>
                    <p class="cartitem__info">
                        Price: <span class="cartitem__info_price">$300</span>
                    </p>
                    <p class="cartitem__info">Color: Red</p>
                    <p class="cartitem__info">Size: Xl</p>
                    <div class="cart__quantity">
                        <p class="cartitem__info">Quantity:</p>
                        <p class="cartitem__number">${quantity}</p>
                    </div>
                    </div>
					<div class="cartitem__remove" data-index="${number - 1}">
						<img class="remove__img" src="img/remove.svg" alt="remove">
					</div>
                </div>
            </div>
            `;
    return cardHTML;
}

function findCard(arr, item) {
    return arr.findIndex((e) => e.card === item);
}

function countCart(arr) {
    return arr.reduce((a, b) => a + b.quantity, 0);
}