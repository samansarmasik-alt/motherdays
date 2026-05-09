document.addEventListener('DOMContentLoaded', () => {
    // 1. Petal Animation
    const petalContainer = document.getElementById('petal-container');
    const petalCount = 30;
    const colors = ['#ffc0cb', '#ffb6c1', '#ff69b4', '#fff0f5'];

    for (let i = 0; i < petalCount; i++) {
        createPetal();
    }

    // 1. Translations
    const translations = {
        tr: {
            hero_title: "Canım Annem",
            hero_subtitle: "Senin Sevginle Her Gün Bahar",
            discover: "Keşfet",
            card_front_title: "Senin İçin Bir Mesajım Var",
            open_card: "Kartı Aç",
            card_back_title: "Anneler Günün Kutlu Olsun!",
            card_message: 'Akıllı değildin ama beni mutlu ettin <span class="emoji">😉</span>',
            signature: "Sonsuz Sevgilerle, Senin Yavrun",
            close_card: "Kapat",
            reasons_title: "Neden Seni Çok Seviyorum?",
            reason1_title: "Sonsuz Şefkatin",
            reason1_desc: "Dizim her kanadığında, kalbim her kırıldığında yanımda olan tek kişi sensin.",
            reason2_title: "Eşsiz Bilgeliğin",
            reason2_desc: "Hayatın her anında bana doğru yolu gösteren ışığımsın.",
            reason3_title: "Gülen Yüzün",
            reason3_desc: "Gülümsemenle en karanlık günlerimi bile aydınlatıyorsun.",
            gallery_title: "Güzel Anılar",
            love_filled: "Sevgiyle Dolu",
            gallery_text: "Seninle geçen her saniye, kalbimde sakladığım en değerli hazinem.",
            footer_text: "&copy; 2026 - Dünyanın En İyi Annesine Sevgilerle"
        },
        en: {
            hero_title: "My Dear Mother",
            hero_subtitle: "With Your Love, Every Day is Spring",
            discover: "Discover",
            card_front_title: "I Have a Message for You",
            open_card: "Open Card",
            card_back_title: "Happy Mother's Day!",
            card_message: 'You weren\'t smart but you made me happy <span class="emoji">😉</span>',
            signature: "With Infinite Love, Your Child",
            close_card: "Close",
            reasons_title: "Why Do I Love You So Much?",
            reason1_title: "Infinite Compassion",
            reason1_desc: "You are the only one by my side whenever my knee bleeds or my heart breaks.",
            reason2_title: "Unique Wisdom",
            reason2_desc: "You are my light that shows me the right way in every moment of life.",
            reason3_title: "Smiling Face",
            reason3_desc: "You brighten even my darkest days with your smile.",
            gallery_title: "Beautiful Memories",
            love_filled: "Filled with Love",
            gallery_text: "Every second spent with you is the most precious treasure I keep in my heart.",
            footer_text: "&copy; 2026 - To the World's Best Mother with Love"
        }
    };

    let currentLang = navigator.language.startsWith('tr') ? 'tr' : 'en';

    function updateLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerHTML = translations[currentLang][key];
        });
    }

    document.getElementById('lang-btn').addEventListener('click', () => {
        currentLang = currentLang === 'tr' ? 'en' : 'tr';
        updateLanguage();
    });

    updateLanguage();

    // 2. Spiraling SVG Vine Generation
    function createVine(selector) {
        const containers = document.querySelectorAll(selector);
        containers.forEach((container, idx) => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 500 500");
            svg.classList.add("vine-svg");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            // Spiraling path that covers more frame area
            const d = "M0,0 C100,0 200,50 250,150 S400,100 500,200 S450,400 300,500 L0,500 Z"; // Dummy frame-like path
            // Let's make it more "vine-like"
            const vineD = "M0,0 C50,20 100,80 80,150 S150,250 100,350 S200,450 350,400 S450,500 500,500";
            path.setAttribute("d", vineD);
            path.classList.add("vine-path");
            
            svg.appendChild(path);
            container.appendChild(svg);

            const pathLength = path.getTotalLength();
            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength;

            // Add flowers and leaves along the spiral
            for (let i = 0; i < 8; i++) {
                const point = path.getPointAtLength((i / 8) * pathLength);
                setTimeout(() => {
                    addFlowerToVine(container, point.x * 0.6, point.y * 0.6); // Scale to fit
                    addLeafToVine(container, point.x * 0.6, point.y * 0.6);
                }, 1000 + i * 300);
            }
        });
    }

    function addFlowerToVine(container, x, y) {
        const flowerHead = document.createElement('div');
        flowerHead.classList.add('vine-flower');
        flowerHead.style.left = x + 'px';
        flowerHead.style.top = y + 'px';
        
        const petalColors = ['#ffafbd', '#ff9a9e', '#d63384', '#ffecd2'];
        const color = petalColors[Math.floor(Math.random() * petalColors.length)];

        // Simple petal structure
        for (let i = 0; i < 5; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.width = '15px';
            petal.style.height = '20px';
            petal.style.background = color;
            petal.style.transform = `translate(-50%, -100%) rotate(${i * 72}deg)`;
            flowerHead.appendChild(petal);
        }
        const center = document.createElement('div');
        center.classList.add('flower-center');
        center.style.width = '8px';
        center.style.height = '8px';
        flowerHead.appendChild(center);
        
        container.appendChild(flowerHead);
    }

    function addLeafToVine(container, x, y) {
        const leaf = document.createElement('div');
        leaf.classList.add('vine-leaf');
        leaf.style.left = (x + 10) + 'px';
        leaf.style.top = (y + 10) + 'px';
        leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(leaf);
    }

    createVine('.vine-container');

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        const size = Math.random() * 15 + 10 + 'px';
        petal.style.width = size;
        petal.style.height = size;
        
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const duration = Math.random() * 5 + 5 + 's';
        const delay = Math.random() * 10 + 's';
        
        petal.style.animationDuration = duration;
        petal.style.animationDelay = delay;
        
        petalContainer.appendChild(petal);

        // Reset petal after animation
        petal.addEventListener('animationiteration', () => {
            petal.style.left = Math.random() * 100 + 'vw';
        });
    }

    // 2. Interactive Card Logic
    const openBtn = document.getElementById('open-card-btn');
    const closeBtn = document.getElementById('close-card-btn');
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');
    const card = document.getElementById('main-card');

    openBtn.addEventListener('click', () => {
        cardFront.classList.add('hidden');
        cardBack.classList.remove('hidden');
        card.style.transform = 'rotateY(360deg)';
        
        // Trigger confetti-like burst of petals
        for(let i=0; i<20; i++) {
            setTimeout(createBurstPetal, i * 50);
        }
    });

    closeBtn.addEventListener('click', () => {
        cardBack.classList.add('hidden');
        cardFront.classList.remove('hidden');
        card.style.transform = 'rotateY(0deg)';
    });

    function createBurstPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        const size = '15px';
        petal.style.width = size;
        petal.style.height = size;
        petal.style.left = '50vw';
        petal.style.top = '50vh';
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        petalContainer.appendChild(petal);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = 50;
        let posY = 50;
        
        const interval = setInterval(() => {
            posX += vx * 0.1;
            posY += vy * 0.1;
            petal.style.left = posX + 'vw';
            petal.style.top = posY + 'vh';
            
            if (posX < 0 || posX > 100 || posY > 100) {
                clearInterval(interval);
                petal.remove();
            }
        }, 20);
    }

    // 3. Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 4. Smooth Scroll for Keşfet button
    document.querySelector('.scroll-indicator').addEventListener('click', () => {
        document.getElementById('interactive-card').scrollIntoView({ behavior: 'smooth' });
    });
});
