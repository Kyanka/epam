const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const altInput = document.getElementById('alt');
const thicknessInput = document.getElementById('thickness');
const redInput = document.getElementById('red');
const greenInput = document.getElementById('green');
const blueInput = document.getElementById('blue');
const img = document.getElementById('image');

function applyParametres() {
    setAllInputsValid();

    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    const alt = altInput.value;
    const thickness = parseInt(thicknessInput.value);
    const red = parseInt(redInput.value);
    const green = parseInt(greenInput.value);
    const blue = parseInt(blueInput.value);

    if (!checkNumber(widthInput, width, 0, 10000)) return;
    if (!checkNumber(heightInput, height, 0, 10000)) return;
    if (!checkNumber(thicknessInput, thickness, 0, 1000)) return;
    if (!checkNumber(redInput, red, 0, 255)) return;
    if (!checkNumber(greenInput, green, 0, 255)) return;
    if (!checkNumber(blueInput, blue, 0, 255)) return;

    img.setAttribute('width', width);
    img.setAttribute('height', height);
    img.setAttribute('alt', alt);
    img.style.border = `${thickness}px solid rgb(${red}, ${green}, ${blue})`
}

function checkNumber(input, number, min = 0, max = 1000) {
    if (!isNaN(number) && (number || number === 0)) {
        if (number >= min && number <= max) {
            return true;
        }
    }
    markInvalid(input);
    return false;
}

function setAllInputsValid() {
    let arr = document.getElementsByClassName('is-invalid');

    Array.from(arr).forEach(el => {
        el.classList.remove('is-invalid');
    });
}

function markInvalid(input) {
    input.classList.add('is-invalid');
}

(function fillParametres() {
    const width = img.getAttribute('width');
    const height = img.getAttribute('height');
    const alt = img.getAttribute('alt');

    redInput.value = 0;
    greenInput.value = 0;
    blueInput.value = 0;
    thicknessInput.value = 0;
    widthInput.value = width;
    heightInput.value = height;
    altInput.value = alt;
})();