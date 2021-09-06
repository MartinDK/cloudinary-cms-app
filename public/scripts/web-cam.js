let imageBase64 = 'empty';
function setup() {
    // const videoEl = document.getElementById('video');
    // remove canvas from page
    noCanvas();
    // capture video
    const video = createCapture(VIDEO);
    // load video image onto canvas
    video.size(320, 240);
    const button = document.getElementById('submit');
    button.addEventListener('click', async (event) => {
        video.loadPixels();
        imageBase64 = video.canvas.toDataURL();
        // convert video image to base64
        const imageEL = document.createElement('img');
        const bodyEl = document.getElementById('test');
        clicked();
        imageEL.src = imageBase64;
        bodyEl.appendChild(imageEL);
    });
}
// getPos returns a promise with the location using the browsers navigator API
function getPos() {
    console.log('getPos...');
    // return a position with a promise
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve(position);
            reject('error!!!');
        });
    });
}
async function postData(inputData) {
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
    };
    console.log('Post to DB', inputData);

    const response = await fetch('/api', options);
    const data = await response.text();
    console.log(data);
}
function clicked() {
    const positionEl = document.getElementById('position');
    const inputEl = document.getElementById('message');
    const message = inputEl.value;
    inputEl.value = '';
    console.log('click', imageBase64);
    getPos()
        .then((position) => {
            console.log('message', imageBase64);
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            postData({
                latitude: latitude,
                longitude: longitude,
                message: message,
                image: imageBase64,
            });

            positionEl.innerText = `Your position ${latitude}°, ${longitude}° has been added to database.db`;
            positionEl.classList.add('green');
        })
        .catch((err) => {
            console.log(err);
        });
}
