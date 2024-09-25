/*=============== CARD POPUP JS ===============*/
const modal = document.querySelectorAll('.modal'),
      cardBtn = document.querySelectorAll('.card__product'),
      modalClose = document.querySelectorAll('.modal__close'),
      modalCard = document.querySelectorAll('.modal__card');

let activeModal = (modalClick) => {
    modal[modalClick].classList.add('active-modal');
}

/* Show modal */
cardBtn.forEach((cardBtn, i) => {
    cardBtn.addEventListener('click', () => {
        activeModal(i);
    });
});

/* Hide modal */
modalClose.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modal.forEach((modalRemove) => {
            modalRemove.classList.remove('active-modal');
        });
    });
});

/* Hide modal on background click */
modal.forEach((modal) => {
    modal.addEventListener('click', () => {
        modal.classList.remove('active-modal');
    });
});

/* Don't hide modal on card click (by event propagation) */
modalCard.forEach((modalCard) => {
    modalCard.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

/*=============== FIREBASE CONFIGURATION ===============*/
const firebaseConfig = {
   apiKey: "AIzaSyDbspFcf9ND0pb0BOflyNYExgdBC7XpwTg",
   authDomain: "gadget-rental-app.firebaseapp.com",
   projectId: "gadget-rental-app",
   storageBucket: "gadget-rental-app.appspot.com",
   messagingSenderId: "419969074369",
   appId: "1:419969074369:web:c5daf5dc396d5822804040",
   measurementId: "G-WKXQQ7VLNN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/*=============== ADD ITEM TO FIRESTORE (Add to Cart) ===============*/
function addItemToCart(itemName, itemPrice, itemImage) {
    db.collection('cart').add({
        name: itemName,
        price: itemPrice,
        image: itemImage,
        addedAt: firebase.firestore.FieldValue.serverTimestamp() // Adds a timestamp to the document
    })
    .then(() => {
        console.log('Item added to Firestore (cart) successfully!');
        alert('Item added to cart!');
    })
    .catch(error => {
        console.error('Error adding item to Firestore (cart): ', error);
    });
}

/*=============== ADD ITEM TO FIRESTORE (Rent Now) ===============*/
function rentNow(itemName, itemPrice, itemImage) {
    db.collection('rentedItems').add({
        name: itemName,
        price: itemPrice,
        image: itemImage,
        rentedAt: firebase.firestore.FieldValue.serverTimestamp() // Adds a timestamp for rent
    })
    .then(() => {
        console.log('Item rented successfully!');
        alert('Item rented successfully!');
    })
    .catch(error => {
        console.error('Error renting item: ', error);
    });
}

/* Add event listeners to "Add to Cart" buttons inside modals */
document.querySelectorAll('.modal__button:not(.modal__button-ghost)').forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default action

        // Get product details from the modal
        const modal = e.target.closest('.modal__card');
        const itemName = modal.querySelector('.modal__name').textContent;
        const itemPrice = modal.querySelector('.modal__price').textContent;
        const itemImage = modal.querySelector('.modal__img').src;

        // Call function to add the item to the Firestore 'cart' collection
        addItemToCart(itemName, itemPrice, itemImage);
    });
});

/* Add event listeners to "Rent Now" buttons inside modals */
document.querySelectorAll('.modal__button-ghost').forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default action

        // Get product details from the modal
        const modal = e.target.closest('.modal__card');
        const itemName = modal.querySelector('.modal__name').textContent;
        const itemPrice = modal.querySelector('.modal__price').textContent;
        const itemImage = modal.querySelector('.modal__img').src;

        // Call function to rent the item to the Firestore 'rentedItems' collection
        rentNow(itemName, itemPrice, itemImage);
    });
});
