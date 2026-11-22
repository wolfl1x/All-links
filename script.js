document.addEventListener('DOMContentLoaded', () => {
    const AVATAR_COUNT = 8;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;

    const background = document.querySelector('.background');
    if (background && canHover && !reduceMotion) {
        let frame = null;
        document.addEventListener('mousemove', (e) => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
                background.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
                frame = null;
            });
        });
    }

    if (!reduceMotion) {
        document.querySelectorAll('.link-button').forEach((button) => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
                ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
                button.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    const avatar = document.querySelector('.avatar-img');
    if (avatar) {
        let last = -1;
        try {
            const saved = sessionStorage.getItem('lastAvatar');
            if (saved !== null) last = Number(saved);
        } catch (err) {}

        let next;
        do {
            next = Math.floor(Math.random() * AVATAR_COUNT) + 1;
        } while (AVATAR_COUNT > 1 && next === last);

        try {
            sessionStorage.setItem('lastAvatar', String(next));
        } catch (err) {}

        const show = () => avatar.classList.remove('is-loading');
        avatar.classList.add('is-loading');
        avatar.addEventListener('load', show, { once: true });
        avatar.addEventListener('error', show, { once: true });
        avatar.src = `avatars/avatar-${next}.jpg`;
    }
});
