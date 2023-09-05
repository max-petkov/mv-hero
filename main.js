phone();
desktop();

function phone() {
    const svg = document.querySelector(".phone svg");
    const imgs = document.querySelectorAll(".phone .images [data-img]");
    
    svg.addEventListener("load", function(e) {
        setPosition(imgs, svg);
        animationEnterPhone(imgs);
    });
}

function desktop() {
    const svg = document.querySelector(".desktop svg");
    const imgs = document.querySelectorAll(".desktop .images [data-img]");
    
    svg.addEventListener("load", function(e) {
        setPosition(imgs,svg)
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

function animationEnterPhone(imgs) {
    const cardVisa = document.querySelector(".phone [data-img='visa']");
    const cardPayment = document.querySelector(".phone [data-img='payment']");
    const mobile = document.querySelector(".phone [data-img='phone']");
    const tl = gsap.timeline({defaults: {
        duration: 1.2,
        ease: Expo.easeInOut
    }});

    tl
    .to(imgs, {autoAlpha: 1, duration: 1})
    .fromTo(mobile, { x: "25%"}, { x: 0}, "<")
    .fromTo(cardVisa, { scale: 0}, { scale: 1, ease: Back.easeOut.config(1.1), duration: 0.6}, "<50%")
    .fromTo(cardPayment, { scale: 0}, { scale: 1, ease: Back.easeOut.config(1.1), duration: 0.6}, "<")
}