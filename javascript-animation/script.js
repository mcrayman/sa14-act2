const myDiv = document.getElementById('myDiv');
const animateButton = document.getElementById('animateButton');

// Set the initial state
let state = {
  position: 0,
  scale: 1,
  rotation: 0,
  colorIndex: 0,
};

const colors = ['blue', 'green', 'red', 'purple', 'orange'];

// Function to animate the <div>
function animateDiv() {
  // Update state for each animation frame
  state.position = state.position === 0 ? 800 : 0; // Toggle position
  state.rotation = (state.rotation + 360) % 360; // Rotate
  state.colorIndex = (state.colorIndex + 1) % colors.length; // Change color

  // Update <div> styles
  myDiv.style.transition = 'transform 2s ease-in-out, background-color 2s ease-in-out';
  myDiv.style.transform = `translateX(${state.position}px) rotate(${state.rotation}deg)`;
  myDiv.style.backgroundColor = colors[state.colorIndex];
}

// Add click event listener to the animate button
animateButton.addEventListener('click', animateDiv);
