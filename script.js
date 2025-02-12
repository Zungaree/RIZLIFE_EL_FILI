document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const links = document.querySelectorAll('nav a');
    const toggleBtn = document.getElementById('toggleNav');
    const navPanel = document.querySelector('.nav-panel');
    const body = document.body;

    // Add nav-collapsed class to body initially
    body.classList.add('nav-collapsed');

    function showPage(pageId) {
        // Remove active class from all pages
        pages.forEach(page => {
            if (page.classList.contains('active')) {
                page.classList.add('exit');
                page.classList.remove('active');
            }
        });

        // Add active class to target page
        const targetPage = document.getElementById(pageId);
        setTimeout(() => {
            pages.forEach(page => page.classList.remove('exit'));
            targetPage.classList.add('active');
        }, 500);
    }

    // Add navigation toggle functionality
    toggleBtn.addEventListener('click', () => {
        navPanel.classList.toggle('collapsed');
        body.classList.toggle('nav-collapsed');
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 1024) {
            navPanel.classList.remove('collapsed');
            body.classList.remove('nav-collapsed');
        } else {
            navPanel.classList.add('collapsed');
            body.classList.add('nav-collapsed');
        }
    });

    // Add click event listeners to navigation links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
            
            // If on mobile or nav is collapsed, close the nav
            if (window.innerWidth < 1024) {
                navPanel.classList.remove('collapsed');
                body.classList.remove('nav-collapsed');
            }
        });
    });
}); 