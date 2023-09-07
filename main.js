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
        setPosition(imgs,svg);
        animationEnterDesktop(imgs);
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
    const phone = document.querySelector(".phone [data-img='phone']");
    const tl = gsap.timeline({defaults: {
        duration: 1.2,
        ease: Expo.easeInOut,
    }});

    tl
    .to(imgs, {autoAlpha: 1, duration: 1})
    .fromTo(phone, { x: "25%"}, { x: 0}, "<")
    .fromTo([cardVisa,cardPayment], { scale: 0}, { scale: 1, ease: Back.easeOut.config(0.7), duration: 0.6, stagger: 0.1}, "<50%")
    .fromTo(cardVisa, {x: 0, y: 0, scale: 1}, {scale: 1.2, x: -8, y: 0, repeat: -1, yoyo: true, duration: 20, ease: Sine.easeInOut})
    .fromTo(cardPayment, {x: 0, y: 0, scale: 1}, {scale: 1.2, x: 8, y: 20, repeat: -1, yoyo: true, duration: 20, ease: Sine.easeInOut}, "<")
    .fromTo(phone, {scale: 1, x: 0, y:0}, {scale: 0.8, x: 20, repeat: -1, yoyo: true, duration: 20, ease: Sine.easeInOut}, "<")
}

function animationEnterDesktop(imgs) {
    const desktop = document.querySelector(".desktop [data-img='mac']");
    const panels = document.querySelectorAll(".desktop [data-img]:not([data-img='mac'])");
    const tl = gsap.timeline({defaults: {
        duration: 1.2,
        ease: Expo.easeInOut,
    }});

    tl
    .to(imgs, {autoAlpha: 1, duration: 1})
    .fromTo(desktop, { x: "15%"}, { x: 0}, "<")
    .fromTo(panels, { scale: 0}, { scale: 1, ease: Back.easeOut.config(0.7), duration: 0.6, stagger: 0.05}, "<50%")
}