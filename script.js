const mediaItems = [
  { type: 'youtube', title: 'Urban Tree Insect Communities', subtitle: "Beaty Biodiversity Museum (2025)", src: 'https://www.youtube.com/embed/s8MvS728gZs?si=m-XtIKuXbPsZY7IY',  section: 'documentary' },
  { type: 'youtube', title: 'Machine Learning & Social Behaviour', subtitle: "Beaty Biodiversity Museum (2025)", src: 'https://www.youtube-nocookie.com/embed/RWLSxyOfkWc?si=p2vjv9KhuCzJwY52', section: 'documentary' },
  { type: 'youtube', title: 'Coffee Shop', subtitle: "Midnight Pancakes Productions (2024)",src: 'https://www.youtube-nocookie.com/embed/h5vNnGchGic?si=nFV16A7bO2-NYu8A', section: 'scripted' },
  { type: 'youtube', title: 'Selective Amnesia | Short Film', subtitle: "Run N' Gun 24 Hour Film Festival (2024)",src: 'https://www.youtube-nocookie.com/embed/lZPTGkBCxlk?si=7HqHskuOw9PgQi9f', section: 'scripted' },
  { type: 'youtube', title: 'Behind The Scenes | Podcast', subtitle: "University of British Columbia (2024)", src: 'https://www.youtube.com/embed/HPZYNsEt-1Y?si=IWtzmrADDdfwN4HX', section: 'podcasts' },
  { type: 'youtube', title: 'Ian Efford & The METEI Expedition | Podcast', subtitle: "Beaty Biodiversity Museum (2024)", src: 'https://www.youtube.com/embed/72gMCxgP2AE?si=t6cSdarAFhtNV-qN', section: 'podcasts' },
]

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active'); // Optional: toggle hamburger animation
});

document.querySelectorAll('#nav-links a').forEach(link => {
link.addEventListener('click', () => {
    navLinks.classList.remove('active');
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

  lightboxDescription.textContent = item.description || 'No description available';
  lightbox.style.display = 'flex';
}

// Initialize
populateGrids();
