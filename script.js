// Can add description, title, subtitle as needed.

const mediaItems = [
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/s8MvS728gZs?si=m-XtIKuXbPsZY7IY', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/RWLSxyOfkWc?si=p2vjv9KhuCzJwY52', section: 'documentary' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/h5vNnGchGic?si=nFV16A7bO2-NYu8A', section: 'scripted' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/lZPTGkBCxlk?si=7HqHskuOw9PgQi9f', section: 'scripted' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/HPZYNsEt-1Y?si=IWtzmrADDdfwN4HX', section: 'podcasts' },
  { type: 'youtube', src: 'https://www.youtube-nocookie.com/embed/72gMCxgP2AE?si=t6cSdarAFhtNV-qN', section: 'podcasts' },

]

// Select elements
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navTitle = document.querySelector('.nav-title');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
  navTitle.classList.toggle('active');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    navTitle.classList.remove('active');
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.getElementById('lightbox-close');

if (lightbox && lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}
function closeLightbox() { lightbox.style.display = 'none'; lightboxContent.innerHTML = ''; }

// Responsive wrapper
function createResponsiveWrapper(mediaElement, item) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('responsive-video');
  if (item.section === 'socialmedia' || item.type === 'instagram' || item.portrait) wrapper.classList.add('portrait');
  wrapper.appendChild(mediaElement);
  return wrapper;
}

// Populate grid
function populateGrids() {
  mediaItems.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('grid-item');
    wrapper.style.cursor = 'pointer';

    let mediaElement;

    if (item.type === 'video') {
      mediaElement = document.createElement('video');
      mediaElement.src = item.src;
      mediaElement.muted = true;
      mediaElement.autoplay = true;
      mediaElement.loop = true;
      mediaElement.playsInline = true;
      mediaElement.preload = 'auto';
    } else if (item.type === 'youtube' || item.type === 'instagram') {
      mediaElement = document.createElement('iframe');
      mediaElement.src = item.type === 'instagram'
        ? `https://www.instagram.com/p/${item.src}/embed/captioned/`
        : item.src;
      mediaElement.allowFullscreen = true;
      mediaElement.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
      mediaElement.frameBorder = '0';
    } else if (item.type === 'image') {
      mediaElement = document.createElement('img');
      mediaElement.src = item.src;
      mediaElement.alt = item.description || '';
    }

    const responsiveWrapper = createResponsiveWrapper(mediaElement, item);
    wrapper.appendChild(responsiveWrapper);

    // Add title and subtitle below media
    const textWrapper = document.createElement('div');
textWrapper.classList.add('media-text');

// Title
if (item.title) {
  const title = document.createElement('h2');
  title.textContent = item.title;
  title.classList.add('media-title');
  textWrapper.appendChild(title);
}

// Subtitle
if (item.subtitle) {
  const subtitle = document.createElement('p');
  subtitle.textContent = item.subtitle;
  subtitle.classList.add('media-subtitle');
  textWrapper.appendChild(subtitle);
}

wrapper.appendChild(textWrapper);

wrapper.addEventListener('click', () => openLightbox(item));

const sectionGrid = document.querySelector('.all-work-grid');
if (sectionGrid) sectionGrid.appendChild(wrapper);
  });
}

// Open lightbox
function openLightbox(item) {
  lightboxContent.innerHTML = '';
  let mediaElement;

  if (item.type === 'youtube' || item.type === 'instagram') {
    mediaElement = document.createElement('iframe');
    mediaElement.src = item.type === 'instagram'
      ? `https://www.instagram.com/p/${item.src}/embed/captioned/`
      : item.src + '?autoplay=1'; // autoplay for YouTube
    mediaElement.allowFullscreen = true;
    mediaElement.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
    mediaElement.frameBorder = '0';
    lightboxContent.appendChild(createResponsiveWrapper(mediaElement, item));
  } else if (item.type === 'image') {
    mediaElement = document.createElement('img');
    mediaElement.src = item.src;
    mediaElement.alt = item.description || '';
    lightboxContent.appendChild(mediaElement);
  }

  lightboxDescription.textContent = item.description || ' ';
  lightbox.style.display = 'flex';
}

// Initialize
populateGrids();
