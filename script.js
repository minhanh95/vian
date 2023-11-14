const clickText = document.getElementById('clickText');
clickText.addEventListener('mouseover', () => {
  clickText.textContent = 'Not Me 😊😊';
});

clickText.addEventListener('mouseout', () => {
  clickText.textContent = 'Click the ball 😊';
});