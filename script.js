let currentImageIndex = 0;
const galleryItems = [
    { src: 'DZ-BT06_Product.jpg', caption: 'First edition cover of El Filibusterismo' },
    { src: '1bav.webp', caption: 'Portrait of José Rizal' },
    { src: '3overlord.png', caption: 'Portrait of José Rizal' },
    { src: '20241217_Slide18.jpg', caption: 'Original manuscript page' },
    { src: 'granblue.png', caption: 'Rizal writing El Filibusterismo' },
    { src: 'NAO.jpg', caption: 'Historical photo from the period' }
];

let currentCharacterIndex = 0;
const characters = [
    { 
        name: 'Simoun',
        subtitle: 'Crisóstomo Ibarra',
        type: 'PROTAGONIST',
        image: 'SIMOUN.png',
        description: 'Simoun is the protagonist of the novel and the alter ego of Crisóstomo Ibarra. Unlike the hopeful reformist in Noli Me Tángere, Simoun has become disillusioned with the idea of peaceful change. His transformation into a shadowy figure seeking revenge reflects the harsh realities of Spanish colonial rule, which crushed idealism and turned some individuals toward radical solutions.'
    },
    {
        name: 'Basilio',
        subtitle: 'Medical Student',
        type: 'SUPPORTING CHARACTER',
        image: 'BASILIO.png',
        description: 'Basilio, a character from Noli Me Tángere, has grown into a diligent medical student. Having witnessed the suffering of his family under Spanish rule, he initially tries to distance himself from revolutionary activities and focus on his personal success. However, after Simoun reveals his plans, Basilio finds himself caught between his ambitions and the call for social change. The deaths of his loved ones push him toward resistance, symbolizing the awakening of the educated Filipino youth to the injustices of colonial rule.'
    },
    {
        name: 'Isagani',
        subtitle: 'Law Student',
        type: 'SUPPORTING CHARACTER',
        image: 'ISAGANI.png',
        description: 'Isagani is a passionate poet and orator who believes in fighting for reform through education and enlightenment. His love for Paulita Gómez ends tragically when she chooses to marry Juanito Pelaez, a man who aligns himself with the Spanish authorities. His greatest act in the novel is preventing the bombing at the wedding, a moment that showcases his moral dilemma—he opposes the violent methods of Simoun but understands the need for change. Isagani represents the struggle of Filipinos who sought justice through non-violent means, believing in progress through knowledge rather than bloodshed.'
    },
    {
        name: 'Kabesang Tale',
        subtitle: 'Former Cabeza de Barangay',
        type: 'SUPPORTING CHARACTER',
        image: 'TALES.png',
        description: 'A former cabeza de barangay who loses his land to the friars, representing the injustices faced by Filipino landowners under Spanish rule.'
    }
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
    const galleryGrid = document.querySelector('.gallery-grid');
    const imageViewer = document.querySelector('.image-viewer');
    if (galleryGrid && imageViewer) {
        galleryGrid.style.display = 'grid';
        imageViewer.style.display = 'none';
    }
}

function closeCharacterViewer() {
    const characterViewer = document.querySelector('.character-viewer');
    const contentContainer = document.querySelector('.content-container');
    
    // Hide the character viewer
    characterViewer.style.display = 'none';
    
    // Show the main content
    contentContainer.style.display = 'block';
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
        card.addEventListener('click', function() {
            const characterName = this.querySelector('.character-name').textContent;
            const characterImage = this.querySelector('img').src;
            showCharacterViewer(characterName, characterImage);
        });
    });

    function showCharacterViewer(name, imageSrc) {
        const characterViewer = document.querySelector('.character-viewer');
        const viewerCharacter = document.getElementById('viewer-character');
        const characterTitle = document.getElementById('character-title');
        const characterSubtitle = document.getElementById('character-subtitle');
        const characterType = document.querySelector('.character-type');
        const characterDescription = document.getElementById('character-description');
        const contentContainer = document.querySelector('.content-container');

        // Find the character index
        currentCharacterIndex = characters.findIndex(char => char.name === name);

        // Set character details
        updateCharacterDetails(currentCharacterIndex);

        // Hide the main content and show the viewer
        contentContainer.style.display = 'none';
        characterViewer.style.display = 'flex';

        // Add event listeners for navigation buttons
        document.getElementById('prev-char').addEventListener('click', showPreviousCharacter);
        document.getElementById('next-char').addEventListener('click', showNextCharacter);
    }

    function updateCharacterDetails(index) {
        const character = characters[index];
        document.getElementById('character-title').textContent = character.name;
        document.getElementById('character-subtitle').textContent = character.subtitle;
        document.querySelector('.character-type').textContent = character.type;
        document.getElementById('character-description').textContent = character.description;
        document.getElementById('viewer-character').src = character.image;
    }

    function showPreviousCharacter() {
        currentCharacterIndex = (currentCharacterIndex - 1 + characters.length) % characters.length;
        updateCharacterDetails(currentCharacterIndex);
    }

    function showNextCharacter() {
        currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
        updateCharacterDetails(currentCharacterIndex);
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

    // Close button for character viewer
    const closeCharacterBtn = document.getElementById('close-character-viewer');
    if (closeCharacterBtn) {
        closeCharacterBtn.addEventListener('click', function() {
            const characterViewer = document.querySelector('.character-viewer');
            const contentContainer = document.querySelector('.content-container');
            characterViewer.style.display = 'none';
            contentContainer.style.display = 'block';
        });
    }

    // Close button for gallery viewer
    document.querySelector('.image-viewer').addEventListener('click', function(e) {
        if (e.target.classList.contains('close-button')) {
            const imageViewer = document.querySelector('.image-viewer');
            const galleryGrid = document.querySelector('.gallery-grid');
            imageViewer.style.display = 'none';
            galleryGrid.style.display = 'grid';
        }
    });

    // Close viewers with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCharacterViewer();
            showGallery();
        }
    });
});