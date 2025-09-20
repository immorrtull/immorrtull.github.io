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
      <video class="media" muted autoplay playsinline preload="auto" loop style="max-width: 100%; max-height: 100%;">
        <source src="${item.src}" type="video/mp4">
      </video>
    `;
  } else {
    mediaHTML = `<img class="media" src="${item.src}" alt="" style="max-width: 100%; max-height: 100%;">`;
  }

  wrapper.innerHTML = `
    ${mediaHTML}
    <img class="overlay" src="${overlaySrc}" alt="Overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;">
  `;
  wrapper.style.position = 'relative';
  wrapper.style.cursor = 'pointer';

  wrapper.addEventListener('click', () => {
    openLightbox(item);
  });

  grid.appendChild(wrapper);
});

function openLightbox(item) {
  // Clear existing content
  lightboxContent.innerHTML = '';

  if (item.type === 'video') {
    const video = document.createElement('video');
    video.src = item.src;
    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = '100%';
    video.style.maxHeight = '100%';
    lightboxContent.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    lightboxContent.appendChild(img);
  }

  lightboxDescription.textContent = item.description || '';
  lightbox.style.display = 'flex';
}

lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';

  // Pause any video
  const video = lightboxContent.querySelector('video');
  if (video) {
    video.pause();
  }
});

// Close on background click
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightboxClose.click();
  }
});