document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // Dynamic Content Panels
    // =====================================================

    const panelTriggers =
        document.querySelectorAll("[data-panel]");

    const panels =
        document.querySelectorAll(".content-panel");

    const navLinks =
        document.querySelectorAll(".nav-link");


    function showPanel(panelName, updateHash = false) {

        const targetPanel =
            document.getElementById(`panel-${panelName}`);

        if (!targetPanel) {
            return;
        }


        // Hide all panels.

        panels.forEach(panel => {
            panel.classList.remove("active");
        });


        // Show requested panel.

        targetPanel.classList.add("active");


        // Update navigation state.

        navLinks.forEach(link => {

            const isActive =
                link.dataset.panel === panelName;

            link.classList.toggle(
                "active",
                isActive
            );

        });


        // Update the URL hash when navigating inside the site.

        if (updateHash) {

            history.replaceState(
                null,
                "",
                `#${panelName}`
            );

        }


        // Close mobile navigation after selection.

        const siteNav =
            document.querySelector(".site-nav");

        const navToggle =
            document.querySelector(".nav-toggle");

        if (siteNav) {
            siteNav.classList.remove("open");
        }

        if (navToggle) {

            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            navToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    }


    // =====================================================
    // Panel Click Navigation
    // =====================================================

    panelTriggers.forEach(trigger => {

        trigger.addEventListener("click", event => {

            const panelName =
                trigger.dataset.panel;

            if (!panelName) {
                return;
            }

            event.preventDefault();

            showPanel(
                panelName,
                true
            );

        });

    });



    // =====================================================
    // URL Hash Navigation
    //
    // Allows direct links such as:
    //
    // index.html#on-tap
    // index.html#recipes
    // index.html#brewing
    // index.html#brewing-tools
    // index.html#our-story
    // index.html#shop
    //
    // =====================================================

    function showPanelFromHash() {

        const panelName =
            window.location.hash
                .replace("#", "")
                .trim();

        if (!panelName) {
            return;
        }


        const targetPanel =
            document.getElementById(
                `panel-${panelName}`
            );


        if (targetPanel) {

            showPanel(
                panelName,
                false
            );

        }

    }


    // Check the URL when index.html first loads.

    showPanelFromHash();


    // Also respond if the browser hash changes.

    window.addEventListener(
        "hashchange",
        showPanelFromHash
    );



    // =====================================================
    // Mobile Navigation
    // =====================================================

    const navToggle =
        document.querySelector(".nav-toggle");

    const siteNav =
        document.querySelector(".site-nav");


    if (navToggle && siteNav) {

        navToggle.addEventListener("click", () => {

            const isOpen =
                siteNav.classList.toggle("open");

            navToggle.setAttribute(
                "aria-expanded",
                isOpen.toString()
            );

            navToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );

        });

    }

});