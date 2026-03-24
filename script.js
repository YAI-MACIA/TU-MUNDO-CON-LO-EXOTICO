document.addEventListener('DOMContentLoaded', () => {

    // --- Animal Data (Enhanced with Feeding and Habitat) ---
    const animals = [
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
            habitat: 'Hábitat selvaje simulado extremadamente espacioso con cuerdas y enriquecimiento cognitivo.', 
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
            id: 29, name: 'Caballo Andaluz Exótico', category: 'mamifero', origin: 'España', 
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
    ];

    let cart = [];
    const animalsGrid = document.getElementById('animals-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');

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
        animalsGrid.innerHTML = '';
        const filteredAnimals = filter === 'all' 
            ? animals 
            : animals.filter(a => a.category === filter);

        filteredAnimals.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'animal-card';
            
            card.innerHTML = `
                <div class="animal-img" onclick="openAnimalModal(${animal.id})">
                    <img src="${animal.img}" alt="${animal.name}" loading="lazy" 
                         onerror="this.src='https://loremflickr.com/600/400/reptile?v=${animal.id}'">
                    <span class="category-badge">${animal.category.toUpperCase()}</span>
                    <div class="price-tag">$${animal.price.toLocaleString()}</div>
                </div>
                <div class="animal-info">
                    <h4>${animal.name}</h4>
                    <p>${animal.desc}</p>
                    <div class="card-footer">
                        <span class="origin"><i class="fas fa-location-dot"></i> ${animal.origin}</span>
                        <button class="btn-add-cart" onclick="addToCart(${animal.id})"><i class="fas fa-cart-shopping"></i></button>
                    </div>
                </div>
            `;
            animalsGrid.appendChild(card);
        });
    }

    // --- Detail Modal Functions ---
    window.openAnimalModal = (id) => {
        const animal = animals.find(a => a.id === id);
        if(!animal) return;

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
            closeAnimalModal();
        };

        animalModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeAnimalModal = () => {
        animalModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Close modal on outside click
    animalModal.addEventListener('click', (e) => {
        if(e.target === animalModal) closeAnimalModal();
    });

    // --- Cart Actions ---
    window.addToCart = (id) => {
        const animal = animals.find(a => a.id === id);
        if(animal) {
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
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Tu expedición está vacía. Selecciona un compañero primero.');
                return;
            }
            alert('¡Tu nuevo compañero exótico va en camino!\n\nRecuerda que son vidas, no juguetes. Por favor, asume el compromiso de brindarles amor, respeto y un cuidado sumamente responsable.');
            
            // Vaciar el carrito
            cart.length = 0;
            updateCartUI();
            toggleCart();
        });
    }

    // --- Filters ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderAnimals(filter);
        });
    });

    // --- Header Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

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

    renderAnimals();
});
