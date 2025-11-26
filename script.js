// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Fade in animations
const elements = document.querySelectorAll("section, .review, .benefit");

function fadeInOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", fadeInOnScroll);

// Initial animation state
elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "all .6s ease-out";
});

fadeInOnScroll();
