// Media items array
const mediaItems = [
  { type: 'youtube', src: 'https://www.youtube.com/embed/s8MvS728gZs?si=m-XtIKuXbPsZY7IY', description: 'Documentary Video 1', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/qEefOJXaK1A?si=XdOVplP4ODCZhG-Z', description: 'Documentary Video 2', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/RWLSxyOfkWc?si=p2vjv9KhuCzJwY52', description: 'Documentary Video 3', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/h5vNnGchGic?si=nFV16A7bO2-NYu8A', description: 'Scripted Video 1', section: 'scripted' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/lZPTGkBCxlk?si=7HqHskuOw9PgQi9f', description: 'Scripted Video 2', section: 'scripted' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/jK5JKuz_g4c?si=Uuay9HNYGxjpkHMx', description: 'Scripted Video 3', section: 'scripted' },
  { type: 'instagram', src: 'DOBn5qwkTr4', description: 'Instagram Post 1', section: 'socialmedia' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/Zgv74NOQFaY', description: 'Social Media Video 2', section: 'socialmedia', portrait: true },
  { type: 'instagram', src: 'DOg8xA6lPFi', description: 'Instagram Post 2', section: 'socialmedia' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/HPZYNsEt-1Y?si=IWtzmrADDdfwN4HX', description: 'Podcast Video 1', section: 'podcasts' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/72gMCxgP2AE?si=t6cSdarAFhtNV-qN', description: 'Podcast Video 2', section: 'podcasts' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/mmyOswVxgng?si=Gm-dlDfovjvVYcNA', description: 'Podcast Video 3', section: 'podcasts' },
  { type: 'image', src: 'images/Image-1.png', description: 'Multimedia Image 1', section: 'multimedia' },
  { type: 'image', src: 'images/Image-1.png', description: 'Multimedia Image 2', section: 'multimedia' },
  { type: 'image', src: 'images/Image-1.png', description: 'Graphic Design Image', section: 'graphicdesign' },
];

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Activate tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show the corresponding section
    const target = tab.dataset.tab;
    document.querySelectorAll('.work-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(target).classList.add('active');
  });
});

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.getElementById('lightbox-close');

// Close lightbox on close button click or outside click
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.style.display = 'none';
  lightboxContent.innerHTML = '';
}

// Populate media items
function populateGrids() {
  mediaItems.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('grid-item');
    wrapper.style.position = 'relative';
    wrapper.style.cursor = 'pointer';

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

      const responsiveWrapper = createResponsiveWrapper(mediaElement, item);
      wrapper.appendChild(responsiveWrapper);

    } else if (item.type === 'youtube' || item.type === 'streamable' || item.type === 'instagram') {
      mediaElement = document.createElement('iframe');
      mediaElement.src = item.type === 'instagram'
        ? `https://www.instagram.com/p/${item.src}/embed`
        : item.src;
      mediaElement.allowFullscreen = true;
      mediaElement.frameBorder = '0';
      mediaElement.allow = 'autoplay; encrypted-media';
      mediaElement.style.width = '100%';
      mediaElement.style.height = '100%';

      const responsiveWrapper = createResponsiveWrapper(mediaElement, item);
      wrapper.appendChild(responsiveWrapper);

} else if (item.type === 'image') {
  mediaElement = document.createElement('img');
  mediaElement.src = item.src;
  mediaElement.alt = item.description || '';
  mediaElement.style.width = '100%';
  mediaElement.style.height = '100%';
  mediaElement.style.objectFit = 'cover';

  const responsiveWrapper = document.createElement('div');
  responsiveWrapper.classList.add('responsive-video'); // apply 16:9 aspect ratio
  responsiveWrapper.appendChild(mediaElement);
  wrapper.appendChild(responsiveWrapper);
}

    // Lightbox click
    wrapper.addEventListener('click', () => openLightbox(item));

    // Add to correct section
    const sectionGrid = document.querySelector(`.${item.section}-grid`);
    if (sectionGrid) {
      sectionGrid.appendChild(wrapper);
    } else {
      console.warn(`Grid container for section "${item.section}" not found.`);
    }
  });
}

// Create responsive wrapper div, optionally adding portrait class
function createResponsiveWrapper(mediaElement, item) {
  const responsiveWrapper = document.createElement('div');
  responsiveWrapper.classList.add('responsive-video');

  // Apply portrait class if necessary
  if (
    item.section === 'socialmedia' ||
    item.type === 'instagram' ||
    item.portrait === true
  ) {
    responsiveWrapper.classList.add('portrait');
  }

  responsiveWrapper.appendChild(mediaElement);
  return responsiveWrapper;
}

// Open lightbox
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

    const wrapper = createResponsiveWrapper(mediaElement, item);
    lightboxContent.appendChild(wrapper);

  } else if (item.type === 'youtube' || item.type === 'instagram') {
    mediaElement = document.createElement('iframe');
    mediaElement.src = item.type === 'instagram'
      ? `https://www.instagram.com/p/${item.src}/embed`
      : item.src;
    mediaElement.allow = 'autoplay; encrypted-media';
    mediaElement.allowFullscreen = true;
    mediaElement.frameBorder = '0';
    mediaElement.style.width = '100%';
    mediaElement.style.height = '100%';

    const wrapper = createResponsiveWrapper(mediaElement, item);
    lightboxContent.appendChild(wrapper);

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

// Smooth scrolling for in-page anchor links
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

// Initialize
populateGrids();