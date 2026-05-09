(() => {
    "use strict";

    /* ═══════════════════════
       i18n — TRANSLATIONS
       ═══════════════════════ */
    const L = {
        tr: {
            label:    "— Anneler Günü Özel —",
            title:    "Canım<br>Annem",
            desc:     "Senin sevginle her gün bahar.",
            cta:      "Sürprizi Gör ↓",
            cf_title: "Senin İçin Bir Mesajım Var",
            cf_btn:   "Kartı Aç",
            cb_title: "Anneler Günün<br>Kutlu Olsun!",
            cb_joke:  "Akıllı değildin ama beni mutlu ettin",
            cb_sig:   "— Sonsuz Sevgilerle, Senin Yavrun",
            cb_close: "Kapat",
            why_title:"Seni Neden Çok Seviyorum?",
            w1t: "Sonsuz Şefkatin",
            w1d: "Dizim her kanadığında, kalbim her kırıldığında yanımda olan tek kişi sensin.",
            w2t: "Eşsiz Bilgeliğin",
            w2d: "Hayatın her anında bana doğru yolu gösteren ışığımsın.",
            w3t: "Gülen Yüzün",
            w3d: "Gülümsemenle en karanlık günlerimi bile aydınlatıyorsun.",
            gal_title:"Güzel Anılar",
            gal_quote:'"Seninle geçen her saniye, kalbimde sakladığım en değerli hazinem."',
            footer:   "&copy; 2026 — Dünyanın En İyi Annesine Sevgilerle"
        },
        en: {
            label:    "— Mother's Day Special —",
            title:    "My Dear<br>Mother",
            desc:     "With your love, every day is spring.",
            cta:      "See the Surprise ↓",
            cf_title: "I Have a Message for You",
            cf_btn:   "Open Card",
            cb_title: "Happy<br>Mother's Day!",
            cb_joke:  "You weren't smart but you made me happy",
            cb_sig:   "— With Infinite Love, Your Child",
            cb_close: "Close",
            why_title:"Why Do I Love You So Much?",
            w1t: "Infinite Compassion",
            w1d: "You are the only one by my side whenever my knee bleeds or my heart breaks.",
            w2t: "Unique Wisdom",
            w2d: "You are my light showing me the right way in every moment of life.",
            w3t: "Your Smiling Face",
            w3d: "You brighten even my darkest days with your smile.",
            gal_title:"Beautiful Memories",
            gal_quote:'"Every second spent with you is the most precious treasure I keep in my heart."',
            footer:   "&copy; 2026 — To the World's Best Mother with Love"
        }
    };

    let lang = navigator.language.startsWith("tr") ? "tr" : "en";

    function setLang() {
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const k = el.dataset.i18n;
            if (L[lang][k]) el.innerHTML = L[lang][k];
        });
        document.getElementById("lang-text").textContent = lang === "tr" ? "EN" : "TR";
    }

    document.getElementById("lang-btn").onclick = () => {
        lang = lang === "tr" ? "en" : "tr";
        setLang();
    };

    /* ═══════════════════════
       CANVAS PETALS — soft & buttery
       ═══════════════════════ */
    const cvs = document.getElementById("petals");
    const ctx = cvs.getContext("2d");
    let W, H;

    const resize = () => { W = cvs.width = innerWidth; H = cvs.height = innerHeight; };
    addEventListener("resize", resize);
    resize();

    const COLORS = ["#f8bbd0","#f48fb1","#f06292","#ec407a","#fce4ec","#fff0f3"];
    const N = Math.min(40, Math.max(20, Math.floor(W / 40)));   // responsive count

    class P {
        constructor(init) { this.r(init); }
        r(init) {
            this.x  = Math.random() * W;
            this.y  = init ? Math.random() * H : -16;
            this.s  = Math.random() * 10 + 7;
            this.dy = Math.random() * .45 + .15;
            this.dx = (Math.random() - .5) * .2;
            this.a  = Math.random() * 6.28;
            this.da = (Math.random() - .5) * .012;
            this.o  = Math.random() * .3 + .15;
            this.c  = COLORS[Math.random() * COLORS.length | 0];
        }
        u() {
            this.y += this.dy;
            this.x += this.dx + Math.sin(this.a) * .25;
            this.a += this.da;
            if (this.y > H + 20) this.r(false);
        }
        d() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.a);
            ctx.globalAlpha = this.o;
            ctx.fillStyle = this.c;
            ctx.beginPath();
            ctx.ellipse(0, 0, this.s * .35, this.s, 0, 0, 6.28);
            ctx.fill();
            ctx.restore();
        }
    }

    const ps = Array.from({ length: N }, () => new P(true));

    (function loop() {
        ctx.clearRect(0, 0, W, H);
        for (const p of ps) { p.u(); p.d(); }
        requestAnimationFrame(loop);
    })();

    /* ═══════════════════════
       SMOOTH PARALLAX — lerp-based (silky)
       ═══════════════════════ */
    const heroImg = document.getElementById("hero-img");
    let pTarget = 0, pCurrent = 0;

    addEventListener("scroll", () => { pTarget = scrollY * 0.025; }, { passive: true });

    (function parLoop() {
        pCurrent += (pTarget - pCurrent) * 0.04;  // very slow lerp = silky
        if (heroImg) heroImg.style.transform = `translateY(${pCurrent}%) scale(${1 + pCurrent * .001})`;
        requestAnimationFrame(parLoop);
    })();

    /* ═══════════════════════
       FLIP CARD
       ═══════════════════════ */
    const inner = document.getElementById("cardInner");
    document.getElementById("openBtn").onclick  = () => inner.classList.add("open");
    document.getElementById("closeBtn").onclick = () => inner.classList.remove("open");

    /* ═══════════════════════
       SCROLL REVEAL — IntersectionObserver
       ═══════════════════════ */
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
        });
    }, { threshold: .12 });

    document.querySelectorAll(".anim-up").forEach(el => io.observe(el));

    /* ═══════════════════════
       INIT
       ═══════════════════════ */
    setLang();

})();
