// Media items array
const mediaItems = [
  { type: 'youtube', src: 'https://www.youtube.com/embed/s8MvS728gZs?si=m-XtIKuXbPsZY7IY', description: 'Documentary Video 1', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/qEefOJXaK1A?si=XdOVplP4ODCZhG-Z', description: 'Image 1', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/RWLSxyOfkWc?si=p2vjv9KhuCzJwY52', description: 'Image 1', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/h5vNnGchGic?si=nFV16A7bO2-NYu8A', description: 'Scripted Video 1', section: 'scripted' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/lZPTGkBCxlk?si=7HqHskuOw9PgQi9f', description: 'Image 2', section: 'scripted' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/jK5JKuz_g4c?si=Uuay9HNYGxjpkHMx', description: 'Social Media Video 1', section: 'scripted' },
  { type: 'instagram', src: 'DOBn5qwkTr4', description: 'Image 3', section: 'socialmedia' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/Zgv74NOQFaY"', description: 'Image 4', section: 'socialmedia' },
  { type: 'instagram', src: 'DOg8xA6lPFi', description: 'Podcasts Video 1', section: 'socialmedia' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/HPZYNsEt-1Y?si=IWtzmrADDdfwN4HX', description: 'Graphic Design Video 1', section: 'podcasts' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/72gMCxgP2AE?si=t6cSdarAFhtNV-qN', description: 'Image 5', section: 'podcasts' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/mmyOswVxgng?si=Gm-dlDfovjvVYcNA', description: 'Image 5', section: 'podcasts' },
  { type: 'image', src: 'images/Image-1.png', description: 'Image 5', section: 'multimedia' },
  { type: 'image', src: 'images/Image-1.png', description: 'Image 5', section: 'multimedia' },
  { type: 'image', src: 'images/Image-1.png', description: 'Image 5', section: 'multimedia' },
];

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.getElementById('lightbox-close');

// Function to add media items to grids
function populateGrids() {
  mediaItems.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('grid-item');

    let mediaHTML = '';

    // Check media type and create corresponding HTML
    if (item.type === 'video') {
      mediaHTML = `<video class="media" muted autoplay playsinline preload="auto" loop style="max-width: 100%; max-height: 100%;">
                     <source src="${item.src}" type="video/mp4">
                   </video>`;
    } else if (item.type === 'youtube') {
      mediaHTML = `<iframe class="media" src="${item.src}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="max-width: 100%; max-height: 100%;"></iframe>`;
    } else if (item.type === 'streamable') {
      mediaHTML = `<iframe class="media" src="${item.src}"
        allowfullscreen
        height="100%"
        width="100%"
        style="border:none;
        width: 100%;
        height: 100%; position:absolute; left:0px; top:0px; overflow:hidden;"></iframe>`;
    } else if (item.type === 'instagram') {
      mediaHTML = `<iframe class="media" src="https://www.instagram.com/p/${item.src}/embed" width="400" height="480" frameborder="0" style="max-width: 100%; max-height: 100%;"></iframe>`;
    } else {
      mediaHTML = `<img class="media" src="${item.src}" alt="${item.description}" style="max-width: 100%; max-height: 100%;">`;
    }

    wrapper.innerHTML = mediaHTML;
    wrapper.style.position = 'relative';
    wrapper.style.cursor = 'pointer';

    // Add click event to open lightbox
    wrapper.addEventListener('click', () => openLightbox(item));

    // Append to the respective section grid
    const sectionGrid = document.querySelector(`.${item.section}-grid`);
    if (sectionGrid) {
      sectionGrid.appendChild(wrapper);
    } else {
      console.warn(`Grid container for ${item.section} not found!`);
    }
  });
}

// Function to open the lightbox with selected item
function openLightbox(item) {
  lightboxContent.innerHTML = ''; // Clear previous content

  // Check item type and create corresponding content in the lightbox
  if (item.type === 'video') {
    const video = document.createElement('video');
    video.src = item.src;
    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = '100%';
    video.style.maxHeight = '100%';
    lightboxContent.appendChild(video);
  } else if (item.type === 'youtube') {
    const iframe = document.createElement('iframe');
    iframe.src = item.src;
    iframe.frameborder = '0';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowfullscreen = true;
    iframe.style.maxWidth = '100%';
    iframe.style.maxHeight = '100%';
    lightboxContent.appendChild(iframe);
  } else if (item.type === 'instagram') {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.instagram.com/p/${item.src}/embed`;
    iframe.width = "400";
    iframe.height = "480";
    iframe.frameborder = "0";
    iframe.style.maxWidth = '100%';
    iframe.style.maxHeight = '100%';
    lightboxContent.appendChild(iframe);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.description;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    lightboxContent.appendChild(img);
  }

  // Set description
  lightboxDescription.textContent = item.description || 'No description available';

  // Show lightbox
  lightbox.style.display = 'flex';
}

// Close the lightbox when the close button is clicked
lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';

  // Pause any video when the lightbox is closed
  const video = lightboxContent.querySelector('video');
  const iframe = lightboxContent.querySelector('iframe');
  
  if (video) {
    video.pause();
  }

  if (iframe) {
    iframe.src = ''; // Stop YouTube video by removing the src
  }
});

// Close the lightbox if the background is clicked
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightboxClose.click();
  }
});

// Populate grids
populateGrids();