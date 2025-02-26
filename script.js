let currentImageIndex = 0;
const galleryItems = [
    { 
        src: 'legacy/1L.jpg', 
        caption: 'Jose Rizal\'s "El Filibusterismo"',
        desc: 'The first edition cover of El Filibusterismo, published in 1891 in Ghent, Belgium. This novel served as a crucial critique of Spanish colonial rule.'
    },
    { 
        src: 'legacy/2L.jpg', 
        caption: 'Jose Rizal\'s Handwritten Manuscript',
        desc: 'Original manuscript pages of El Filibusterismo, showcasing Rizal\'s handwriting and the development of his ideas during the writing process.'
    },
    { 
        src: 'legacy/4L.jpg', 
        caption: 'Marians El Filibusterismo',
        desc: 'The image is a promotional poster for El Filibusterismo: The Reign of Greed, a Grade 10-Our Lady of Pillar adaptation of José Rizal\'s novel, showcasing its themes of identity and revolution.'
    },
    { 
        src: 'legacy/3L.jpg', 
        caption: 'Memorials and Monuments',
        desc: 'A marker for the building where Jose Rizal stayed in Ghent when El Filibusterismo was printed.'
    },
    { 
        src: 'world/1W.jpg', 
        caption: 'Sa Ibabaw ng Kubyerta',
        desc: 'Inspired by Leonardo Tayao Cruz’s paintings, “Sa Ibabaw ng Kubyerta” depicts the social stratification evident since the Spanish Colonial Rule in the Philippines.'
    },
    { 
        src: 'world/2W.jpg', 
        caption: 'Reignite: An El Filibusterismo Art Exhibit Branding',
        desc: 'Reignite is a solo art exhibit by Danielle Llemos, a Multimedia Arts and Sciences student, for her thesis at Mapua University. This event was held on May 17, 2017 (Wed, 3pm-9pm) at Prism Gallery, Makati.'
    },
    { 
        src: 'world/3W.jpg', 
        caption: 'Gomburza painting by UP alumna Virginia Flor-Agbayani, 1963.',
        desc: 'Rizal dedicated his novel, "El Filibusterismo," in memory of secular priests Jose Burgos, Mariano Gomez, and Jacinto Zamora who are collectively known as Gomburza. They were executed at Bagumbayan in 1872.'
    },
    { 
        src: 'world/4W.png', 
        caption: 'Landmarks from the Novel',
        desc: 'Photo shows the current state of the Pansiteria Macanista de Buen Gusto mentioned by national hero Jose Rizal in his novel, ‘El Filibusterismo.’ '
    },

    { 
        src: 'world/5W.jpg', 
        caption: 'El Filibusterismo: A Modern Illustrated Adaptation',
        desc: 'The image is a contemporary illustrated adaptation of El Filibusterismo by Dr. José P. Rizal, featuring character designs by Crisostomo and Giron, with writing by Grace R. Miranda, bringing the novel\'s revolutionary themes to life.'
    }
];

let currentCharacterIndex = 0;
const characters = [
    { 
        name: 'Simoun',
        subtitle: 'Crisóstomo Ibarra',
        type: 'PROTAGONIST',
        image: 'SIMOUN.png',
        description: "Simoun is the protagonist of the novel and the alter ego of Crisóstomo Ibarra. Unlike the hopeful reformist in Noli Me Tángere, Simoun has become disillusioned with the idea of peaceful change. His transformation into a shadowy figure seeking revenge reflects the harsh realities of Spanish colonial rule, which crushed idealism and turned some individuals toward radical solutions. Despite his intelligence and wealth, his plans ultimately fail, highlighting the complexities and consequences of seeking justice through violence. His tragic end underscores Rizal's warning about the dangers of extremism and misplaced vengeance."
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
        description: 'Kabesang Tales is a former tenant farmer who rises to prominence as a respected figure in his community. Initially hardworking and law-abiding, he becomes a victim of Spanish colonial abuses when friars unjustly seize his land. Despite legal efforts to reclaim his property, he is repeatedly exploited and oppressed. After experiencing personal tragedies, including the abduction of his daughter and the murder of his father, he turns to rebellion, becoming a feared outlaw. Kabesang Tales represents the plight of the Filipino peasantry, highlighting how oppression can push even the most honest individuals toward violent resistance.'
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
    const viewerDescription = imageViewer.querySelector('.gallery-description');
    
    // Update image, caption and description
    viewerImage.src = imageSrc;
    viewerCaption.textContent = galleryItems[currentImageIndex].caption;
    viewerDescription.textContent = galleryItems[currentImageIndex].desc;
    
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
        viewerDescription.textContent = item.desc;
    });

    newNextButton.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        const item = galleryItems[currentImageIndex];
        viewerImage.src = item.src;
        viewerCaption.textContent = item.caption;
        viewerDescription.textContent = item.desc;
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
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Toggle menu icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });

    // Remove all mobile-specific dropdown handlers
    if (window.innerWidth <= 768) {
        const dropdownToggles = document.querySelectorAll('.nav-item > a');
        dropdownToggles.forEach(toggle => {
            toggle.style.pointerEvents = 'none';
        });
    }

    // Get the hash from URL (e.g., #introduction or #biography)
    let hash = window.location.hash || '#introduction';
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    function switchTab(tabId) {
        // Remove the # if it exists
        tabId = tabId.replace('#', '');
        
        // Update tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if(tab.getAttribute('href').includes(tabId)) {
                tab.classList.add('active');
            }
        });

        // Update content
        contents.forEach(content => {
            content.classList.remove('active');
            if(content.id === tabId + '-content') {
                content.classList.add('active');
            }
        });
    }

    // Initial load - switch to correct tab based on URL
    if (hash) {
        switchTab(hash);
    }

    // Handle tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('href').split('#')[1];
            switchTab(tabId);
            // Update URL without page reload
            window.history.pushState(null, '', `#${tabId}`);
        });
    });

    // Handle dropdown link clicks
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetPage = this.getAttribute('href').split('#')[0];
            const tabId = this.getAttribute('href').split('#')[1];
            
            // If we're already on the target page, just switch tabs
            if (window.location.pathname.endsWith(targetPage)) {
            e.preventDefault();
                switchTab(tabId);
                window.history.pushState(null, '', `#${tabId}`);
            }
            // Otherwise, let the navigation happen normally
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const newHash = window.location.hash || '#introduction';
        switchTab(newHash);
    });

    // Character card interactions
    const characterCards = document.querySelectorAll('.character-card');
    if (characterCards.length > 0) {
    characterCards.forEach(card => {
            card.addEventListener('click', function() {
                const characterName = this.querySelector('.character-name').textContent;
                const characterImage = this.querySelector('img').src;
                showCharacterViewer(characterName, characterImage);
            });
        });
    }

    // Gallery functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imageSrc = this.querySelector('img').src;
                showImage(imageSrc);
            });
        });
    }

    // Ensure home link works properly
    const homeLink = document.getElementById('home-link');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            if (window.location.pathname.endsWith('home.html')) {
                e.preventDefault();
                switchTab('introduction');
                window.history.pushState(null, '', '#introduction');
            }
        });
    }

    // Fix navigation for works section
    const worksLinks = document.querySelectorAll('.nav-item a[href="#"]');
    worksLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
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

    // Initialize the first tab to be open by default
    document.querySelector(".tab-button").click();
});

// Add keyboard support for closing
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        showGallery();
    }
}); 