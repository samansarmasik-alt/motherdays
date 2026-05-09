document.addEventListener('DOMContentLoaded', () => {
    // 1. Petal Animation
    const petalContainer = document.getElementById('petal-container');
    const petalCount = 30;
    const colors = ['#ffc0cb', '#ffb6c1', '#ff69b4', '#fff0f5'];

    for (let i = 0; i < petalCount; i++) {
        createPetal();
    }

    // SVG-based Vine Generation
    function createVine(selector) {
        const containers = document.querySelectorAll(selector);
        containers.forEach(container => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 300 300");
            svg.classList.add("vine-svg");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            // A curvy vine path from (0,0)
            const d = "M0,0 C50,100 150,50 200,200 S250,250 300,300";
            path.setAttribute("d", d);
            path.classList.add("vine-path");
            
            svg.appendChild(path);
            container.appendChild(svg);

            // Add flowers and leaves at intervals
            for (let i = 0; i < 5; i++) {
                const point = path.getPointAtLength(i * 60 + 20);
                setTimeout(() => {
                    addFlowerToVine(container, point.x, point.y);
                    addLeafToVine(container, point.x, point.y);
                }, 1000 + i * 400);
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
