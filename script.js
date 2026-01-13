let index = 0;
    const track = document.getElementById('advTrack');

    function showSlide(n) {
        index = n;
    
        let movePercentage = index * 33.333; 
        track.style.transform = `translateX(-${movePercentage}%)`;
        
        // Update dots 
        const dots = document.querySelectorAll('.adv-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        if(dots.length > 0) dots[index].classList.add('active');
    }

    setInterval(() => {
        index++;
        if (index > 2) index = 0; 
        showSlide(index);
    }, 5000);

// Reveal Animation on Scroll
const checkReveal = () => {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', checkReveal);
checkReveal();


// Image  for Eid Collections
function showSlides(carouselId, n) {
    let i;
    let carousel = document.querySelector(`.image-carousel[data-carousel="${carouselId}"]`);
    if (!carousel) return; // Exit if carousel not found

    let slides = carousel.getElementsByTagName("img");
    let dots = carousel.getElementsByClassName("dot");

    // Reset current active slide if index is out of bounds
    if (n > slides.length) { carousel.slideIndex[carouselId] = 1; }
    if (n < 1) { carousel.slideIndex[carouselId] = slides.length; }

    // Hide all slides and deactivate all dots
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    // Show the current slide and activate the current dot
    if (slides[carousel.slideIndex[carouselId]-1]) {
        slides[carousel.slideIndex[carouselId]-1].classList.add('active');
    }
    if (dots[carousel.slideIndex[carouselId]-1]) {
        dots[carousel.slideIndex[carouselId]-1].classList.add('active');
    }
}

// Function to move to the next/previous slide
function plusSlides(carouselId, n) {
    showSlides(carouselId, (carousel.slideIndex[carouselId] += n));
}

// Function to go to a specific slide
function currentSlide(carouselId, n) {
    let carousel = document.querySelector(`.image-carousel[data-carousel="${carouselId}"]`);
    if (!carousel) return;
    carousel.slideIndex[carouselId] = n;
    showSlides(carouselId, n);
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slideIndex for each carousel
    document.querySelectorAll('.image-carousel').forEach(carousel => {
        let id = carousel.dataset.carousel;
        if (!carousel.slideIndex) {
            carousel.slideIndex = {};
        }
        carousel.slideIndex[id] = 1;
        showSlides(id, 1);

        // Auto slide for each carousel (optional, can be removed if only manual is desired)
        // setInterval(() => plusSlides(id, 1), 5000); // Change image every 5 seconds
    });
});

let colIndex = 0;

function moveColSlide(direction) {
    const track = document.querySelector('.collection-track');
    const slides = document.querySelectorAll('.col-slide');
    const wrapperWidth = document.querySelector('.collection-wrapper').offsetWidth;
    const maxIndex = slides.length - 1;

    colIndex += direction;

    if (colIndex < 0) colIndex = 0;
    if (colIndex > maxIndex) colIndex = maxIndex;

    track.style.transform = `translateX(-${colIndex * wrapperWidth}px)`;
}


// SHOPPING CART

function updateCartUI(){
    const container = document.getElementById('cart-items-container');
    const countSpan = document.getElementById('cart-count');
    const totalSpan = document.getElementById('cart-total');

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item,index)=>{
        total += (item.price * item.qty);
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size} | Qty: ${item.qty}</p>
                    <p><strong>RM ${item.price * item.qty}.00</strong></p>
                </div>
                <button onclick="removeItem(${index})" class="remove-btn">✕</button>
            </div>
        `;
    });

    countSpan.innerText = cart.length;
    totalSpan.innerText = `RM ${total}.00`;
    localStorage.setItem('asterCart', JSON.stringify(cart));
}

function removeItem(index){
    cart.splice(index,1);
    updateCartUI();
}

function toggleCart(show){
    document.getElementById('cart-drawer').classList.toggle('open', show);
    document.getElementById('cart-overlay').classList.toggle('active', show);
}
// UNTUK CARTT //
    function updateCartUI() {
        document.getElementById('cart-count').innerText = cart.length;
        localStorage.setItem('asterCart', JSON.stringify(cart));
    }
    updateCartUI();

// Ambil cart dari localStorage atau init empty
let cart = JSON.parse(localStorage.getItem('asterCart')) || [];

// Update cart UI
function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const countSpan = document.getElementById('cart-count');
    const totalSpan = document.getElementById('cart-total');

    if(!container || !countSpan || !totalSpan) return; // safety check

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += (item.price * item.qty);
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size} | Qty: ${item.qty}</p>
                    <p><strong>RM ${item.price * item.qty}.00</strong></p>
                </div>
                <button onclick="removeItem(${index})" class="remove-btn">✕</button>
            </div>
        `;
    });

    countSpan.innerText = cart.length;
    totalSpan.innerText = `RM ${total}.00`;
    localStorage.setItem('asterCart', JSON.stringify(cart));
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Toggle cart drawer
function toggleCart(show) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if(!drawer || !overlay) return;
    drawer.classList.toggle('open', show);
    overlay.classList.toggle('active', show);
}

// SHOPPING CART
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const closeBtn = document.getElementById('close-cart');
    const overlay = document.getElementById('cart-overlay');

    if(cartIcon) cartIcon.addEventListener('click', e => { e.preventDefault(); toggleCart(true); });
    if(closeBtn) closeBtn.addEventListener('click', () => toggleCart(false));
    if(overlay) overlay.addEventListener('click', () => toggleCart(false));

    updateCartUI();
});


// Products data untuk eid2025
        const product = {
            // AUDE
            aude1:{name:"Aude Classic Hazel",price:249,img:"images/aude 1.jpg"},
            aude2:{name:"Aude Classic White",price:249,img:"images/aude 2.jpg"},
            aude3:{name:"Aude Classic Smokey",price:269,img:"images/aude 3.jpg"},
            aude4:{name:"Aude Classic Blossom",price:289,img:"images/aude 4.jpg"},
            aude5:{name:"Aude Classic Olive",price:229,img:"images/aude 5.jpg"},
            // ASIMETRIK
            asim1:{name:"Asimetrik White Top",price:189,img:"images/asimetrik 1.jpg"},
            asim2:{name:"Asimetrik Hazel Top",price:189,img:"images/asimetrik 2.jpg"},
            asim3:{name:"Asimetrik Set White",price:289,img:"images/asimetrik 3.jpg"},
            asim4:{name:"Asimetrik Set Hazel",price:289,img:"images/asimetrik 4.jpg"},
            asim5:{name:"Asimetrik Selendang",price:99,img:"images/selendang.jpg"},
            // GRANDEUR
            grand1:{name:"Grandeur Silk Champange",price:359,img:"images/grandeur 1.jpg"},
            grand2:{name:"Grandeur Silk Sage",price:359,img:"images/grandeur 2.jpg"},
            grand3:{name:"Grandeur Silk Blossom",price:359,img:"images/grandeur 3.jpg"},
            grand4:{name:"Grandeur Silk Pure",price:359,img:"images/grandeur 4.jpg"},
            grand5:{name:"Grandeur Silk Black",price:359,img:"images/grandeur 5.jpg"},
            // ETHEREAL
            eth1:{name:"Ethereal Organza Sakura",price:289,img:"images/ethereal 1.jpg"},
            eth2:{name:"Ethereal Hazel",price:299,img:"images/ethereal 2.jpg"},
            eth3:{name:"Ethereal Champange",price:299,img:"images/ethereal 3.jpg"},
            eth4:{name:"Ethereal Cloud",price:229,img:"images/ethereal 4.jpg"},
            eth5:{name:"Ethereal Organza Dream",price:289,img:"images/ethereal 5.jpg"},
        };

        // Quick Add to Cart
        const eidProductIDs = Object.keys(product);
        document.querySelectorAll(".quick-add").forEach((btn, index) => {
            btn.addEventListener("click", () => {
                const productId = eidProductIDs[index];
                if(!productId) return;

                addToCart(productId,"M",1);
                btn.innerText = "ADDED ✓";
                btn.style.pointerEvents = "none";
                setTimeout(()=>{
                    btn.innerText = "ADD TO CART";
                    btn.style.pointerEvents = "auto";
                },1200);
            });
        });


