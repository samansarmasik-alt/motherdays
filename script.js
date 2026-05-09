document.addEventListener('DOMContentLoaded', () => {
    // 1. Petal Animation
    const petalContainer = document.getElementById('petal-container');
    const petalCount = 30;
    const colors = ['#ffc0cb', '#ffb6c1', '#ff69b4', '#fff0f5'];

    for (let i = 0; i < petalCount; i++) {
        createPetal();
    }

    // Side Flowers Variety
    const sideFlowers = ['🌸', '🌺', '🌷', '🌹', '🌻', '🌼'];
    function createSideFlower(side) {
        const flower = document.createElement('div');
        flower.classList.add('side-flower', side);
        flower.innerText = sideFlowers[Math.floor(Math.random() * sideFlowers.length)];
        flower.style.left = side === 'left' ? (Math.random() * 5 - 2) + 'vw' : 'auto';
        flower.style.right = side === 'right' ? (Math.random() * 5 - 2) + 'vw' : 'auto';
        flower.style.animationDelay = (Math.random() * 1 + 0.5) + 's';
        flower.style.fontSize = (Math.random() * 40 + 80) + 'px';
        document.body.appendChild(flower);
    }

    for(let i=0; i<3; i++) {
        createSideFlower('left');
        createSideFlower('right');
    }

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
