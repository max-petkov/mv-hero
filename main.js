hero();

function hero() {
    const svg = document.querySelector(".hero-interactive svg");
    const imgs = document.querySelectorAll(".hero-interactive .images [data-img]");

    svg.addEventListener("load", function(e) {
        setPosition(imgs, svg);
        animationEnter();
        mouseMove();
        
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
        .fromTo([cardVisa,cardPayment], { 
            scale: 0, 
            autoAlpha: 0
        }, { 
            autoAlpha: 1, 
            scale: 1, 
            ease: Back.easeOut.config(0.7), 
            duration: 0.6, 
            stagger: 0.1,
            onComplete: () => gsap.set([cardVisa,cardPayment], {clearProps: "transform"})
        }, "<50%")

        return tl;
    }

    function macAnimation() {
        const desktop = document.querySelector(".hero-interactive [data-img='mac']");
        const panels = document.querySelectorAll(".hero-interactive [data-img]:not([data-img='mac'], [data-img='phone'], [data-img='visa'], [data-img='payment'])");
        const panelBars = document.querySelector(".hero-interactive [data-img='top-right']");
        const bars = panelBars.querySelectorAll(".bars rect");
        const barsHeight = [];
        const lines = panelBars.querySelectorAll(".lines path");
        const tl = gsap.timeline({defaults: {
            duration: 1.2,
            ease: Expo.easeInOut,
        }});

        gsap.set(bars, { attr: {"data-h-bar": function(i, el) {
            barsHeight.push(el.getBoundingClientRect().height);
            return el.getBoundingClientRect().height;
        }
        }});

        tl
        .to([desktop, panels], {autoAlpha: 1, duration: 1})
        .fromTo(desktop, { x: "15%"}, { x: 0}, "<")
        .fromTo(panels, {  scale: 0}, { scale: 1, ease: Back.easeOut.config(0.7), duration: 0.6, stagger: 0.05,}, "<50%")
        .fromTo(bars, {autoAlpha: 0,height: 0}, {autoAlpha: 1,height: function(i, el) { return el.getAttribute("data-h-bar");},stagger: 0.1})
        .fromTo(lines, {
            autoAlpha: 0,
            attr: {
                "stroke-dashoffset": function(i, el) {
                    return el.getTotalLength();
                },
                "stroke-dasharray": function(i, el) {
                    return el.getTotalLength();
                }
            }
        }, {
            autoAlpha: 0.7,
            attr: {
                "stroke-dashoffset": 0,
                "stroke-dasharray": function(i, el) {
                    return el.getTotalLength();
                }
            },
            stagger: 0.1,
            ease: Sine.easeInOut,
            yoyo: true,
            repeat: -1,
            repeatDelay: 2,
            onRepeat: function() {
                const yoyoBack = this.iteration() % 2 === 0;
                if(yoyoBack) {
                    gsap.to(bars, {
                        height: 0,
                        stagger: {
                            each: 0.1,
                            from: "end",
                        },
                    })
                    return;
                } else {
                    gsap.to(bars, {
                        height: function(i, el) { 
                            const randomHeight = gsap.utils.random( Number(el.getAttribute("data-h-bar")) / 4, Math.max(...barsHeight));
                            return randomHeight;
                        },
                        stagger: 0.1,
                    })
                }
            }
        }, "<25%")

        return tl;
    }
}

function mouseMove() {
    if(window.innerWidth <= 1080) return;

    const section = document.querySelector(".hero");
    const move = {x: 0, y: 0};
    const pos = {x: move.x, y: move.y};

    animate();

    section.addEventListener("mousemove", function(e) {
        move.x = ((e.clientX / window.innerWidth) - 0.5) * 5;
        move.y = ((e.clientX / window.innerWidth) - 0.5) * 5;
    });

    function animate() {
        pos.x = lerp(pos.x, move.x, smoothStep(0.1));
        pos.y = lerp(pos.y, move.y, smoothStep(0.1));

        section.style.setProperty("--x", pos.x + "px");
        section.style.setProperty("--y", pos.y + "px");

        requestAnimationFrame(animate);
    }

    function lerp (start, end, t) {
        return start + (end - start) * t;
    }

    function smoothStep(t) {
        const v1 = t * t;
        const v2 = 1.0 - (1.0 - t ) * (1.0 - t);
        return lerp(v1, v2, t)
    }
}