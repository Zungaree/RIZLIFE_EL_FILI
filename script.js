document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const links = document.querySelectorAll('nav a');

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

    // Add click event listeners to navigation links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });
}); 