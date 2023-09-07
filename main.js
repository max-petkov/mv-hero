hero();

function hero() {
    const svg = document.querySelector(".hero-interactive svg");
    const imgs = document.querySelectorAll(".hero-interactive .images [data-img]");

    svg.addEventListener("load", function(e) {
        setPosition(imgs, svg);
        animationEnter();
        
        onResize(function() {
            setPosition(imgs, svg)
        });
    });
}

function getRect(el) {
    const rect = el.getBoundingClientRect();
    return { 
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        bottom: rect.bottom + window.scrollY,
        right: rect.right + window.scrollX,
        width: rect.width,
        height: rect.height,
    }
}

function onResize(cb) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    window.addEventListener("resize", function() {
        if(windowWidth !== window.innerWidth || windowHeight !== window.innerHeight) {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
            cb();
        }
    });
}

function setPosition(imgs, svg) {
    imgs.forEach(img => {
        const path = svg.querySelector(`[data-target='${img.getAttribute("data-img")}']`);
        
        img.style.position = "absolute";
        img.style.top = getRect(path).top + "px";
        img.style.left = getRect(path).left + "px";
        img.style.width = getRect(path).width + "px";
        img.style.height = getRect(path).height + "px";
    });
}

function animationEnter() {
    const master = gsap.timeline();

    master
    .add(macAnimation())
    .add(phoneAnimation(), "<")
    
    function phoneAnimation() {
        const cardVisa = document.querySelector(".hero-interactive [data-img='visa']");
        const cardPayment = document.querySelector(".hero-interactive [data-img='payment']");
        const phone = document.querySelector(".hero-interactive [data-img='phone']");
        const tl = gsap.timeline({defaults: {
            duration: 1.2,
            ease: Expo.easeInOut,
        }});
    
        tl
        .fromTo(phone, { x: "25%", autoAlpha: 0}, { x: 0, autoAlpha: 1, delay: 1})
        .fromTo([cardVisa,cardPayment], { scale: 0, autoAlpha: 0}, { autoAlpha: 1, scale: 1, ease: Back.easeOut.config(0.7), duration: 0.6, stagger: 0.1}, "<50%")
        .fromTo(cardVisa, {x: 0, y: 0, scale: 1}, {scale: 1.2, x: -8, y: 0, repeat: -1, yoyo: true, duration: 20, ease: Sine.easeInOut})
        .fromTo(cardPayment, {x: 0, y: 0, scale: 1}, {scale: 1.2, x: 8, y: 20, repeat: -1, yoyo: true, duration: 20, ease: Sine.easeInOut}, "<")
        .fromTo(phone, {scale: 1, x: 0, y:0}, {scale: 0.9, x: 20, repeat: -1, yoyo: true, duration: 20, ease: Sine.easeInOut}, "<");

        return tl;
    }

    function macAnimation() {
        const desktop = document.querySelector(".hero-interactive [data-img='mac']");
        const panels = document.querySelectorAll(".hero-interactive [data-img]:not([data-img='mac'], [data-img='phone'], [data-img='visa'], [data-img='payment'])");
        const tl = gsap.timeline({defaults: {
            duration: 1.2,
            ease: Expo.easeInOut,
        }});
    
        tl
        .to([desktop, panels], {autoAlpha: 1, duration: 1})
        .fromTo(desktop, { x: "15%"}, { x: 0}, "<")
        .fromTo(panels, { scale: 0}, { scale: 1, ease: Back.easeOut.config(0.7), duration: 0.6, stagger: 0.05}, "<50%");

        return tl;
    }
}