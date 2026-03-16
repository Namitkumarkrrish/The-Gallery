import gsap from 'gsap';

export const openModalAnim = (modalRef, contentRef) => {
    const tl = gsap.timeline();
    
    // Initial Hidden State
    gsap.set(modalRef, { display: 'flex', opacity: 0 });
    gsap.set(contentRef, { scale: 0.8, opacity: 0, filter: "blur(10px)" });

    tl.to(modalRef, { 
        opacity: 1, 
        duration: 0.5, 
        ease: "power2.out" 
    })
    .to(contentRef, { 
        scale: 1, 
        opacity: 1, 
        filter: "blur(0px)",
        duration: 0.8, 
        ease: "expo.out" 
    }, "-=0.2")
    // Subtle float animation for the image inside the modal
    .fromTo(".modalFullImage", 
        { scale: 1.1, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }, 
        "-=0.5"
    );
};

export const closeModalAnim = (modalRef, contentRef, onComplete) => {
    const tl = gsap.timeline({ onComplete });
    
    tl.to(contentRef, { 
        scale: 0.9, 
        opacity: 0, 
        y: 20, 
        duration: 0.4, 
        ease: "power2.in" 
    })
    .to(modalRef, { 
        opacity: 0, 
        duration: 0.3 
    }, "-=0.2");
};