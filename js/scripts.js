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




const salaryInput =
    document.getElementById("salary");

salaryInput.addEventListener(
    "input",
    function (e) {

        let value =
            e.target.value
                .replace(/[^,\d]/g, "");

        if (!value) {
            e.target.value = "";
            return;
        }

        const split =
            value.split(",");

        const remainder =
            split[0].length % 3;

        let rupiah =
            split[0].substr(
                0,
                remainder
            );

        const thousands =
            split[0]
                .substr(remainder)
                .match(/\d{3}/g);

        if (thousands) {

            const separator =
                remainder
                    ? "."
                    : "";

            rupiah +=
                separator +
                thousands.join(".");
        }

        e.target.value =
            "Rp " + rupiah;
    }
);

function formatCurrency(number) {
    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    ).format(number);
}

function calculateBudget() {

    const salary =
    Number(
        document
            .getElementById("salary")
            .value
            .replace(/[^0-9]/g, "")
    );

    if (!salary) {
        return;
    }

    const kebutuhan =
        salary * 0.475;

    const keinginan =
        salary * 0.30;

    const masaDepan =
        salary * 0.20;

    const sedekah =
        salary * 0.025;

    const target =
        salary * 6;   

    document.getElementById(
        "budgetResult"
    ).innerHTML = `
        <p>🏠 Kebutuhan Pokok : ${formatCurrency(kebutuhan)}</p>
        <p>🎉 Keinginan : ${formatCurrency(keinginan)}</p>
        <p>📈 Masa Depan & Utang : ${formatCurrency(masaDepan)}</p>
        <p>❤️ Sedekah : ${formatCurrency(sedekah)}</p>
         <ul class="budget-list">
                        <li>Kebutuhan Pokok (47,5%): Biaya sewa/KPR, cicilan kendaraan, bahan makanan (belanja mingguan), tagihan listrik, air, gas, internet, dan transportasi kerja</li>
                        <li>Keinginan (30%): Biaya nongkrong, streaming film, langganan gim, liburan, belanja baju, dan hobi</li>
            <li>Masa Depan & Utang (20%): Tabungan darurat, investasi (reksa dana, saham), asuransi, dan cicilan utang konsumtif (seperti kartu kredit)</li>
             <li>Sedekah atau berbagi (2,5%): biaya untuk sedekah atau berbagi kepada orang yang membutuhkan</li>
         </ul>

         <p> ======================================= </p>
         <p>💰 Total Dana Darurat yang Disarankan : ${formatCurrency(target)}</p>
         <p>💡 Catatan: Dana darurat disarankan setara dengan 6 bulan pengeluaran bulanan.</p>
    `;
}

