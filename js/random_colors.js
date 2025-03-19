let colorChangeInterval;
let countdownInterval; 
let timeLeft = 60;

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeColors() {
    document.documentElement.style.setProperty('--color_1', generateRandomColor());
    document.documentElement.style.setProperty('--color_2', generateRandomColor());
    document.documentElement.style.setProperty('--color_3', generateRandomColor());
    document.documentElement.style.setProperty('--color_4', generateRandomColor());
    document.documentElement.style.setProperty('--color_5', generateRandomColor());
    document.documentElement.style.setProperty('--color_6', generateRandomColor());
    document.documentElement.style.setProperty('--color_7', generateRandomColor());
    document.documentElement.style.setProperty('--color_8', generateRandomColor());
    document.documentElement.style.setProperty('--color_9', generateRandomColor());
}

function countdownTimer() {
    const countdownDisplay = document.getElementById('countdown');

    if (!countdownDisplay) {
       console.error("Countdown element not found!");
       return;
    }

    timeLeft--;

    if (timeLeft <= 0) {
        timeLeft = 60;
        changeColors();
    }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  countdownDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startColorChange() {
    clearInterval(colorChangeInterval);
    clearInterval(countdownInterval); 

    timeLeft = 60;
    changeColors();
    colorChangeInterval = setInterval(changeColors, 60000);
    countdownInterval = setInterval(countdownTimer, 1000);
    countdownTimer();
}

function stopColorChange() {
    clearInterval(colorChangeInterval);
    clearInterval(countdownInterval); 

    const countdownDisplay = document.getElementById('countdown');
    if(countdownDisplay) {
        countdownDisplay.textContent = '';
    }
}

function saveCSS() {
    const rootStyles = getComputedStyle(document.documentElement);
    const color_1 = rootStyles.getPropertyValue('--color_1').trim();
    const color_2 = rootStyles.getPropertyValue('--color_2').trim();
    const color_3 = rootStyles.getPropertyValue('--color_3').trim();
    const color_4 = rootStyles.getPropertyValue('--color_4').trim();
    const color_5 = rootStyles.getPropertyValue('--color_5').trim();
    const color_6 = rootStyles.getPropertyValue('--color_6').trim();
    const color_7 = rootStyles.getPropertyValue('--color_7').trim();
    const color_8 = rootStyles.getPropertyValue('--color_8').trim();
    const color_9 = rootStyles.getPropertyValue('--color_9').trim();

    const cssContent = `
:root {
    --color_1: ${color_1};
    --color_2: ${color_2};
    --color_3: ${color_3};
    --color_4: ${color_4};
    --color_5: ${color_5};
    --color_6: ${color_6};
    --color_7: ${color_7};
    --color_8: ${color_8};
    --color_9: ${color_9};
}
`;

    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-colors.css';
    document.body.appendChild(a); // Required for Firefox
    a.click();
    document.body.removeChild(a); // Clean up
    URL.revokeObjectURL(url); // Clean up
}


// Event Listeners
document.getElementById('startButton').addEventListener('click', startColorChange);
document.getElementById('stopButton').addEventListener('click', stopColorChange);
document.getElementById('saveButton').addEventListener('click', saveCSS);