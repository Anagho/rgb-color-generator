// Get the UI elements
const colorBox = document.querySelector("#color-box");
const changeColorBtn = document.querySelector("#change-color-btn");
const colorCode = document.querySelector("#color-code");
const copyBtn = document.querySelector("#copy-btn");
const copyFeedback = document.querySelector("#copy-feedback");


// Wait for the DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  // function to generate random colors
  function getRandomColors() {
    const colorLetters = "0123456789ABCDEF";
    let color = "#"; // RGB colors always start with a hash

    for (let i = 0; i < 6; i++) {
      color += colorLetters[Math.floor(Math.random() * 16)];
    }

    return color;
  }

  // Function to calculate the brightness of a color
  function getBrightness(hexColor) {
    // Remove the hash at the start if it's there
    hexColor = hexColor.replace("#", "");

    // Parse the R, G, B values - the values are in pair of twos
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);

    // Calculate the brightness using a common formula
    // Brightness formula: (R*299 + G*587 + B*114) / 1000
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  // Function to adjust the text color based on background brightness
  function adjustTextColor(hexColor) {
    const brightness = getBrightness(hexColor);
    if (brightness > 150) {
      // If the color is bright, set text color to black
      colorCode.style.color = "#000000";
    } else {
      // Otherwise, set text color to white
      colorCode.style.color = "#FFFFFF";
    }
  }

  // Function to change the color and text
  function changeColor() {
    // Generate random color
    const newColor = getRandomColors();
    colorBox.style.backgroundColor = newColor;

    // update the displayed RGB color code
    colorCode.innerText = newColor;
    // console.log(newColor)

    // Adjust the text color based on the new background color's brightness
    adjustTextColor(newColor);
  }

  // Function to copy color code to clipboard
  function copyToClipboard(text) {
    // Create a temporary textarea to copy the text
    const textarea = document.createElement("textarea");
    textarea.value = text; // Set its value to the color code
    document.body.appendChild(textarea); // Add it to the page
    textarea.select(); // Select the text
    document.execCommand("copy"); // Copy it to the clipboard
    document.body.removeChild(textarea); // Remove the text area

    // Show feedback message for 1.5 seconds
    copyFeedback.classList.remove("hidden");
    setTimeout(() => {
      copyFeedback.classList.add("hidden");
    }, 1500);
  }

  // Change the color on page load
  changeColor();

  // Event listener to copy color code on button click
  copyBtn.addEventListener("mouseenter", () => {
    copyBtn.innerText = colorCode.innerText
   
  })

  copyBtn.addEventListener("mouseleave", () => {
    copyBtn.innerText = "Copy Code";
    // copyBtn.style.backgroundColor = "#2563eb";
  });


  copyBtn.addEventListener("click", () => {
    copyToClipboard(colorCode.innerText);
  });

  // Change the color on clicking the button
  changeColorBtn.addEventListener("click", changeColor);
});
