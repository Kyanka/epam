const errorP = document.getElementById('error');
const loader = document.getElementById('loader-outer');

function makeHttpGetRequest(url) {

    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if(this.status == 200) {
                resolve(this.response);
            }
            else {
                const error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        }

        xhr.onerror = function() {
            reject(new Error("Network error"));
        }

        xhr.send();
    });
}

function addImageToElement(el, image) {
    const img = document.createElement('img');
    img.classList.add('image');
    img.setAttribute('src', image);
    el.appendChild(img);
}

function loadPictures(quantity) {
    makeHttpGetRequest(`https://randomuser.me/api/?results=${quantity}`)
    .then(
        response => {
            const images = document.getElementById('images');
            const userArray = JSON.parse(response).results;
            
            userArray.forEach(element => {
                const fragment = document.createDocumentFragment();
                addImageToElement(fragment, element.picture.large);
                images.appendChild(fragment);
            });
            
            displayElement(loader, false);
        },
        reject => {
            displayElement(error, true);
            errorP.innerText = (reject.code) ? `${reject} ${reject.code}` : reject;
        }
    )
    .catch(e => errorP.innerText = 'Server error');
}


function displayElement(element, isDisplayed) {
    (isDisplayed) ? element.style.display = 'block' : element.style.display = 'none';
}

window.addEventListener('scroll', function() {
    if (Math.abs(window.scrollY + window.innerHeight - document.getElementById('images').scrollHeight) < 50)
    {
        displayElement(loader, true);
        loadPictures(25);
    }
});

loadPictures(50);