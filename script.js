const clickText = document.getElementById('clickText');
const arrowContainer = document.getElementById('arrowContainer');

// Function to toggle text on click for mobile devices
const toggleText = () => {
  if (clickText.textContent === 'Click the ball 😊') {
    clickText.textContent = 'Not Me 😊😊';
  } else {
    clickText.textContent = 'Click the ball 😊';
  }
};

// Add event listeners based on device type
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  arrowContainer.addEventListener('click', toggleText);
} else {
  // For non-mobile devices, use hover as before
  arrowContainer.addEventListener('mouseover', toggleText);
  arrowContainer.addEventListener('mouseout', toggleText);
}