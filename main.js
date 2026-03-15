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
