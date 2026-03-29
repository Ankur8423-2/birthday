// Confetti triggering function
function celebrate() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);

    // Create beautiful floating background particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const colors = ['#fff', '#ff9a9e', '#fecfef'];
        for (let i = 0; i < 35; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = Math.random() * 5 + 4 + 's'; // Slower, elegant floating
            particle.style.animationDelay = Math.random() * 5 + 's';

            // Randomize appearance (circles vs hearts)
            if (Math.random() > 0.75) {
                particle.innerHTML = '❤️';
                particle.style.background = 'transparent';
                particle.style.fontSize = (Math.random() * 15 + 10) + 'px';
                particle.style.opacity = '0.6';
            } else {
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            }

            particlesContainer.appendChild(particle);
        }
    }

    // Spawn animated metallic-pink flying balloons from the bottom!
    const colors = ['#f48fb1', '#ffc4ff', '#ffb2d0', '#ff80ab', '#f8bbd0'];
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const b = document.createElement('div');
            b.className = 'flying-balloon';
            b.style.background = colors[Math.floor(Math.random() * colors.length)];
            b.style.left = Math.random() * 95 + 'vw';

            // Give each balloon a random fixed rotation
            const rot = (Math.random() * 40 - 20) + 'deg';
            b.style.setProperty('--rot', rot);

            document.body.appendChild(b);

            // Remove from DOM after animation finishes (5 seconds)
            setTimeout(() => b.remove(), 5500);
        }, i * 150); // Stagger spawn over time
    }
}

// Dodge logic for the 'No' button
function dodge(btn) {
    // If it's not absolute yet, make it absolute so it can move everywhere
    if (btn.style.position !== 'absolute') {
        const rect = btn.getBoundingClientRect();
        const parentRect = btn.parentElement.getBoundingClientRect();

        // Convert to absolute positioning without a layout jump
        btn.style.position = 'absolute';
        btn.style.left = (rect.left - parentRect.left) + 'px';
        btn.style.top = (rect.top - parentRect.top) + 'px';
    }

    // Give it a random translation that fits on mobile
    const isMobile = window.innerWidth < 500;
    const maxX = isMobile ? 80 : 150;
    const minX = isMobile ? -80 : -150;
    const maxY = isMobile ? 80 : 100;
    const minY = isMobile ? -80 : -100;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Navigate to next card
function nextCard(currentIndex) {
    const currentCard = document.getElementById(`card-${currentIndex}`);
    const nextCard = document.getElementById(`card-${currentIndex + 1}`);

    currentCard.classList.remove('active');

    setTimeout(() => {
        currentCard.classList.add('hidden');
        nextCard.classList.remove('hidden');

        // Small delay to allow CSS transform to trigger
        setTimeout(() => {
            nextCard.classList.add('active');
        }, 50);
    }, 500); // Wait for the fade out
}

let blownCount = 0;
function blowCandle(num) {
    const flame = document.getElementById(`flame-${num}`);
    if (!flame.classList.contains('blown')) {
        flame.classList.add('blown');
        blownCount++;

        const msg = document.getElementById('cake-msg');
        if (blownCount === 1) {
            msg.innerText = "One down! Blow out the other one! 💨";
        } else if (blownCount === 2) {
            msg.innerText = "Yay! Make a wish! ✨🪄";
            setTimeout(() => {
                fetchSurprise(3);
            }, 1500);
        }
    }
}

// Show the surprise directly without fetching from a backend
function fetchSurprise(currentIndex) {
    // Dim the cake to show transition is happening
    const cakeContainer = document.querySelector(`#card-${currentIndex} .cake-interact-container`);
    if (cakeContainer) cakeContainer.style.opacity = '0.5';

    setTimeout(() => {
        // Populate data with beautiful styling matching the image!
        document.getElementById('surprise-title').innerHTML = `
            <span class="happy-text">HAPPY</span><br>
            <span class="cursive-text">Birthday Didi</span>
            <div style="font-size: 3rem; font-family: sans-serif; margin-top: 15px; display: flex; justify-content: center; gap: 10px;">🎉 💖</div>
        `;
        document.getElementById('surprise-desc').innerText = "You are not just my Di but my biggest support and best friend. Thank you for always being there for me no matter what. I’m so lucky to have you in my life. May your day be filled with happiness, love, and everything you deserve. Love you so much ❤️";

        // Transition
        const currentCard = document.getElementById(`card-${currentIndex}`);
        const surpriseCard = document.getElementById('surprise-card');

        currentCard.classList.remove('active');

        setTimeout(() => {
            currentCard.classList.add('hidden');
            surpriseCard.classList.remove('hidden');

            setTimeout(() => {
                surpriseCard.classList.add('active');
                celebrate(); // Trigger confetti and balloons
            }, 50);
        }, 500);
    }, 1000); // 1 second suspense
}
