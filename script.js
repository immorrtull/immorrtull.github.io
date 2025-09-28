// Media items array
const mediaItems = [
  { type: 'youtube', src: 'https://www.youtube.com/embed/s8MvS728gZs?si=m-XtIKuXbPsZY7IY', description: 'Documentary Video 1', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/qEefOJXaK1A?si=XdOVplP4ODCZhG-Z', description: 'Image 1', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/RWLSxyOfkWc?si=p2vjv9KhuCzJwY52', description: 'Image 1', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/h5vNnGchGic?si=nFV16A7bO2-NYu8A', description: 'Scripted Video 1', section: 'scripted' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/lZPTGkBCxlk?si=7HqHskuOw9PgQi9f', description: 'Image 2', section: 'scripted' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/jK5JKuz_g4c?si=Uuay9HNYGxjpkHMx', description: 'Social Media Video 1', section: 'scripted' },
  { type: 'instagram', src: 'DOBn5qwkTr4', description: 'Image 3', section: 'socialmedia' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/Zgv74NOQFaY', description: 'Image 4', section: 'socialmedia' },
  { type: 'instagram', src: 'DOg8xA6lPFi', description: 'Podcasts Video 1', section: 'socialmedia' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/HPZYNsEt-1Y?si=IWtzmrADDdfwN4HX', description: 'Graphic Design Video 1', section: 'podcasts' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/72gMCxgP2AE?si=t6cSdarAFhtNV-qN', description: 'Image 5', section: 'podcasts' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/mmyOswVxgng?si=Gm-dlDfovjvVYcNA', description: 'Image 5', section: 'podcasts' },
  { type: 'image', src: 'images/Image-1.png', description: 'Image 5', section: 'multimedia' },
  { type: 'image', src: 'images/Image-1.png', description: 'Image 5', section: 'multimedia' },
  { type: 'image', src: 'images/Image-1.png', description: 'Image 5', section: 'graphicdesign' },
];

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.getElementById('lightbox-close');

// Close lightbox on close button click or outside click
lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightboxContent.innerHTML = '';  // Clear content
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    lightboxContent.innerHTML = '';
  }
});

// Function to add media items to grids
function populateGrids() {
  mediaItems.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('grid-item');
    wrapper.style.position = 'relative';
    wrapper.style.cursor = 'pointer';

    // For video and iframe types, use a responsive wrapper
    let mediaElement;

    if (item.type === 'video') {
      mediaElement = document.createElement('video');
      mediaElement.src = item.src;
      mediaElement.muted = true;
      mediaElement.autoplay = true;
      mediaElement.playsInline = true;
      mediaElement.loop = true;
      mediaElement.preload = 'auto';
      mediaElement.style.width = '100%';
      mediaElement.style.height = '100%';

      const responsiveWrapper = document.createElement('div');
      responsiveWrapper.classList.add('responsive-video');
      responsiveWrapper.appendChild(mediaElement);
      wrapper.appendChild(responsiveWrapper);

    } else if (item.type === 'youtube' || item.type === 'streamable' || item.type === 'instagram') {
      mediaElement = document.createElement('iframe');

      if (item.type === 'instagram') {
        mediaElement.src = `https://www.instagram.com/p/${item.src}/embed`;
      } else {
        mediaElement.src = item.src;
      }
      mediaElement.allowFullscreen = true;
      mediaElement.frameBorder = '0';
      mediaElement.allow = 'autoplay; encrypted-media';
      mediaElement.style.width = '100%';
      mediaElement.style.height = '100%';

      const responsiveWrapper = document.createElement('div');
      responsiveWrapper.classList.add('responsive-video');
      responsiveWrapper.appendChild(mediaElement);
      wrapper.appendChild(responsiveWrapper);

    } else if (item.type === 'image') {
      mediaElement = document.createElement('img');
      mediaElement.src = item.src;
      mediaElement.alt = item.description || '';
      mediaElement.style.width = '100%';
      mediaElement.style.height = 'auto';
      wrapper.appendChild(mediaElement);
    }

    // Add click event to open lightbox
    wrapper.addEventListener('click', () => openLightbox(item));

    // Append to the respective section grid
    const sectionGrid = document.querySelector(`.${item.section}-grid`);
    if (sectionGrid) {
      sectionGrid.appendChild(wrapper);
    } else {
      console.warn(`Grid container for section "${item.section}" not found!`);
    }
  });
}

// Function to open the lightbox with selected item
function openLightbox(item) {
  lightboxContent.innerHTML = '';

  let mediaElement;

  if (item.type === 'video') {
    mediaElement = document.createElement('video');
    mediaElement.src = item.src;
    mediaElement.controls = true;
    mediaElement.autoplay = true;
    mediaElement.style.width = '100%';
    mediaElement.style.height = '100%';

    const responsiveWrapper = document.createElement('div');
    responsiveWrapper.classList.add('responsive-video');
    responsiveWrapper.appendChild(mediaElement);
    lightboxContent.appendChild(responsiveWrapper);

  } else if (item.type === 'youtube') {
    mediaElement = document.createElement('iframe');
    mediaElement.src = item.src;
    mediaElement.frameBorder = '0';
    mediaElement.allow = 'autoplay; encrypted-media';
    mediaElement.allowFullscreen = true;
    mediaElement.style.width = '100%';
    mediaElement.style.height = '100%';

    const responsiveWrapper = document.createElement('div');
    responsiveWrapper.classList.add('responsive-video');
    responsiveWrapper.appendChild(mediaElement);
    lightboxContent.appendChild(responsiveWrapper);

  } else if (item.type === 'instagram') {
    mediaElement = document.createElement('iframe');
    mediaElement.src = `https://www.instagram.com/p/${item.src}/embed`;
    mediaElement.frameBorder = '0';
    mediaElement.style.width = '100%';
    mediaElement.style.height = '100%';

    const responsiveWrapper = document.createElement('div');
    responsiveWrapper.classList.add('responsive-video');
    responsiveWrapper.appendChild(mediaElement);
    lightboxContent.appendChild(responsiveWrapper);

  } else if (item.type === 'image') {
    mediaElement = document.createElement('img');
    mediaElement.src = item.src;
    mediaElement.alt = item.description || '';
    mediaElement.style.width = '100%';
    mediaElement.style.height = 'auto';
    lightboxContent.appendChild(mediaElement);
  }

  lightboxDescription.textContent = item.description || 'No description available';
  lightbox.style.display = 'flex';
}

// Populate grids on page load
populateGrids();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const id = this.getAttribute('href').substring(1);
    const target = document.getElementById(id);
    const offset = 50; // adjust as needed

    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});