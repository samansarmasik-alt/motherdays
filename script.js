(() => {
    'use strict';

    /* ======================
       TRANSLATIONS
       ====================== */
    const i18n = {
        tr: {
            hero_tag:       "— Anneler Günü Özel —",
            hero_title:     "Canım<br>Annem",
            hero_sub:       "Senin sevginle her gün bahar.",
            hero_cta:       "Sürprizi Gör",
            card_front:     "Senin İçin Bir Mesajım Var",
            open_card:      "Kartı Aç",
            card_back_title:"Anneler Günün<br>Kutlu Olsun!",
            card_message:   "Akıllı değildin ama beni mutlu ettin",
            signature:      "— Sonsuz Sevgilerle, Senin Yavrun",
            close_card:     "Kapat",
            reasons_title:  "Seni Neden Çok Seviyorum?",
            r1_title:       "Sonsuz Şefkatin",
            r1_desc:        "Dizim her kanadığında, kalbim her kırıldığında yanımda olan tek kişi sensin.",
            r2_title:       "Eşsiz Bilgeliğin",
            r2_desc:        "Hayatın her anında bana doğru yolu gösteren ışığımsın.",
            r3_title:       "Gülen Yüzün",
            r3_desc:        "Gülümsemenle en karanlık günlerimi bile aydınlatıyorsun.",
            gallery_title:  "Güzel Anılar",
            gallery_text:   "Seninle geçen her saniye, kalbimde sakladığım en değerli hazinem.",
            footer:         "&copy; 2026 — Dünyanın En İyi Annesine Sevgilerle"
        },
        en: {
            hero_tag:       "— Mother's Day Special —",
            hero_title:     "My Dear<br>Mother",
            hero_sub:       "With your love, every day is spring.",
            hero_cta:       "See the Surprise",
            card_front:     "I Have a Message for You",
            open_card:      "Open Card",
            card_back_title:"Happy<br>Mother's Day!",
            card_message:   "You weren't smart but you made me happy",
            signature:      "— With Infinite Love, Your Child",
            close_card:     "Close",
            reasons_title:  "Why Do I Love You So Much?",
            r1_title:       "Infinite Compassion",
            r1_desc:        "You are the only one by my side whenever my knee bleeds or my heart breaks.",
            r2_title:       "Unique Wisdom",
            r2_desc:        "You are my light showing me the right way in every moment of life.",
            r3_title:       "Your Smiling Face",
            r3_desc:        "You brighten even my darkest days with your smile.",
            gallery_title:  "Beautiful Memories",
            gallery_text:   "Every second spent with you is the most precious treasure I keep in my heart.",
            footer:         "&copy; 2026 — To the World's Best Mother with Love"
        }
    };

    let lang = navigator.language.startsWith('tr') ? 'tr' : 'en';

    function applyLang() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerHTML = i18n[lang][el.dataset.i18n];
        });
        document.getElementById('lang-label').textContent = lang === 'tr' ? 'EN' : 'TR';
    }

    document.getElementById('lang-btn').addEventListener('click', () => {
        lang = lang === 'tr' ? 'en' : 'tr';
        applyLang();
    });

    /* ======================
       PETAL CANVAS (soft, GPU-accelerated)
       ====================== */
    const canvas = document.getElementById('petals-canvas');
    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const PETAL_COUNT = 35;
    const petalColors = ['#f8bbd0','#f48fb1','#f06292','#ec407a','#fce4ec'];

    class Petal {
        constructor() { this.reset(true); }
        reset(init) {
            this.x  = Math.random() * W;
            this.y  = init ? Math.random() * H : -20;
            this.s  = Math.random() * 12 + 8;
            this.vy = Math.random() * 0.6 + 0.3;
            this.vx = Math.random() * 0.4 - 0.2;
            this.a  = Math.random() * Math.PI * 2;
            this.va = (Math.random() - 0.5) * 0.02;
            this.o  = Math.random() * 0.4 + 0.2;
            this.c  = petalColors[Math.random() * petalColors.length | 0];
        }
        update() {
            this.y += this.vy;
            this.x += this.vx + Math.sin(this.a) * 0.3;
            this.a += this.va;
            if (this.y > H + 20) this.reset(false);
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.a);
            ctx.globalAlpha = this.o;
            ctx.fillStyle = this.c;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.s * 0.4, this.s, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    const petals = Array.from({ length: PETAL_COUNT }, () => new Petal());

    function animate() {
        ctx.clearRect(0, 0, W, H);
        petals.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();

    /* ======================
       PARALLAX (very smooth)
       ====================== */
    const heroImg = document.querySelector('.hero-img');
    let currentY = 0, targetY = 0;

    window.addEventListener('scroll', () => {
        targetY = window.scrollY * 0.03;
    }, { passive: true });

    function smoothParallax() {
        currentY += (targetY - currentY) * 0.05;        // ← lerp for silky smooth
        if (heroImg) {
            heroImg.style.transform = `scale(${1 + currentY * 0.002}) translateY(${currentY}%)`;
        }
        requestAnimationFrame(smoothParallax);
    }
    smoothParallax();

    /* ======================
       FLIP CARD
       ====================== */
    const flipInner = document.getElementById('flip-inner');
    document.getElementById('open-btn').addEventListener('click', () => {
        flipInner.classList.add('flipped');
    });
    document.getElementById('close-btn').addEventListener('click', () => {
        flipInner.classList.remove('flipped');
    });

    /* ======================
       SCROLL REVEAL
       ====================== */
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));

    /* ======================
       INIT
       ====================== */
    applyLang();

})();
