// =========================================================
// 1. WEB AUDIO SYNTHESIZER (SOFT HOVER & CLICK SFX)
// =========================================================
let soundEnabled = true;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSoftHoverSound() {
    if (!soundEnabled) return;
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, audioCtx.currentTime + 0.06);

        gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.065);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.07);
    } catch (e) {}
}

function playSoftClickSound() {
    if (!soundEnabled) return;
    try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(340, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(160, audioCtx.currentTime + 0.09);

        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.095);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
}

const soundToggleBtn = document.getElementById('sound-toggle');
soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        initAudio();
        playSoftClickSound();
        soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span>SFX ON</span>';
    } else {
        soundToggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span>SFX OFF</span>';
    }
});

// =========================================================
// 2. CUSTOM CURSOR TRACKING & HOVER INTERACTION
// =========================================================
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorRing.style.left = `${e.clientX}px`;
    cursorRing.style.top = `${e.clientY}px`;
});

const interactives = document.querySelectorAll('.interactive');
interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('hovered');
        playSoftHoverSound();
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('hovered');
    });
    el.addEventListener('click', () => {
        playSoftClickSound();
    });
});

// =========================================================
// 3. 3D FLOATING TILT EFFECT ON DASHBOARD & CARDS
// =========================================================
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// =========================================================
// 4. MODAL DETAILS FOR DASHBOARD CARDS, PROJECTS & TEAM
// =========================================================
const modalData = {
    'identity-modal': {
        title: '—͞Ꮪ𝐡𝐚ɴᴅɪᴛʜ 𝐀ʟʟ𝐬ᴀʙɪʙ࿐ // Digital Dossier',
        body: `<p style="color:#b59ea3;margin:12px 0;"><strong>Role:</strong> Creative Mind • Digital Enthusiast • Project Builder</p>
               <p style="color:#b59ea3;margin-bottom:12px;">Specializing in Python automation, Java systems, and modern dark-neon web architectures with 200+ completed Fiverr deliveries.</p>
               <ul style="color:#ffd6dc;padding-left:18px;line-height:1.8;">
                 <li>200+ Fiverr Freelance Orders Completed</li>
                 <li>Dedicated 5-Person Execution Squad</li>
                 <li>24/7 AI Concierge (Nusairah)</li>
               </ul>`
    },
    'modal-fiverr': {
        title: '200+ Fiverr Projects Milestone',
        body: `<p style="color:#b59ea3;margin:12px 0;">Successfully delivered over 200 custom orders across global clients with consistent 5-star feedback.</p>
               <p style="color:#ffd6dc;">Core niches: Python Web Scraping, Browser Automation Bots, Custom APIs, Java Utilities, and Responsive Portfolios.</p>`
    },
    'modal-python': {
        title: 'Python & Core Programming Expertise',
        body: `<p style="color:#b59ea3;margin:12px 0;">From automated data pipelines to full-stack web apps, every script is optimized for speed, clean structure, and reliability.</p>`
    },
    'modal-team': {
        title: 'Core Execution Squad (5 Specialists)',
        body: `<ul style="color:#ffd6dc;padding-left:18px;line-height:1.9;margin-top:10px;">
                 <li><strong>Symon:</strong> Web Developer</li>
                 <li><strong>Ryuz:</strong> Web Designer</li>
                 <li><strong>Xannat:</strong> Client Communicator</li>
                 <li><strong>Aevon:</strong> Core Coder</li>
                 <li><strong>Anan:</strong> Application Specialist</li>
               </ul>`
    },
    'proj-1': {
        title: 'Fiverr Auto-Workflow Engine (Python)',
        body: `<p style="color:#b59ea3;margin:12px 0;">Built for high-volume e-commerce sellers to automate product scraping, price tracking, and CSV/Excel reporting.</p>`
    },
    'proj-2': {
        title: 'Enterprise Task & POS Core (Java)',
        body: `<p style="color:#b59ea3;margin:12px 0;">A modular Java desktop application featuring role-based authentication, inventory tracking, and automated PDF receipts.</p>`
    },
    'proj-3': {
        title: 'Crimson Neon Brand Identity',
        body: `<p style="color:#b59ea3;margin:12px 0;">Interactive dark-maroon portfolio framework with real-time Web Audio hover effects, 3D tilt physics, and an embedded AI assistant.</p>`
    },
    'team-symon': { title: 'Symon — Web Developer', body: '<p style="color:#b59ea3;margin-top:10px;">Leads full-stack web engineering, API integration, and responsive performance optimization.</p>' },
    'team-ryuz': { title: 'Ryuz — Web Designer', body: '<p style="color:#b59ea3;margin-top:10px;">Crafts dark-aesthetic UI/UX layouts, creative posters, and cohesive visual identities.</p>' },
    'team-xannat': { title: 'Xannat — Communicator', body: '<p style="color:#b59ea3;margin-top:10px;">Handles buyer communication, project scoping, and client satisfaction from start to delivery.</p>' },
    'team-aevon': { title: 'Aevon — Coder', body: '<p style="color:#b59ea3;margin-top:10px;">Focuses on core Python/Java logic, algorithmic efficiency, and clean code execution.</p>' },
    'team-anan': { title: 'Anan — Applicator', body: '<p style="color:#b59ea3;margin-top:10px;">Executes deployment, cross-platform application setup, and end-to-end QA testing.</p>' }
};

const infoModal = document.getElementById('info-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal');

document.querySelectorAll('[data-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const key = trigger.getAttribute('data-modal');
        const data = modalData[key];
        if (data) {
            modalContent.innerHTML = `<h3 style="font-family:var(--font-display);color:#fff;font-size:1.35rem;">${data.title}</h3>${data.body}`;
            infoModal.classList.remove('hidden');
        }
    });
});

closeModalBtn.addEventListener('click', () => infoModal.classList.add('hidden'));
infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) infoModal.classList.add('hidden');
});

// =========================================================
// 5. DIRECT EMAIL FORM HANDLER (MAILTO + INSTANT FEEDBACK)
// =========================================================
const emailForm = document.getElementById('direct-email-form');
emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const subject = document.getElementById('sender-subject').value.trim();
    const message = document.getElementById('sender-message').value.trim();

    // Replace with your real email address below:
    const myEmail = "dewanshandith@gmail.com";
    const mailtoLink = `mailto:${myEmail}?subject=${encodeURIComponent(subject + " — from " + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    
    window.location.href = mailtoLink;
});

// =========================================================
// 6. NUSAIRAH AI PERSONAL ASSISTANT
// =========================================================
const nusairahToggle = document.getElementById('nusairah-toggle');
const nusairahChat = document.getElementById('nusairah-chat');
const nusairahClose = document.getElementById('nusairah-close');
const openNusairahCard = document.getElementById('open-nusairah-card');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

function toggleChat() {
    nusairahChat.classList.toggle('hidden');
    playSoftClickSound();
}

nusairahToggle.addEventListener('click', toggleChat);
nusairahClose.addEventListener('click', toggleChat);
if (openNusairahCard) openNusairahCard.addEventListener('click', toggleChat);

function getNusairahReply(q) {
    const text = q.toLowerCase();
    if (text.includes('fiverr') || text.includes('project') || text.includes('work')) {
        return "Shandith has completed 200+ projects on Fiverr! His major work includes Python automation bots, web scrapers, Java desktop tools, and custom dark-neon websites.";
    }
    if (text.includes('team') || text.includes('symon') || text.includes('ryuz') || text.includes('xannat') || text.includes('aevon') || text.includes('anan')) {
        return "Shandith leads a 5-member squad: Symon (Web Developer), Ryuz (Web Designer), Xannat (Communicator), Aevon (Coder), and Anan (Applicator).";
    }
    if (text.includes('skill') || text.includes('python') || text.includes('java')) {
        return "His core stack includes Python (Automation, Bots, APIs), Java, JavaScript, HTML/CSS, and C/C++.";
    }
    if (text.includes('contact') || text.includes('email') || text.includes('hire')) {
        return "You can use the 'Connect With Me' form at the bottom of this page to send a direct email, or click any social icon in the top dashboard!";
    }
    return "I'm Nusairah AI! You can ask me about Shandith's 200+ Fiverr orders, his Python & Java experience, his 5-member team, or how to send him an email.";
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userText = chatInput.value.trim();
    if (!userText) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'msg user';
    userBubble.textContent = userText;
    chatMessages.appendChild(userBubble);
    chatInput.value = '';

    setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = 'msg bot';
        botBubble.textContent = getNusairahReply(userText);
        chatMessages.appendChild(botBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        playSoftHoverSound();
    }, 350);
});
