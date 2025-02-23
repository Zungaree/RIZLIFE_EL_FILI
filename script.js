let currentImageIndex = 0;
const galleryItems = [
    { src: 'DZ-BT06_Product.jpg', caption: 'First edition cover of El Filibusterismo' },
    { src: '1bav.webp', caption: 'Portrait of José Rizal' },
    { src: '3overlord.png', caption: 'Portrait of José Rizal' },
    { src: '20241217_Slide18.jpg', caption: 'Original manuscript page' },
    { src: 'granblue.png', caption: 'Rizal writing El Filibusterismo' },
    { src: 'NAO.jpg', caption: 'Historical photo from the period' }
];

function showImage(imageSrc) {
    // Find the clicked gallery item index
    const clickedItem = galleryItems.findIndex(item => item.src === imageSrc);
    currentImageIndex = clickedItem;

    // Hide the gallery grid
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.style.display = 'none';
    
    // Show and position the image viewer
    const imageViewer = document.querySelector('.image-viewer');
    const viewerImage = document.getElementById('viewer-image');
    const viewerCaption = imageViewer.querySelector('.gallery-caption');
    
    // Update image and caption
    viewerImage.src = imageSrc;
    viewerCaption.textContent = galleryItems[currentImageIndex].caption;
    
    // Show the viewer
    imageViewer.style.display = 'flex';

    // Add event listeners for navigation buttons
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    // Remove existing event listeners if any
    prevButton.replaceWith(prevButton.cloneNode(true));
    nextButton.replaceWith(nextButton.cloneNode(true));

    // Get the fresh elements
    const newPrevButton = document.getElementById('prev-button');
    const newNextButton = document.getElementById('next-button');

    // Add new event listeners
    newPrevButton.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentImageIndex];
        viewerImage.src = item.src;
        viewerCaption.textContent = item.caption;
    });

    newNextButton.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        const item = galleryItems[currentImageIndex];
        viewerImage.src = item.src;
        viewerCaption.textContent = item.caption;
    });
}

// Add function to go back to gallery
function showGallery() {
    document.querySelector('.gallery-grid').style.display = 'grid';
    document.querySelector('.image-viewer').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Get the hash from URL (e.g., #introduction or #biography)
    const hash = window.location.hash || '#introduction';
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    function switchTab(tabId) {
        // Update tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if(tab.getAttribute('href').includes(tabId)) {
                tab.classList.add('active');
            }
        });

        // Update content with animation
        contents.forEach(content => {
            if(content.id === tabId + '-content') {
                // Reset animation
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
                content.classList.add('active');
                
                // Trigger reflow to restart animation
                content.offsetHeight;
                
                // Start animation
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            } else {
                content.classList.remove('active');
            }
        });
    }

    // Initial load - switch to correct tab based on URL
    switchTab(hash.replace('#', ''));

    // Handle tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('href').split('#')[1];
            switchTab(tabId);
            window.history.pushState(null, '', `#${tabId}`);
        });
    });

    // Handle dropdown link clicks
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.dataset.tab;
            const targetPage = this.getAttribute('href').split('#')[0]; // Get the target page
            window.location.href = targetPage + '#' + tabId; // Redirect to the target page with the correct hash
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const newHash = window.location.hash || '#introduction';
        switchTab(newHash.replace('#', ''));
    });

    // Character card interactions
    const characterCards = document.querySelectorAll('.character-card');

    characterCards.forEach(card => {
        // Create back button
        const backButton = document.createElement('button');
        backButton.className = 'back-button';
        backButton.textContent = '← Back';
        card.appendChild(backButton);

        // Handle card click
        card.addEventListener('click', function(e) {
            // If clicking the back button
            if (e.target === backButton) {
                closeCard(this);
                return;
            }

            // If card is already expanded, do nothing
            if (this.classList.contains('expanded')) {
                return;
            }

            // Remove expanded class from any other cards
            characterCards.forEach(c => {
                c.classList.remove('expanded');
                c.style.pointerEvents = 'auto'; // Re-enable hover effects
            });

            // Expand this card
            this.classList.add('expanded');
            this.style.pointerEvents = 'none'; // Disable hover effects on selected card
        });
    });

    function closeCard(card) {
        card.classList.remove('expanded');
        card.style.pointerEvents = 'auto'; // Re-enable hover effects
    }

    // Close expanded card when pressing ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const expandedCard = document.querySelector('.character-card.expanded');
            if (expandedCard) {
                closeCard(expandedCard);
            }
        }
    });

    // Prevent default navigation for Home and Works links
    document.getElementById('home-link').addEventListener('click', function(e) {
        e.preventDefault();
        // Optionally, you can add logic here to show the home content without redirecting
    });

    document.getElementById('works-link').addEventListener('click', function(e) {
        e.preventDefault();
        // Optionally, you can add logic here to show the works content without redirecting
    });

    // Handle gallery item clicks
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.querySelector('img').src; // Get the image source from the clicked item
            showImage(imageSrc);
        });
    });

    // Handle close button click
    const closeButton = document.getElementById('close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            const selectedImageContainer = document.querySelector('.image-viewer');
            selectedImageContainer.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }

    // Remove these event listeners since they're now handled in showImage function
    const prevButtonOld = document.getElementById('prev-button');
    const nextButtonOld = document.getElementById('next-button');
    if (prevButtonOld) {
        prevButtonOld.replaceWith(prevButtonOld.cloneNode(true));
    }
    if (nextButtonOld) {
        nextButtonOld.replaceWith(nextButtonOld.cloneNode(true));
    }
}); 