let hunger = 50;
let happiness = 50;
let energy = 50;

const hungerDisplay = document.getElementById('hunger');
const happinessDisplay = document.getElementById('happiness');
const energyDisplay = document.getElementById('energy');
const moodDisplay = document.getElementById('mood');
const messageDisplay = document.getElementById('message');

const feedBtn = document.getElementById('feed-btn');
const petBtn = document.getElementById('play-btn');
const sleepBtn = document.getElementById('sleep-btn');

function loadPet() {
    const savedData = localStorage.getItem('petData');
    if (savedData) {
        const data = JSON.parse(savedData);
        hunger = data.hunger;
        happiness = data.happiness;
        energy = data.energy;
    }
    updateDisplay();
}

function savePet() {
    const data = {
        hunger: hunger,
        happiness: happiness,
        energy: energy
    };
    localStorage.setItem('petData', JSON.stringify(data));
}

function clamp(value) {
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
}

function updateDisplay() {
    hungerDisplay.textContent = hunger;
    happinessDisplay.textContent = happiness;
    energyDisplay.textContent = energy;

    let mood = 'Content';
    const average = (hunger + happiness + energy) / 3;

    if (hunger < 20) {
        mood = 'Hungry!';
    } else if (energy < 20) {
        mood = 'Tired!';
    } else if (happiness < 20) {
        mood = 'Sad';
    } else if (average > 70) {
        mood = 'Happy!';
    } else if (average < 30) {
        mood = 'Unhappy';
    }

    moodDisplay.textContent = mood;

    savePet();
}

function showMessage(text) {
    messageDisplay.textContent = text;
}

feedBtn.addEventListener('click', function() {
    hunger = clamp(hunger + 20);
    energy = clamp(energy - 5);
    showMessage('Yum! Your pet enjoyed the food!');
    updateDisplay();
});

petBtn.addEventListener('click', function() {
    happiness = clamp(happiness + 20);
    hunger = clamp(hunger - 10);
    energy = clamp(energy - 15);
    showMessage('Wheee! Your pet had fun playing!');
    updateDisplay();
});

sleepBtn.addEventListener('click', function() {
    energy = clamp(energy + 30);
    hunger = clamp(hunger - 10);
    showMessage('Zzz... Your pet is well rested!');
    updateDisplay();
});

setInterval(function() {
    hunger = clamp(hunger - 2);
    happiness = clamp(happiness - 1);
    energy = clamp(energy - 1);
    updateDisplay();
}, 5000);

loadPet();
