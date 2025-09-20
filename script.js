const mediaItems = [
  { type: 'video', src: 'video.mp4', description: 'This is the first video description.'},
  { type: 'image', src: 'images/Image-1.png', description: 'This is the first image description.' },
  { type: 'video', src: 'video2.mp4', description: 'This is the second video description.' },
  { type: 'image', src: 'images/Image-2.png', description: 'This is the second image description.' },
];

const overlaySrc = 'images/imageframe.png';
const grid = document.getElementById('grid');

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.getElementById('lightbox-close');

mediaItems.forEach(item => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('grid-item');

  let mediaHTML = '';

  if (item.type === 'video') {
    mediaHTML = `
      <video class="media" muted autoplay playsinline preload="auto" loop>
        <source src="${item.src}" type="video/mp4">
      </video>
    `;
  } else {
    mediaHTML = `<img class="media" src="${item.src}" alt="">`;
  }

  wrapper.innerHTML = `
    ${mediaHTML}
    <img class="overlay" src="${overlaySrc}" alt="Overlay">
  `;

  wrapper.addEventListener('click', () => {
    openLightbox(item);
  });

  grid.appendChild(wrapper);
});

function openLightbox(item) {
  // Remove existing media inside lightbox content
  lightboxContent.querySelectorAll('video, img').forEach(el => el.remove());

  if (item.type === 'video') {
    const video = document.createElement('video');
    video.src = item.src;
    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = '100%';
    video.style.maxHeight = '100%';
    lightboxContent.insertBefore(video, lightboxDescription);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    lightboxContent.insertBefore(img, lightboxDescription);
  }

  // Show description text
  lightboxDescription.textContent = item.description || '';

  // Show lightbox
  lightbox.style.display = 'flex';
}

lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';

  // Pause video if any
  const video = lightboxContent.querySelector('video');
  if (video) {
    video.pause();
  }
});

// Also close lightbox if you click outside the content
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightboxClose.click();
  }
});