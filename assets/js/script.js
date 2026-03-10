        // Scroll to footer function
        function scrollToFooter() {
            document.getElementById('footer').scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Scroll to top function
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Show/hide scroll top button
        window.addEventListener('scroll', () => {
            const scrollTop = document.getElementById('scrollTop');
            if (window.scrollY > 500) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        // Scroll indicator animation pause on hover
        const scrollDown = document.querySelector('.scroll-down');
        scrollDown.addEventListener('mouseenter', () => {
            scrollDown.style.animationPlayState = 'paused';
        });
        
        scrollDown.addEventListener('mouseleave', () => {
            scrollDown.style.animationPlayState = 'running';
        });

        document.querySelectorAll('.read-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('More content coming soon!');
            });
        });