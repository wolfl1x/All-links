document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('mousemove', function(e) {
        const background = document.querySelector('.background');
        if (!background) return;

        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        background.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    });

    const buttons = document.querySelectorAll('.link-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: currentColor;
                opacity: 0.3;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    const avatarImg = document.querySelector('.avatar-img');
    if (avatarImg) {
        const avatars = [
            'avatars/𝖃𝖀𝕽𝕺.jpg',
            'avatars/𝔶ᴏ𝗿𝕦.jpg',
            'avatars/ソ〇「い.jpg',
            'avatars/𝒚𝒐𝒓𝒖.jpg',
            'avatars/asa mitaka.jpg'
        ];
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
        avatarImg.style.opacity = 0;
        avatarImg.src = randomAvatar;
        avatarImg.onload = () => {
            avatarImg.style.transition = 'opacity 0.5s ease';
            avatarImg.style.opacity = 1;
        };
    } else {
        console.warn('⚠️ Element .avatar-img not found!');
    }
});

function updateTextColor() {
    const hours = new Date().getHours();
    const isDay = hours > 6 && hours < 20;
    document.body.style.color = isDay ? '#000000' : '#ffffff';
}
setInterval(updateTextColor, 1000);
