document.addEventListener("DOMContentLoaded", () => {

    // ======================
    // DARK MODE
    // ======================

    const themeToggle =
        document.getElementById(
            "theme-toggle"
        );

    const html =
        document.documentElement;

    const savedTheme =
    localStorage.getItem(
        "theme"
    ) || "dark";

    html.setAttribute(
    "data-theme",
    savedTheme
    );

    updateThemeIcon(
    savedTheme
    );

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                html.getAttribute(
                    "data-theme"
                );

            const newTheme =
                currentTheme === "dark"
                ? "light"
                : "dark";

            html.setAttribute(
                "data-theme",
                newTheme
            );

            localStorage.setItem(
                "theme",
                newTheme
            );

            updateThemeIcon(
                newTheme
            );
        }
    );

    function updateThemeIcon(
        theme
    ) {

        themeToggle.innerHTML =
            theme === "dark"
                ? `<i class="bi bi-sun-fill"></i>`
                : `<i class="bi bi-moon-stars-fill"></i>`;
    }

    // ======================
    // REVEAL ANIMATION
    // ======================

    const reveals =
        document.querySelectorAll(
            ".reveal"
        );

    const revealOnScroll =
        () => {

            reveals.forEach(
                element => {

                    const windowHeight =
                        window.innerHeight;

                    const elementTop =
                        element.getBoundingClientRect()
                        .top;

                    const visible =
                        100;

                    if (
                        elementTop <
                        windowHeight - visible
                    ) {

                        element.classList.add(
                            "active"
                        );
                    }
                }
            );
        };

    window.addEventListener(
        "scroll",
        revealOnScroll
    );

    revealOnScroll();

    // ======================
    // ACTIVE NAVBAR
    // ======================

    const sections =
        document.querySelectorAll(
            "section"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    window.addEventListener(
        "scroll",
        () => {

            let current = "";

            sections.forEach(
                section => {

                    const sectionTop =
                        section.offsetTop;

                    const sectionHeight =
                        section.clientHeight;

                    if (
                        pageYOffset >=
                        sectionTop - 200
                    ) {

                        current =
                            section.getAttribute(
                                "id"
                            );
                    }
                }
            );

            navLinks.forEach(
                link => {

                    link.classList.remove(
                        "active-link"
                    );

                    if (
                        link.getAttribute(
                            "href"
                        ) ===
                        `#${current}`
                    ) {

                        link.classList.add(
                            "active-link"
                        );
                    }
                }
            );
        }
    );

    // ======================
    // NAVBAR SCROLL EFFECT
    // ======================

    const navbar =
        document.querySelector(
            ".custom-navbar"
        );

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 50
            ) {

                navbar.style.padding =
                    ".8rem 0";

                navbar.style.backdropFilter =
                    "blur(30px)";

            } else {

                navbar.style.padding =
                    "1rem 0";
            }
        }
    );

    // ======================
    // MOBILE MENU AUTO CLOSE
    // ======================

    const navItems =
        document.querySelectorAll(
            ".nav-link"
        );

    const navbarCollapse =
        document.querySelector(
            ".navbar-collapse"
        );

    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                if (
                    navbarCollapse.classList.contains(
                        "show"
                    )
                ) {

                    new bootstrap.Collapse(
                        navbarCollapse
                    ).toggle();
                }
            }
        );
    });

});