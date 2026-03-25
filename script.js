document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileLanguageSelect = document.getElementById('mobile-language-select');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking close button
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close menu when clicking on links
        const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('active') &&
                !mobileNav.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Sync mobile language selector with desktop one
        if (mobileLanguageSelect) {
            mobileLanguageSelect.addEventListener('change', (e) => {
                const desktopSelect = document.getElementById('language-select');
                if (desktopSelect) {
                    desktopSelect.value = e.target.value;
                    desktopSelect.dispatchEvent(new Event('change'));
                }
            });
        }

        // Sync desktop language selector with mobile one
        const desktopLanguageSelect = document.getElementById('language-select');
        if (desktopLanguageSelect && mobileLanguageSelect) {
            desktopLanguageSelect.addEventListener('change', (e) => {
                mobileLanguageSelect.value = e.target.value;
            });
        }
    }

    // --- i18n System ---
    let currentLanguage = localStorage.getItem('language') || 'es';

    // Simple translation object (embedded for reliability)
    const translations = {
        es: {
            nav: {
                inicio: 'Inicio',
                nosotros: 'Nosotros',
                catalogo: 'Catálogo',
                planes: 'Planes',
                contacto: 'Contacto',
                explorar: 'Explorar'
            },
            hero: {
                badge: 'Especies Únicas • Safari Premium',
                title: 'Encuentra lo <span class="text-gradient">Inimaginable</span>',
                subtitle: 'Conéctate con la naturaleza más rara del planeta. Más de 20 especies exóticas bajo el cuidado más profesional y ético del mercado.',
                coleccion: 'Ver Colección',
                historia: 'Nuestra Historia'
            },
            about: {
                tagline: ' ACERCA DE NOSOTROS  ',
                title: 'Nuestra Esencia <span class="highlight">Salvaje</span>',
                what: '¿Quienes Somos?',
                what_desc: 'Somos el primer santuario boutique de mascotas exóticas en la región, uniendo el lujo con la conservación responsable.',
                what_do: '¿Qué Hacemos?',
                what_do_desc: 'Facilitamos el acceso a especies fascinantes siguiendo protocolos internacionales de bienestar animal y legalidad.',
                why: '¿Por Qué?',
                why_desc: 'Porque creemos que la convivencia con especies únicas transforma la perspectiva humana sobre la biodiversidad.',
                especies: 'Especies',
                legales: 'Legales',
                soporte: 'Soporte Veteriario'
            },
            catalog: {
                tagline: 'Catálogo Premium',
                title: 'Conoce a tus Próximos <span class="highlight">Compañeros</span>',
                todos: 'Todos',
                mamiferos: 'Mamíferos',
                reptiles: 'Reptiles',
                aracnidos: 'Arácnidos/Insectos',
                anfibios: 'Anfibios/Aves',
                ver_mas: 'Ver más animales'
            },
            banner: {
                title: '¿Buscas Asesoría Especializada?',
                subtitle: 'Nuestros expertos en exóticos están listos para ayudarte a elegir.',
                contactar: 'Contactar Experto'
            },
            pricing: {
                tagline: 'Servicios Exclusivos',
                title: 'Planes y <span class="highlight">Tarifas</span> de Cuidado',
                subtitle: 'Nuestra compromiso no termina en la entrega. Te acompañamos en cada paso.',
                basico: 'Básico Safari',
                elite: 'Elite Explorer',
                pro: 'Preserve Pro',
                popular: 'Más Popular',
                elegir: 'Elegir Plan',
                suscribir: 'Suscribirme',
                features: {
                    chequeo: 'Chequeo mensual online',
                    guia: 'Guía Nutricional',
                    soporte_chat: 'Soporte por Chat',
                    visita: 'Visita Domiciliaria',
                    visita_veterinario: '2 Visitas al veterinario',
                    kit: 'Kit de Alimentación Premium',
                    soporte_247: 'Soporte 24/7 Prioritario',
                    seguro: 'Seguro de Salud Básico',
                    cuidado: 'Cuidado Integral 360°',
                    habitat: 'Hábitat Automatizado',
                    entrenador: 'Entrenador Profesional',
                    cobertura: 'Cobertura Médica Total'
                }
            },
            search: {
                placeholder: 'Buscar animales...',
                no_results: 'No se encontraron animales que coincidan con tu búsqueda.'
            },
            cart: {
                title: 'Tu Expedición',
                total: 'Total:',
                checkout: 'Completar Selección',
                empty: 'Tu expedición está vacía. Selecciona un compañero primero.',
                add: 'Añadir a Expedición'
            },
            modal: {
                alimentacion: 'Alimentación',
                habitat_ideal: 'Hábitat Ideal',
                checkout_title: '¡Va en camino!',
                checkout_message: 'Recordatorio: Estas vidas no son juguetes. Por favor, asume el compromiso ético de brindarles amor, respeto y un cuidado sumamente responsable en su nuevo hábitat acorde a su especie.',
                checkout_button: 'Entendido y Acepto'
            },
            contact: {
                title: 'Hablemos de tu <span class="highlight">Futuro Exótico</span>',
                subtitle: 'Déjanos tus datos o visítanos en nuestro santuario principal.',
                nombre: 'Nombre Completo',
                email: 'Correo Electrónico',
                email_placeholder: 'email@ejemplo.com',
                nombre_placeholder: 'Ej. Alexander Safari',
                mascota: 'Mascota de Interés',
                mascota_placeholder: 'Selecciona una opción',
                mensaje: 'Mensaje',
                mensaje_placeholder: '¿Cómo podemos ayudarte?',
                enviar: 'Enviar Solicitud',
                ubicacion: 'Ubicación',
                telefono: 'Teléfono'
            },
            footer: {
                description: 'Pasión por la biodiversidad. Cuidado ético y responsable de especies exóticas de todo el mundo.',
                navegacion: 'Navegación',
                legal: 'Legal',
                newsletter: 'Newsletter',
                newsletter_desc: 'Suscríbete para recibir noticias sobre nuevas llegadas.',
                email_placeholder: 'Tu email',
                derechos: '© 2026 Tu Mundo con lo Exótico. Todos los derechos reservados a Yai.'
            }
        },
        en: {
            nav: {
                inicio: 'Home',
                nosotros: 'About',
                catalogo: 'Catalog',
                planes: 'Plans',
                contacto: 'Contact',
                explorar: 'Explore'
            },
            hero: {
                badge: 'Unique Species • Premium Safari',
                title: 'Find the <span class="text-gradient">Unimaginable</span>',
                subtitle: 'Connect with the rarest nature on the planet. More than 20 exotic species under the most professional and ethical care in the market.',
                coleccion: 'View Collection',
                historia: 'Our Story'
            },
            about: {
                tagline: 'About us',
                title: 'Our Wild <span class="highlight">Essence</span>',
                what: 'Who We Are',
                what_desc: 'We are the first boutique exotic pet sanctuary in the region, uniting luxury with responsible conservation.',
                what_do: 'What Do We Do?',
                what_do_desc: 'We facilitate access to fascinating species following international protocols for animal welfare and legality.',
                why: 'Why?',
                why_desc: 'Because we believe that coexistence with unique species transforms the human perspective on biodiversity.',
                especies: 'Species',
                legales: 'Legal',
                soporte: 'Veterinary Support'
            },
            catalog: {
                tagline: 'Premium Catalog',
                title: 'Meet Your Next <span class="highlight">Companions</span>',
                todos: 'All',
                mamiferos: 'Mammals',
                reptiles: 'Reptiles',
                aracnidos: 'Arachnids/Insects',
                anfibios: 'Amphibians/Birds',
                ver_mas: 'View more animals'
            },
            banner: {
                title: 'Looking for Specialized Advice?',
                subtitle: 'Our exotic experts are ready to help you choose.',
                contactar: 'Contact Expert'
            },
            pricing: {
                tagline: 'Exclusive Services',
                title: 'Care Plans and <span class="highlight">Rates</span>',
                subtitle: 'Our commitment doesn\'t end with delivery. We accompany you every step of the way.',
                basico: 'Basic Safari',
                elite: 'Elite Explorer',
                pro: 'Preserve Pro',
                popular: 'Most Popular',
                elegir: 'Choose Plan',
                suscribir: 'Subscribe',
                features: {
                    chequeo: 'Monthly online check-up',
                    guia: 'Nutritional Guide',
                    soporte_chat: 'Chat Support',
                    visita: 'Home Visit',
                    visita_veterinario: '2 Veterinary Visits',
                    kit: 'Premium Feeding Kit',
                    soporte_247: '24/7 Priority Support',
                    seguro: 'Basic Health Insurance',
                    cuidado: '360° Integral Care',
                    habitat: 'Automated Habitat',
                    entrenador: 'Professional Trainer',
                    cobertura: 'Total Medical Coverage'
                }
            },
            search: {
                placeholder: 'Search animals...',
                no_results: 'No animals found that match your search.'
            },
            cart: {
                title: 'Your Expedition',
                total: 'Total:',
                checkout: 'Complete Selection',
                empty: 'Your expedition is empty. Select a companion first.',
                add: 'Add to Expedition'
            },
            modal: {
                alimentacion: 'Feeding',
                habitat_ideal: 'Ideal Habitat',
                checkout_title: 'It\'s on its way!',
                checkout_message: 'Reminder: These lives are not toys. Please assume the ethical commitment to give them love, respect and extremely responsible care in their new habitat according to their species.',
                checkout_button: 'Understood and I Accept'
            },
            contact: {
                title: 'Let\'s Talk About Your <span class="highlight">Exotic Future</span>',
                subtitle: 'Leave us your details or visit us at our main sanctuary.',
                nombre: 'Full Name',
                email: 'Email',
                email_placeholder: 'email@example.com',
                nombre_placeholder: 'Ex. Alexander Safari',
                mascota: 'Pet of Interest',
                mascota_placeholder: 'Select an option',
                mensaje: 'Message',
                mensaje_placeholder: 'How can we help you?',
                enviar: 'Send Request',
                ubicacion: 'Location',
                telefono: 'Phone'
            },
            footer: {
                description: 'Passion for biodiversity. Ethical and responsible care of exotic species from around the world.',
                navegacion: 'Navigation',
                legal: 'Legal',
                newsletter: 'Newsletter',
                newsletter_desc: 'Subscribe to receive news about new arrivals.',
                email_placeholder: 'Your email',
                derechos: '© 2026 Your World with the Exotic. All rights reserved to Yai.'
            }
        }
    };

    function applyTranslations(lang) {
        const t = translations[lang];
        if (!t) return;

        // Navigation
        document.querySelector('a[href="#inicio"]') && (document.querySelector('a[href="#inicio"]').textContent = t.nav.inicio);
        document.querySelector('a[href="#nosotros"]') && (document.querySelector('a[href="#nosotros"]').textContent = t.nav.nosotros);
        document.querySelector('a[href="#catalogo"]') && (document.querySelector('a[href="#catalogo"]').textContent = t.nav.catalogo);
        document.querySelector('a[href="#planes"]') && (document.querySelector('a[href="#planes"]').textContent = t.nav.planes);
        document.querySelector('a[href="#contacto"]') && (document.querySelector('a[href="#contacto"]').textContent = t.nav.contacto);
        document.querySelector('.nav-actions .btn-primary') && (document.querySelector('.nav-actions .btn-primary').textContent = t.nav.explorar);

        // Hero Section
        const heroBadge = document.querySelector('.hero .badge');
        if (heroBadge) heroBadge.textContent = t.hero.badge;

        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            heroTitle.innerHTML = t.hero.title;
        }

        const heroSubtitle = document.querySelector('.hero p');
        if (heroSubtitle) heroSubtitle.textContent = t.hero.subtitle;

        const heroButtons = document.querySelectorAll('.hero-buttons a');
        if (heroButtons[0]) heroButtons[0].textContent = t.hero.coleccion;
        if (heroButtons[1]) heroButtons[1].textContent = t.hero.historia;

        // About Section
        const aboutTagline = document.querySelector('.about-section .section-tagline');
        if (aboutTagline) aboutTagline.textContent = t.about.tagline;

        const aboutTitle = document.querySelector('.about-text h2');
        if (aboutTitle) aboutTitle.innerHTML = t.about.title;

        const aboutBlocks = document.querySelectorAll('.about-block h3');
        if (aboutBlocks[0]) aboutBlocks[0].innerHTML = `<i class="fas fa-fingerprint"></i> ${t.about.what}`;
        if (aboutBlocks[1]) aboutBlocks[1].innerHTML = `<i class="fas fa-tools"></i> ${t.about.what_do}`;
        if (aboutBlocks[2]) aboutBlocks[2].innerHTML = `<i class="fas fa-heart"></i> ${t.about.why}`;

        const aboutDescriptions = document.querySelectorAll('.about-block p');
        if (aboutDescriptions[0]) aboutDescriptions[0].textContent = t.about.what_desc;
        if (aboutDescriptions[1]) aboutDescriptions[1].textContent = t.about.what_do_desc;
        if (aboutDescriptions[2]) aboutDescriptions[2].textContent = t.about.why_desc;

        const statLabels = document.querySelectorAll('.stat-card .label');
        if (statLabels[0]) statLabels[0].textContent = t.about.especies;
        if (statLabels[1]) statLabels[1].textContent = t.about.legales;
        if (statLabels[2]) statLabels[2].textContent = t.about.soporte;

        // Catalog Section
        const catalogTagline = document.querySelector('.catalog-section .section-tagline');
        if (catalogTagline) catalogTagline.textContent = t.catalog.tagline;

        const catalogTitle = document.querySelector('.catalog-section h2');
        if (catalogTitle) catalogTitle.innerHTML = t.catalog.title;

        // Search placeholder
        const searchInput = document.getElementById('animal-search');
        if (searchInput) searchInput.placeholder = t.search.placeholder;

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns[0]) filterBtns[0].textContent = t.catalog.todos;
        if (filterBtns[1]) filterBtns[1].textContent = t.catalog.mamiferos;
        if (filterBtns[2]) filterBtns[2].textContent = t.catalog.reptiles;
        if (filterBtns[3]) filterBtns[3].textContent = t.catalog.aracnidos;
        if (filterBtns[4]) filterBtns[4].textContent = t.catalog.anfibios;

        // Banner
        const bannerTitle = document.querySelector('.banner-safari h2');
        if (bannerTitle) bannerTitle.textContent = t.banner.title;

        const bannerSubtitle = document.querySelector('.banner-safari p');
        if (bannerSubtitle) bannerSubtitle.textContent = t.banner.subtitle;

        const bannerBtn = document.querySelector('.banner-safari button');
        if (bannerBtn) bannerBtn.textContent = t.banner.contactar;

        // Pricing Section
        const pricingTagline = document.querySelector('.pricing-section .section-tagline');
        if (pricingTagline) pricingTagline.textContent = t.pricing.tagline;

        const pricingTitle = document.querySelector('.pricing-section h2');
        if (pricingTitle) pricingTitle.innerHTML = t.pricing.title;

        const pricingSubtitle = document.querySelector('.pricing-section p');
        if (pricingSubtitle) pricingSubtitle.textContent = t.pricing.subtitle;

        const planTitles = document.querySelectorAll('.price-card h3');
        if (planTitles[0]) planTitles[0].textContent = t.pricing.basico;
        if (planTitles[1]) planTitles[1].textContent = t.pricing.elite;
        if (planTitles[2]) planTitles[2].textContent = t.pricing.pro;

        const featuredBadge = document.querySelector('.featured-badge');
        if (featuredBadge) featuredBadge.textContent = t.pricing.popular;

        const planButtons = document.querySelectorAll('.price-card button');
        if (planButtons[0]) planButtons[0].textContent = t.pricing.elegir;
        if (planButtons[1]) planButtons[1].textContent = t.pricing.suscribir;
        if (planButtons[2]) planButtons[2].textContent = t.pricing.elegir;

        // Cart
        const cartTitle = document.querySelector('.cart-header h3');
        if (cartTitle) cartTitle.innerHTML = `<i class="fas fa-truck-pickup"></i> ${t.cart.title}`;

        const cartTotal = document.querySelector('.total-row span:first-child');
        if (cartTotal) cartTotal.textContent = t.cart.total;

        const checkoutBtn = document.querySelector('.btn-checkout');
        if (checkoutBtn) checkoutBtn.textContent = t.cart.checkout;

        // Modal
        const modalFeeding = document.querySelector('#modal-feeding');
        if (modalFeeding) modalFeeding.parentElement.previousElementSibling.textContent = t.modal.alimentacion;

        const modalHabitat = document.querySelector('#modal-habitat');
        if (modalHabitat) modalHabitat.parentElement.previousElementSibling.textContent = t.modal.habitat_ideal;

        const modalAddBtn = document.querySelector('#modal-add-btn');
        if (modalAddBtn) modalAddBtn.textContent = t.cart.add;

        const checkoutModalTitle = document.querySelector('#checkout-modal h2');
        if (checkoutModalTitle) checkoutModalTitle.textContent = t.modal.checkout_title;

        const checkoutModalMessage = document.querySelector('#checkout-modal p');
        if (checkoutModalMessage) checkoutModalMessage.innerHTML = t.modal.checkout_message;

        const checkoutModalBtn = document.querySelector('#checkout-modal button:not(.close-modal)');
        if (checkoutModalBtn) checkoutModalBtn.textContent = t.modal.checkout_button;

        // Contact Section
        const contactTitle = document.querySelector('.contact-section h2');
        if (contactTitle) contactTitle.innerHTML = t.contact.title;

        const contactSubtitle = document.querySelector('.contact-section p');
        if (contactSubtitle) contactSubtitle.textContent = t.contact.subtitle;

        const contactLabels = document.querySelectorAll('.contact-form-container label');
        if (contactLabels[0]) contactLabels[0].textContent = t.contact.nombre;
        if (contactLabels[1]) contactLabels[1].textContent = t.contact.email;
        if (contactLabels[2]) contactLabels[2].textContent = t.contact.mascota;
        if (contactLabels[3]) contactLabels[3].textContent = t.contact.mensaje;

        const contactInputs = document.querySelectorAll('.contact-form-container input, .contact-form-container textarea');
        if (contactInputs[1]) contactInputs[1].placeholder = t.contact.nombre_placeholder;
        if (contactInputs[2]) contactInputs[2].placeholder = t.contact.email_placeholder;
        if (contactInputs[4]) contactInputs[4].placeholder = t.contact.mensaje_placeholder;

        const contactInfoLabels = document.querySelectorAll('.info-item strong');
        if (contactInfoLabels[0]) contactInfoLabels[0].textContent = t.contact.ubicacion;
        if (contactInfoLabels[1]) contactInfoLabels[1].textContent = t.contact.email;
        if (contactInfoLabels[2]) contactInfoLabels[2].textContent = t.contact.telefono;

        const contactSubmitBtn = document.querySelector('.btn-submit');
        if (contactSubmitBtn) contactSubmitBtn.innerHTML = `${t.contact.enviar} <i class="fas fa-paper-plane"></i>`;

        // Footer
        const footerDescription = document.querySelector('.footer-details p');
        if (footerDescription) footerDescription.textContent = t.footer.description;

        const footerTitles = document.querySelectorAll('.footer-links h4, .footer-legal h4, .footer-newsletter h4');
        if (footerTitles[0]) footerTitles[0].textContent = t.footer.navegacion;
        if (footerTitles[1]) footerTitles[1].textContent = t.footer.legal;
        if (footerTitles[2]) footerTitles[2].textContent = t.footer.newsletter;

        const footerNewsletterDesc = document.querySelector('.footer-newsletter p');
        if (footerNewsletterDesc) footerNewsletterDesc.textContent = t.footer.newsletter_desc;

        const footerEmailInput = document.querySelector('.newsletter-input input');
        if (footerEmailInput) footerEmailInput.placeholder = t.footer.email_placeholder;

        const footerBottom = document.querySelector('.footer-bottom p');
        if (footerBottom) footerBottom.textContent = t.footer.derechos;

        // Update document language
        document.documentElement.lang = lang;

        // Re-render animals to update search results text
        if (currentSearchTerm || currentFilter !== 'all') {
            searchAnimals(currentSearchTerm, currentFilter);
        }
    }

    // Language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', (e) => {
            currentLanguage = e.target.value;
            localStorage.setItem('language', currentLanguage);
            applyTranslations(currentLanguage);
            // Re-render animals with new language
            renderAnimals(currentFilter);
        });
    }

    // --- Animal Data (Enhanced with Feeding and Habitat) ---
    const animalsData = {
        es: [
            // Reptiles
            {
                id: 7, name: 'Camaleón Pantera', category: 'reptil', origin: 'Madagascar',
                desc: 'Un espectro vivo de colores que cambian según su entorno y emoción. Maestro del camuflaje.',
                feeding: 'Insectos vivos, principalmente grillos, langostas y gusanos de seda.',
                habitat: 'Terrario vertical con abundante vegetación, alta humedad (70%) y ramas para trepar.',
                img: 'camaleon.png', price: 450
            },
            {
                id: 9, name: 'Dragón Barbudo', category: 'reptil', origin: 'Australia',
                desc: 'Dócil, majestuoso y con una personalidad sorprendente para un reptil de compañía.',
                feeding: 'Dieta omnívora: Vegetales de hoja verde, frutas y variedad de insectos.',
                habitat: 'Terrario desértico amplio con luz UVB, zona de calor a 35-40°C y rocas.',
                img: 'dragon.png', price: 180
            },
            {
                id: 14, name: 'Pitón Bola Morph', category: 'reptil', origin: 'África',
                desc: 'Patrones genéticos hipnóticos y brillo nacarado. Una joya de colección dócil.',
                feeding: 'Roedores de tamaño adecuado (ratones o ratas) cada 7-10 días.',
                habitat: 'Terrario horizontal con refugios oscuros y una zona templada a 30-32°C.',
                img: 'piton.png', price: 320
            },
            {
                id: 16, name: 'Gecko de Cresta', category: 'reptil', origin: 'Caledonia',
                desc: 'Piel aterciopelada y ojos galácticos. Un dragón miniatura que no requiere insectos.',
                feeding: 'Preparados comerciales de fruta y ocasionalmente pequeños insectos.',
                habitat: 'Terrario vertical con plantas, humedad moderada y temperaturas de 22-26°C.',
                img: 'gecko.png', price: 150
            },
            {
                id: 17, name: 'Iguana Verde', category: 'reptil', origin: 'Centroamérica',
                desc: 'Imponente reptil tropical de porte elegante, ideal para amantes de los grandes lagartos.',
                feeding: 'Dieta 100% herbívora: hojas verdes oscuras, flores comestibles, frutas ocasionales.',
                habitat: 'Recinto muy amplio con zonas altas para escalar, luz UVB intensa y temperatura de 30-35°C.',
                img: 'iguana.png', price: 120
            },

            // Mammals
            {
                id: 1, name: 'Lémur de Cola Anillada', category: 'mamifero', origin: 'Madagascar',
                desc: 'Curioso y carismático, el explorador más famoso de la selva.',
                feeding: 'Frutas tropicales, vegetales, hojas y ocasionalmente resina de árboles.',
                habitat: 'Grandes recintos con altura, cuerdas, troncos y acceso a luz solar directa.',
                img: 'lemur_profile_1774322019389.png', price: 3500
            },
            {
                id: 10, name: 'Zorro Fennec', category: 'mamifero', origin: 'Sahara',
                desc: 'Pequeño y carismático zorro del desierto con orejas emblemáticas.',
                feeding: 'Dieta mixta: Insectos, pequeños roedores, huevos, frutas y bayas.',
                habitat: 'Recinto arenoso con espacio para excavar, clima cálido y seco con buena ventilación.',
                img: 'Zorrofenec.png', price: 1200
            },
            {
                id: 12, name: 'Mono Capuchino', category: 'mamifero', origin: 'Sudamérica',
                desc: 'Inteligencia y carisma puro en el primate más versátil.',
                feeding: 'Frutas, nueces, semillas frescas, brotes e insectos para proteína.',
                habitat: 'Hábitat selvático simulado extremadamente espacioso con cuerdas y enriquecimiento cognitivo.',
                img: 'Mono.png', price: 4500
            },
            {
                id: 4, name: 'Hurón Sable Premium', category: 'mamifero', origin: 'Europa',
                desc: 'Energía juguetona y elegancia para el hogar moderno.',
                feeding: 'Pienso específico para hurones de alta proteína animal (carnívoro estricto).',
                habitat: 'Jaula multinivel espaciosa y tiempo diario fuera de ella en ambiente seguro.',
                img: 'sable_ferret_profile_1774322347693.png', price: 250
            },
            {
                id: 18, name: 'Canguro Rojo', category: 'mamifero', origin: 'Australia',
                desc: 'Ícono de Australia: fuerte, ágil y de mirada noble. Una experiencia única como compañero.',
                feeding: 'Hierba fresca, heno, hojas de eucalipto y verduras variadas.',
                habitat: 'Espacios exteriores amplios con suelo blando, refugio techado y zona de salto libre.',
                img: 'red_kangaroo_profile_1774322242870.png', price: 5800
            },
            {
                id: 21, name: 'Tigre Blanco', category: 'mamifero', origin: 'India',
                desc: 'Un majestuoso felino con pelaje níveo y rayas negras, símbolo de elegancia suprema.',
                feeding: 'Dieta carnívora estricta, grandes consumos diarios de carnes magras.',
                habitat: 'Santuario de cientos de hectáreas reforzado y enriquecimiento ambiental avanzado.',
                img: 'tigre albino.png', price: 45000
            },
            {
                id: 22, name: 'Gato Serval', category: 'mamifero', origin: 'África',
                desc: 'El felino con las orejas y piernas más largas. De actitud enigmática y belleza salvaje.',
                feeding: 'Aves de corral, roedores y suplementos felinos especiales.',
                habitat: 'Recintos exteriores altos a prueba de escapes con plataformas de salto y pastos.',
                img: 'serval.png', price: 8500
            },
            {
                id: 23, name: 'Pangolín Asiático', category: 'mamifero', origin: 'Asia',
                desc: 'La maravilla acorazada de la naturaleza. Tímido, dócil y de apariencia mística.',
                feeding: 'Hormigas, termitas y mezclas especiales para mamíferos terrestres especializados.',
                habitat: 'Zonas boscosas de suelo profundo para escarbar, clima templado y alta privacidad.',
                img: 'pangolin.png', price: 12000
            },
            {
                id: 24, name: 'Petauro del Azúcar', category: 'mamifero', origin: 'Australia',
                desc: 'Diminuto marsupial volador que forma vínculos inseparables con sus cuidadores.',
                feeding: 'Néctar, savia dulce, frutas maduras e insectos pequeños.',
                habitat: 'Jaulas tipo aviario muy altas con lianas y telas para balancearse y saltar.',
                img: 'petauro.png', price: 400
            },
            {
                id: 25, name: 'Kinkajú', category: 'mamifero', origin: 'América Central',
                desc: 'Conocido como el "oso de la miel", es juguetón, nocturno y sumamente cariñoso.',
                feeding: 'Higos, miel, néctar de flores y variedad de frutas tropicales.',
                habitat: 'Ambiente enriquecido tipo selva, con troncos escalables y zonas oscuras para dormir.',
                img: 'kinkaju.png', price: 2800
            },
            {
                id: 26, name: 'Manada de Suricatas', category: 'mamifero', origin: 'Kalahari',
                desc: 'Los centinelas del desierto. Se entregan en pequeña familia para no romper sus lazos.',
                feeding: 'Insectos, raíces, escorpiones y pequeños réptiles o crías de ratón.',
                habitat: 'Recinto cerrado y cálido con tierra firme que soporte sus túneles de resguardo.',
                img: 'suricatas.png', price: 1600
            },
            {
                id: 27, name: 'Erizo Africano', category: 'mamifero', origin: 'África Central',
                desc: 'Pequeños compañeros nocturnos, de púas adorables y hocico curioso.',
                feeding: 'Croquetas de gato de alta calidad, insectos vivos (gusanos) ocasionales.',
                habitat: 'Terrario cerrado liso a 25°C constante con rueda ejercitadora segura.',
                img: 'erizo.png', price: 150
            },
            {
                id: 28, name: 'Cría de Jirafa Reticulada', category: 'mamifero', origin: 'Sabana Africana',
                desc: 'El gigante más gentil. Sus patrones geométricos son huellas digitales únicas.',
                feeding: 'Follaje de acacia en altura, heno de base y suplementos ramoneadores.',
                habitat: 'Instalaciones tipo rancho extensivo de clima cálido y bebederos a nivel.',
                img: 'jirafa.png', price: 65000
            },
            {
                id: 29, name: 'Caballo De la Perra de Arqui', category: 'mamifero', origin: 'España',
                desc: 'Un purasangre de crin majestuosa, inteligencia brillante e imponente porte real.',
                feeding: 'Pasto de alta energía, avena, heno selecto y forraje.',
                habitat: 'Caballerizas Premium con acceso inmediato a campos de trote abiertos.',
                img: 'caballo.png', price: 30000
            },

            // Arachnids
            {
                id: 20, name: 'Tarántula Azul Australiana', category: 'aracnido', origin: 'Australia',
                desc: 'Joya de iridiscencia azul eléctrica. La más espectacular y codiciada por coleccionistas.',
                feeding: 'Insectos vivos: grillos, cucarachas Dubia y gusanos de harina cada 1-2 semanas.',
                habitat: 'Terrario de sustrato profundo para excavar, poca ventilación y oscuridad parcial.',
                img: 'tarantula_blue_australia_1774322226876.png', price: 380
            },

            // Amphibians
            {
                id: 5, name: 'Axolote Mexicano', category: 'anfibio', origin: 'México',
                desc: 'Maravilla biológica regenerativa con una sonrisa eterna.',
                feeding: 'Lombrices de tierra, tubifex, artemia y pellets específicos para axolotes.',
                habitat: 'Acuario de agua fría (16-20°C) sin corriente fuerte, fondo de arena fina.',
                img: 'BebeAxolote.png', price: 85
            }
        ],
        en: [
            // Reptiles
            {
                id: 7, name: 'Panther Chameleon', category: 'reptil', origin: 'Madagascar',
                desc: 'A living spectrum of colors that change with environment and emotion. Master of camouflage.',
                feeding: 'Live insects, mainly crickets, locusts and silkworms.',
                habitat: 'Vertical terrarium with abundant vegetation, high humidity (70%) and climbing branches.',
                img: 'camaleon.png', price: 450
            },
            {
                id: 9, name: 'Bearded Dragon', category: 'reptil', origin: 'Australia',
                desc: 'Docile, majestic and with a surprising personality for a companion reptile.',
                feeding: 'Omnivorous diet: Green leaf vegetables, fruits and variety of insects.',
                habitat: 'Spacious desert terrarium with UVB light, heat zone at 35-40°C and rocks.',
                img: 'dragon.png', price: 180
            },
            {
                id: 14, name: 'Ball Python Morph', category: 'reptil', origin: 'Africa',
                desc: 'Hypnotic genetic patterns and nacreous shine. A docile collection jewel.',
                feeding: 'Appropriately sized rodents (mice or rats) every 7-10 days.',
                habitat: 'Horizontal terrarium with dark shelters and a temperate zone at 30-32°C.',
                img: 'piton.png', price: 320
            },
            {
                id: 16, name: 'Crested Gecko', category: 'reptil', origin: 'New Caledonia',
                desc: 'Velvety skin and galactic eyes. A miniature dragon that doesn\'t require insects.',
                feeding: 'Commercial fruit preparations and occasionally small insects.',
                habitat: 'Vertical terrarium with plants, moderate humidity and temperatures of 22-26°C.',
                img: 'gecko.png', price: 150
            },
            {
                id: 17, name: 'Green Iguana', category: 'reptil', origin: 'Central America',
                desc: 'Impressive tropical reptile of elegant bearing, ideal for lovers of large lizards.',
                feeding: '100% herbivorous diet: dark green leaves, edible flowers, occasional fruits.',
                habitat: 'Very large enclosure with high areas for climbing, intense UVB light and temperature of 30-35°C.',
                img: 'iguana.png', price: 120
            },

            // Mammals
            {
                id: 1, name: 'Ring-tailed Lemur', category: 'mamifero', origin: 'Madagascar',
                desc: 'Curious and charismatic, the most famous explorer of the jungle.',
                feeding: 'Tropical fruits, vegetables, leaves and occasionally tree resin.',
                habitat: 'Large enclosures with height, ropes, trunks and direct sunlight access.',
                img: 'lemur_profile_1774322019389.png', price: 3500
            },
            {
                id: 10, name: 'Fennec Fox', category: 'mamifero', origin: 'Sahara',
                desc: 'Small and charismatic desert fox with emblematic ears.',
                feeding: 'Mixed diet: Insects, small rodents, eggs, fruits and berries.',
                habitat: 'Sandy enclosure with space to dig, warm and dry climate with good ventilation.',
                img: 'Zorrofenec.png', price: 1200
            },
            {
                id: 12, name: 'Capuchin Monkey', category: 'mamifero', origin: 'South America',
                desc: 'Pure intelligence and charisma in the most versatile primate.',
                feeding: 'Fresh fruits, nuts, seeds, sprouts and insects for protein.',
                habitat: 'Extremely spacious simulated jungle habitat with ropes and cognitive enrichment.',
                img: 'Mono.png', price: 4500
            },
            {
                id: 4, name: 'Premium Sable Ferret', category: 'mamifero', origin: 'Europe',
                desc: 'Playful energy and elegance for the modern home.',
                feeding: 'Specific high-protein animal ferret food (strict carnivore).',
                habitat: 'Spacious multi-level cage and daily time outside it in safe environment.',
                img: 'sable_ferret_profile_1774322347693.png', price: 250
            },
            {
                id: 18, name: 'Red Kangaroo', category: 'mamifero', origin: 'Australia',
                desc: 'Australian icon: strong, agile and with noble gaze. A unique experience as a companion.',
                feeding: 'Fresh grass, hay, eucalyptus leaves and varied vegetables.',
                habitat: 'Spacious outdoor areas with soft ground, covered shelter and free jumping zone.',
                img: 'red_kangaroo_profile_1774322242870.png', price: 5800
            },
            {
                id: 21, name: 'White Tiger', category: 'mamifero', origin: 'India',
                desc: 'A majestic feline with snow-white fur and black stripes, symbol of supreme elegance.',
                feeding: 'Strict carnivorous diet, large daily consumptions of lean meats.',
                habitat: 'Reinforced sanctuary of hundreds of hectares with advanced environmental enrichment.',
                img: 'tigre albino.png', price: 45000
            },
            {
                id: 22, name: 'Serval Cat', category: 'mamifero', origin: 'Africa',
                desc: 'The feline with the longest ears and legs. Enigmatic attitude and wild beauty.',
                feeding: 'Poultry, rodents and special feline supplements.',
                habitat: 'Escape-proof high outdoor enclosures with jumping platforms and grass.',
                img: 'serval.png', price: 8500
            },
            {
                id: 23, name: 'Asian Pangolin', category: 'mamifero', origin: 'Asia',
                desc: 'Nature\'s armored wonder. Shy, docile and with mystical appearance.',
                feeding: 'Ants, termites and special mixtures for specialized terrestrial mammals.',
                habitat: 'Forested areas with deep soil for digging, temperate climate and high privacy.',
                img: 'pangolin.png', price: 12000
            },
            {
                id: 24, name: 'Sugar Glider', category: 'mamifero', origin: 'Australia',
                desc: 'Diminutive flying marsupial that forms inseparable bonds with its caregivers.',
                feeding: 'Nectar, sweet sap, ripe fruits and small insects.',
                habitat: 'Very high aviary-type cages with vines and fabrics for swinging and jumping.',
                img: 'petauro.png', price: 400
            },
            {
                id: 25, name: 'Kinkajou', category: 'mamifero', origin: 'Central America',
                desc: 'Known as the "honey bear", it\'s playful, nocturnal and extremely affectionate.',
                feeding: 'Figs, honey, flower nectar and variety of tropical fruits.',
                habitat: 'Enriched jungle-like environment, with climbable trunks and dark areas for sleeping.',
                img: 'kinkaju.png', price: 2800
            },
            {
                id: 26, name: 'Meerkat Family', category: 'mamifero', origin: 'Kalahari',
                desc: 'Desert sentinels. Delivered in small family to not break their bonds.',
                feeding: 'Insects, roots, scorpions and small reptiles or mouse pups.',
                habitat: 'Closed and warm enclosure with firm ground that supports their shelter tunnels.',
                img: 'suricatas.png', price: 1600
            },
            {
                id: 27, name: 'African Hedgehog', category: 'mamifero', origin: 'Central Africa',
                desc: 'Small nocturnal companions, with adorable spines and curious snout.',
                feeding: 'High-quality cat food, occasional live insects (worms).',
                habitat: 'Smooth closed terrarium at constant 25°C with safe exercise wheel.',
                img: 'erizo.png', price: 150
            },
            {
                id: 28, name: 'Reticulated Giraffe Calf', category: 'mamifero', origin: 'African Savanna',
                desc: 'The gentlest giant. Their geometric patterns are unique digital fingerprints.',
                feeding: 'Acacia foliage at height, base hay and browser supplements.',
                habitat: 'Extensive ranch-style facilities with warm climate and level drinkers.',
                img: 'jirafa.png', price: 65000
            },
            {
                id: 29, name: 'Arqui\'s Bitch Horse', category: 'mamifero', origin: 'Spain',
                desc: 'A thoroughbred with majestic mane, brilliant intelligence and imposing royal bearing.',
                feeding: 'High-energy grass, oats, select hay and forage.',
                habitat: 'Premium stables with immediate access to open trotting fields.',
                img: 'caballo.png', price: 30000
            },

            // Arachnids
            {
                id: 20, name: 'Australian Blue Tarantula', category: 'aracnido', origin: 'Australia',
                desc: 'Electric blue iridescence jewel. The most spectacular and coveted by collectors.',
                feeding: 'Live insects: crickets, Dubia cockroaches and mealworms every 1-2 weeks.',
                habitat: 'Deep substrate terrarium for digging, poor ventilation and partial darkness.',
                img: 'tarantula_blue_australia_1774322226876.png', price: 380
            },

            // Amphibians
            {
                id: 5, name: 'Mexican Axolotl', category: 'anfibio', origin: 'Mexico',
                desc: 'Regenerative biological wonder with an eternal smile.',
                feeding: 'Earthworms, tubifex, artemia and specific pellets for axolotls.',
                habitat: 'Cold water aquarium (16-20°C) without strong current, fine sand bottom.',
                img: 'BebeAxolote.png', price: 85
            }
        ]
    };

    // Get animals based on current language
    function getAnimals() {
        return animalsData[currentLanguage] || animalsData.es;
    }

    let cart = [];
    const animalsGrid = document.getElementById('animals-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');

    // Search elements
    const searchInput = document.getElementById('animal-search');
    const clearSearchBtn = document.getElementById('clear-search');
    let currentFilter = 'all';
    let currentSearchTerm = '';

    // --- Search Functions ---
    function searchAnimals(searchTerm, filter = 'all') {
        currentSearchTerm = searchTerm.toLowerCase().trim();
        currentFilter = filter;

        const animals = getAnimals();
        let filteredAnimals = animals;

        // Apply category filter
        if (filter !== 'all') {
            filteredAnimals = filteredAnimals.filter(a => a.category === filter);
        }

        // Apply search filter
        if (currentSearchTerm) {
            filteredAnimals = filteredAnimals.filter(animal => {
                return animal.name.toLowerCase().includes(currentSearchTerm) ||
                    animal.category.toLowerCase().includes(currentSearchTerm) ||
                    animal.origin.toLowerCase().includes(currentSearchTerm) ||
                    animal.desc.toLowerCase().includes(currentSearchTerm);
            });
        }

        renderFilteredAnimals(filteredAnimals);

        // Show/hide clear button
        if (searchTerm) {
            clearSearchBtn.style.display = 'flex';
        } else {
            clearSearchBtn.style.display = 'none';
        }
    }

    // --- Mobile Featured Animals ---
    function isMobile() {
        return window.innerWidth <= 768;
    }

    function getFeaturedAnimals() {
        const animals = getAnimals();
        // Featured animals: most popular/expensive ones
        const featuredIds = [21, 28, 22, 12]; // Tigre Blanco, Jirafa, Gato Serval, Mono Capuchino
        return animals.filter(animal => featuredIds.includes(animal.id));
    }

    function renderFilteredAnimals(filteredAnimals) {
        animalsGrid.innerHTML = '';

        // On mobile, show only featured animals unless searching or filtering or user already clicked "Ver más"
        let animalsToShow = filteredAnimals;
        let showMoreButton = false;

        if (isMobile() && !currentSearchTerm && currentFilter === 'all' && !window.showingAllAnimals) {
            animalsToShow = getFeaturedAnimals();
            if (filteredAnimals.length > 4) {
                showMoreButton = true;
            }
        }

        if (animalsToShow.length === 0) {
            const t = translations[currentLanguage] || {};
            animalsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>${t.search?.no_results || 'No se encontraron animales que coincidan con tu búsqueda.'}</p>
                </div>
            `;
            return;
        }

        animalsToShow.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'animal-card';

            card.innerHTML = `
                <div class="animal-img" onclick="openAnimalModal(${animal.id})">
                    <img src="${animal.img}" alt="${animal.name}" loading="lazy" 
                         onerror="this.src='https://loremflickr.com/600/400/reptile?v=${animal.id}'">
                    <span class="category-badge">${animal.category.toUpperCase()}</span>
                </div>
                <div class="animal-info">
                    <h4>${animal.name}</h4>
                    <p>${animal.desc}</p>
                    <div class="card-footer">
                        <span class="origin"><i class="fas fa-location-dot"></i> ${animal.origin}</span>
                        <div class="cart-price-container">
                            <span class="card-price">$${animal.price.toLocaleString()}</span>
                            <button class="btn-add-cart" onclick="addToCart(${animal.id})"><i class="fas fa-cart-shopping"></i></button>
                        </div>
                    </div>
                </div>
            `;
            animalsGrid.appendChild(card);
        });

        // Add "Ver más" button for mobile only if not showing all animals
        if (showMoreButton && filteredAnimals.length > 4 && !window.showingAllAnimals) {
            const moreButton = document.createElement('div');
            moreButton.className = 'more-animals-container';
            const t = translations[currentLanguage] || {};
            moreButton.innerHTML = `
                <button class="btn-more-animals" onclick="showAllAnimals()">
                    <i class="fas fa-chevron-down"></i>
                    ${t.catalog?.ver_mas || 'Ver más animales'}
                    <i class="fas fa-chevron-down"></i>
                </button>
            `;
            animalsGrid.appendChild(moreButton);
        }
    }

    window.showAllAnimals = () => {
        const animals = getAnimals();
        renderFilteredAnimals(animals);

        // Remove the "Ver más" button functionality by setting a flag
        window.showingAllAnimals = true;

        // Smooth scroll to animals grid instead of top of section
        const animalsGrid = document.getElementById('animals-grid');
        if (animalsGrid) {
            animalsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // --- Detail Modal Elements ---
    const animalModal = document.getElementById('animal-modal');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalCat = document.getElementById('modal-category');
    const modalDesc = document.getElementById('modal-desc');
    const modalFeeding = document.getElementById('modal-feeding');
    const modalHabitat = document.getElementById('modal-habitat');
    const modalPrice = document.getElementById('modal-price');
    const modalAddBtn = document.getElementById('modal-add-btn');

    // --- Render Animals ---
    function renderAnimals(filter = 'all') {
        searchAnimals(currentSearchTerm, filter);
    }

    // --- Detail Modal Functions ---
    window.openAnimalModal = (id) => {
        const animals = getAnimals();
        const animal = animals.find(a => a.id === id);
        if (!animal) return;

        const modal = document.getElementById('animal-modal');
        const modalImg = document.getElementById('modal-img');
        const modalName = document.getElementById('modal-name');
        const modalCat = document.getElementById('modal-category');
        const modalDesc = document.getElementById('modal-desc');
        const modalFeeding = document.getElementById('modal-feeding');
        const modalHabitat = document.getElementById('modal-habitat');
        const modalPrice = document.getElementById('modal-price');
        const modalAddBtn = document.getElementById('modal-add-btn');

        modalImg.src = animal.img;
        modalImg.onerror = () => modalImg.src = 'https://loremflickr.com/600/400/reptile?v=' + animal.id;
        modalName.innerText = animal.name;
        modalCat.innerText = animal.category.toUpperCase();
        modalDesc.innerText = animal.desc;
        modalFeeding.innerText = animal.feeding || 'Consulte con nuestros especialistas.';
        modalHabitat.innerText = animal.habitat || 'Requiere condiciones controladas específicas.';
        modalPrice.innerText = `$${animal.price.toLocaleString()}`;

        modalAddBtn.onclick = () => {
            addToCart(animal.id);
            closeModal();
        };

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = () => {
        const modal = document.getElementById('animal-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    window.closeAnimalModal = window.closeModal;

    // Close modal on outside click
    const modalElement = document.getElementById('animal-modal');
    modalElement.addEventListener('click', (e) => {
        if (e.target === modalElement) closeModal();
    });

    // Close modal on double click
    modalElement.addEventListener('dblclick', (e) => {
        if (e.target === modalElement) closeModal();
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('animal-modal');
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
        }
    });

    // Close modal button event listener
    const closeModalBtn = document.getElementById('close-modal-btn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });

        // Also add touch events for mobile
        closeModalBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }

    // --- Cart Actions ---
    window.addToCart = (id) => {
        const animals = getAnimals();
        const animal = animals.find(a => a.id === id);
        if (animal) {
            cart.push(animal);
            updateCartUI();
            const cartBtn = document.querySelector('.safari-cart-btn');
            cartBtn.classList.add('bounce');
            setTimeout(() => cartBtn.classList.remove('bounce'), 500);
        }
    };

    function updateCartUI() {
        cartCount.innerText = cart.length;
        cartItemsList.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement('div');
            li.className = 'cart-item';
            li.innerHTML = `
                <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/50x50'">
                <div class="item-details">
                    <span>${item.name}</span>
                    <strong>$${item.price.toLocaleString()}</strong>
                </div>
                <button onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
            `;
            cartItemsList.appendChild(li);
        });
        cartTotal.innerText = `$${total.toLocaleString()}`;
    }

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCartUI();
    };

    window.toggleCart = () => {
        cartModal.classList.toggle('active');
    };

    // --- Checkout ---
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Tu expedición está vacía. Selecciona un compañero primero.');
                return;
            }
            // Abrir popup nativo premium en vez del alert feo
            document.getElementById('checkout-modal').classList.add('active');
        });
    }

    window.closeCheckout = () => {
        document.getElementById('checkout-modal').classList.remove('active');
        cart.length = 0; // Vaciamos y limpiamos expedición
        updateCartUI();
        toggleCart(); // Cerramos panel lateral
    };

    // --- Filters ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderAnimals(filter);
        });
    });

    // --- Search Event Listeners ---
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchAnimals(e.target.value, currentFilter);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchAnimals(e.target.value, currentFilter);
            }
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchAnimals('', currentFilter);
        });
    }

    // --- Header Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Stats Progressive Count Animation ---
    const counters = document.querySelectorAll('.counter-anim');
    const statsSection = document.getElementById('stats-section');
    
    if (counters.length > 0 && statsSection) {
        let hasCounted = false;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target') || 0);
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000;
                    const frameDuration = 1000 / 60;
                    const totalFrames = Math.round(duration / frameDuration);
                    const increment = target / totalFrames;
                    
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    };
                    updateCounter();
                });
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // --- Reveal Animation ---
    const revealSections = document.querySelectorAll('.section-padding');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-out';
        revealObserver.observe(section);
    });

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(styleSheet);

    // Initialize translations and render animals
    applyTranslations(currentLanguage);
    renderAnimals();
});
