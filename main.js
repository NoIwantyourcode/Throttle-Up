// Paper plane follows the cursor
const plane = document.createElement('div');
plane.className = 'cursor-plane';
document.body.appendChild(plane);

let lastX = 0;
let lastY = 0;

window.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;

  if (lastX === 0 && lastY === 0) {
    lastX = x;
    lastY = y;
  }

  const dx = x - lastX;
  const dy = y - lastY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  plane.style.transform = `translate3d(${x + 18}px, ${y + 18}px, 0) rotate(${angle}deg)`;
  lastX = x;
  lastY = y;
});

window.addEventListener('mouseout', () => {
  plane.style.opacity = '0';
});

window.addEventListener('mouseover', () => {
  plane.style.opacity = '1';
});

// Remove white background from step images
function removeWhiteBackground(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // If pixel is white (or near white), make transparent
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0; // alpha to 0
    }
  }
  ctx.putImageData(imageData, 0, 0);
  img.src = canvas.toDataURL();
}

document.querySelectorAll('.step-media img').forEach(img => {
  if (img.complete) {
    removeWhiteBackground(img);
  } else {
    img.addEventListener('load', () => removeWhiteBackground(img));
  }
});
