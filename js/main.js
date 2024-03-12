let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartItemsElement = document.querySelector('.cart-items');
let cartContentElement = document.querySelector('.cartContent');
let cartElement = document.querySelector('.cart');
let cartIcon = document.querySelector('.cart-icon');
let closeBtn = document.querySelector('.close-btn');

cartIcon.addEventListener('click', showCart);
closeBtn.addEventListener('click', hideCart);

function showAll() {
    fetch('https://fakestoreapi.com/products')
        .then(data => data.json())
        .then(data => {
            render(data)
        })
}

showAll()

function render(data) {
    let main = document.querySelector('.main');
    main.innerHTML = '';
    data.map(item => {
        let div = createItem(item);
        main.append(div);
    });
}

function createItem(item) {
    let div = document.createElement('div');
    div.classList.add('card');

    let img = document.createElement('img');
    img.classList.add('card__img');
    img.src = item.image;

    let content = document.createElement('div');
    content.classList.add('card__content');

    let h2 = document.createElement('h2');
    h2.classList.add('card__title');
    h2.innerHTML = item.title;

    let h5Rating = document.createElement('h5');
    h5Rating.classList.add('card__rate');
    h5Rating.innerHTML = 'Рейтинг ' + item.rating.rate;

    let h5Count = document.createElement('h5');
    h5Count.classList.add('card__rate');
    h5Count.innerHTML = 'Кількість ' + item.rating.count;

    let h4Price = document.createElement('h4');
    h4Price.classList.add('card__price');
    h4Price.innerHTML = 'Ціна ' + item.price;

    let cartIcon = document.createElement('div');
    cartIcon.classList.add('cart-icon-small');
    cartIcon.innerHTML = '🛒';
    cartIcon.addEventListener('click', () => {
        addToCart(item);
    })

    content.append(h2, h5Rating, h5Count, h4Price, cartIcon);
    div.append(img, content);

    return div;
}

console.log(cart);

function addToCart(item) {
    cart.push(item);
    updateCartItemCount();
    saveCartToLocalStorage();
}

function updateCartItemCount() {
    cartItemsElement.innerHTML = cart.length;
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showCart() {
    renderCart();
    cartElement.style.display = 'block';
}

function hideCart() {
    cartElement.style.display = 'none';
}

function renderCart() {
    cartContentElement.innerHTML = '';
    if (cart.length === 0) {
        cartContentElement.innerHTML = 'Корзина порожня';
    } else {
        cart.map(item => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            let title = document.createElement('div');
            title.classList.add('cart-item-title');
            title.innerText = item.title;
            cartItem.appendChild(title);
            cartContentElement.appendChild(cartItem);
        });
    }
}
updateCartItemCount();