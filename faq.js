document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================================================
       1. FAQ ACCORDION ENGINE
       ========================================================================== */
    const faqTriggers = document.querySelectorAll(".faq-trigger");

    faqTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function () {
            const currentItem = this.parentElement;
            const currentPanel = this.nextElementSibling;

            if (!currentItem || !currentPanel) return;

            const isActive = currentItem.classList.contains("active");

            // Close all other open items
            document.querySelectorAll(".faq-item.active").forEach(function (openItem) {
                if (openItem !== currentItem) {
                    openItem.classList.remove("active");
                    const siblingTrigger = openItem.querySelector(".faq-trigger");
                    const siblingPanel  = openItem.querySelector(".faq-panel");
                    if (siblingTrigger) siblingTrigger.setAttribute("aria-expanded", "false");
                    if (siblingPanel)   siblingPanel.style.maxHeight = "0";
                }
            });

            if (!isActive) {
                currentItem.classList.add("active");
                this.setAttribute("aria-expanded", "true");
                // Use scrollHeight so content is never clipped
                currentPanel.style.maxHeight = currentPanel.scrollHeight + "px";
            } else {
                currentItem.classList.remove("active");
                this.setAttribute("aria-expanded", "false");
                currentPanel.style.maxHeight = "0";
            }
        });
    });

    // On window resize, recalculate maxHeight for any open panel so it doesn't clip
    window.addEventListener("resize", function () {
        document.querySelectorAll(".faq-item.active").forEach(function (openItem) {
            const panel = openItem.querySelector(".faq-panel");
            if (panel) {
                // Temporarily remove max-height to measure natural height
                panel.style.maxHeight = "none";
                const naturalHeight = panel.scrollHeight;
                panel.style.maxHeight = naturalHeight + "px";
            }
        });
    });

    /* ==========================================================================
       2. IMAGE LIGHTBOX MODAL ENGINE
       ========================================================================== */
    const modal    = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.getElementById("closeModalBtn");

    // Guard — if modal doesn't exist in DOM, skip
    if (!modal || !modalImg) return;

    // Open modal on image frame click
    document.querySelectorAll(".img-frame").forEach(function (frame) {
        frame.addEventListener("click", function () {
            const targetImg = frame.querySelector(".clickable-img");
            if (!targetImg) return;

            modalImg.src = targetImg.src;
            modalImg.alt = targetImg.alt || "Expanded view";
            modal.classList.add("active");
            document.body.style.overflow = "hidden";

            // Move focus to close button for accessibility
            if (closeBtn) closeBtn.focus();
        });
    });

    // Close via close button
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Close via backdrop click
    modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
    });

    // Close via Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // Restore scroll on page hide (back/forward navigation)
    window.addEventListener("pagehide", function () {
        document.body.style.overflow = "";
    });

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "";
        // Clear src after transition to stop video/gif if any
        setTimeout(function () {
            if (!modal.classList.contains("active")) {
                modalImg.src = "";
            }
        }, 200);
    }

});
