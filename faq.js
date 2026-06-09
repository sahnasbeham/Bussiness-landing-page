document.addEventListener("DOMContentLoaded", function () {
    
    /* ==========================================================================
       1. FAQ ACCORDION ENGINE
       ========================================================================== */
    const faqTriggers = document.querySelectorAll(".faq-trigger");

    faqTriggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            const currentItem = this.parentElement;
            const currentPanel = this.nextElementSibling;
            
            if (!currentItem || !currentPanel) return; 
            
            const isActive = currentItem.classList.contains("active");

            document.querySelectorAll(".faq-item.active").forEach(openItem => {
                if (openItem !== currentItem) {
                    openItem.classList.remove("active");
                    
                    const siblingTrigger = openItem.querySelector(".faq-trigger");
                    const siblingPanel = openItem.querySelector(".faq-panel");
                    
                    if (siblingTrigger) siblingTrigger.setAttribute("aria-expanded", "false");
                    if (siblingPanel) siblingPanel.style.maxHeight = "0";
                }
            });

            if (!isActive) {
                currentItem.classList.add("active");
                this.setAttribute("aria-expanded", "true");
                currentPanel.style.maxHeight = currentPanel.scrollHeight + "px";
            } else {
                currentItem.classList.remove("active");
                this.setAttribute("aria-expanded", "false");
                currentPanel.style.maxHeight = "0";
            }
        });
    });

    /* ==========================================================================
       2. IMAGE LIGHTBOX MODAL ENGINE
       ========================================================================== */
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.getElementById("closeModalBtn");
    const imageFrames = document.querySelectorAll(".img-frame");

    imageFrames.forEach(function (frame) {
        frame.addEventListener("click", function () {
            const targetImg = frame.querySelector(".clickable-img");
            
            if (modal && modalImg && targetImg) {
                modalImg.src = targetImg.src; 
                modal.classList.add("active"); 
                document.body.style.overflow = "hidden"; 
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove("active"); 
            document.body.style.overflow = "auto"; 
        }
    }
});