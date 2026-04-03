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
// Ajoute #backToTop à la liste ici :
const clickables = document.querySelectorAll('a, button, .dropbtn, .bubble-btn, .btn-cv-glassy, .sticker, .skill-card, #backToTop');        
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

const backToTop = document.getElementById("backToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
};

backToTop.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Remontée fluide, pas de saut brusque
    });
};


document.addEventListener('DOMContentLoaded', () => {
    const logoOriginal = document.getElementById('logo-retour');

    if (logoOriginal) {
        logoOriginal.addEventListener('click', function(e) {
            e.preventDefault();
            const destination = this.getAttribute('href');

            // 1. On crée l'écran blanc UNIQUEMENT au clic
            const voyageScreen = document.createElement('div');
            voyageScreen.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: white;
                z-index: 9998;
                opacity: 0;
                transition: opacity 0.4s ease-out;
            `;
            document.body.appendChild(voyageScreen);

            // 2. On clone le logo pour le voyage
            const rect = this.getBoundingClientRect();
            const voyageur = document.createElement('img');
            voyageur.src = this.querySelector('img').src;
            voyageur.style.cssText = `
                position: fixed;
                z-index: 9999;
                top: ${rect.top}px;
                left: ${rect.left}px;
                width: ${rect.width}px;
                height: ${rect.height}px;
                transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            document.body.appendChild(voyageur);

            // On cache le logo fixe du header
            this.style.opacity = '0';

            // 3. Animation
            requestAnimationFrame(() => {
                voyageScreen.style.opacity = '1';
                
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const moveX = centerX - (rect.left + rect.width / 2);
                const moveY = centerY - (rect.top + rect.height / 2);

                voyageur.style.transform = `translate(${moveX}px, ${moveY}px) scale(3.5)`;
            });

            // 4. Redirection
            setTimeout(() => {
                window.location.href = destination;
            }, 1200);
        });
    }
});