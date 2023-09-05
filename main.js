phone();

function phone() {
    const svg = document.querySelector(".phone svg");
    const imgs = document.querySelectorAll(".phone .images img");
    
    svg.addEventListener("load", function(e) {
        
        imgs.forEach(img => {
            const path = svg.querySelector(`[data-target='${img.getAttribute("data-img")}']`);
            
            img.style.position = "absolute";
            img.style.top = getRect(path).top + "px";
            img.style.left = getRect(path).left + "px";
            img.style.width = getRect(path).width + "px";
            img.style.height = getRect(path).height + "px";
        });

    });

}

function getRect(el) {
    const rect = el.getBoundingClientRect();
    return { 
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
        width: rect.width,
        height: rect.height,
    }
}