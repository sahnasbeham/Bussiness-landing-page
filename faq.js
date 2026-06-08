    document.addEventListener("DOMContentLoaded", () => {
        const triggers = document.querySelectorAll(".faq-trigger");

        triggers.forEach(trigger => {
            trigger.addEventListener("click", function() {
                const currentItem = this.parentElement;
                const currentPanel = this.nextElementSibling;
                const isActive = currentItem.classList.contains("active");

                // Auto-collapses open siblings to maintain clean single-view accordion focus
                document.querySelectorAll(".faq-item.active").forEach(openItem => {
                    if (openItem !== currentItem) {
                        openItem.classList.remove("active");
                        openItem.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
                        openItem.querySelector(".faq-panel").style.maxHeight = "0";
                    }
                });

                // Toggle visibility settings for active target element
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
    });
