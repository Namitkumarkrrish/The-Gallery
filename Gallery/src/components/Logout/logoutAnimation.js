import gsap from 'gsap';

export const animateLogoutExit = (element, onComplete) => {
    const tl = gsap.timeline({ onComplete });

    tl.to(element, { 
        scale: 0.9, 
        opacity: 0, 
        duration: 0.4, 
        ease: "power2.in" 
    })
    .to("body", { 
        backgroundColor: "#000", 
        duration: 0.3 
    }, "-=0.2"); // Start slightly before the previous animation ends
};