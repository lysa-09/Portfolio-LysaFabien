document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. ORCHESTRATION DE L'INTRO (Page Accueil)
       ========================================= */
    const intro = document.getElementById("intro");
    const header = document.getElementById("main-header");

    if (intro && header) {
        // Bloquer le scroll pendant l'intro
        document.body.style.overflow = "hidden";

        setTimeout(() => {
            intro.classList.add("traveling"); // Le logo voyage vers le header
            
            setTimeout(() => {
                header.classList.remove("header-hidden");
                header.classList.add("header-visible");
                intro.classList.add("fade-out"); // L'écran blanc s'efface
                
                // Réactiver le scroll
                document.body.style.overflow = "auto";

                setTimeout(() => {
                    intro.style.display = "none";
                }, 800);
            }, 1200); // Durée du voyage du logo
        }, 2000); // Temps d'attente initial (nom au centre)
    } else if (header) {
        // Sur les autres pages, on affiche le header immédiatement
        header.classList.add("header-visible");
    }

    /* =========================================
       2. GESTION DU CURSEUR (MAGIQUE)
       ========================================= */
    const cursor = document.querySelector(".cursor");
    
    if (cursor) {
        // Suivi de la souris
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        // Effet au survol des éléments cliquables
        // On cible toutes les classes de boutons et liens de ton site
        const clickables = document.querySelectorAll('a, button, .dropbtn, .bubble-btn, .btn-cv-glassy, .sticker, .skill-card');
        
        clickables.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursor.classList.add("hover"); // Grossit et s'inverse via CSS
            });
            el.addEventListener("mouseleave", () => {
                cursor.classList.remove("hover");
            });
        });
    }

    /* =========================================
       3. ANIMATION AU SCROLL (REVEAL)
       ========================================= */
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Lancement immédiat pour les éléments déjà visibles

    /* =========================================
       4. SYSTÈME DE COPIE ET CONFETTIS (Contact)
       ========================================= */
    function createConfetti(x, y) {
        const colors = ['#FF9E87', '#FFD1C7', '#ffffff']; // Palette rose/blanc
        for (let i = 0; i < 15; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            document.body.appendChild(confetti);

            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const destX = (Math.random() - 0.5) * 300;
            const destY = (Math.random() - 0.5) * 300;

            confetti.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.1, 0.5, 0.5, 1)'
            }).onfinish = () => confetti.remove();
        }
    }

    // Gestion des clics sur les boutons de contact
    document.querySelectorAll('.bubble-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Effet visuel immédiat
            createConfetti(e.clientX, e.clientY);

            // Système de copie si bouton "copy"
            if (btn.classList.contains('copy-btn')) {
                const textToCopy = btn.getAttribute('data-copy');
                
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const originalText = btn.innerHTML;
                        btn.innerHTML = "Copié ! ✨";
                        btn.style.backgroundColor = "#88D49E"; // Vert de succès
                        btn.style.color = "white";

                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.backgroundColor = "";
                            btn.style.color = "";
                        }, 2000);
                    });
                }
            }
        });
    });
});