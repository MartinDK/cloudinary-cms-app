async function postData(location) {
    messageEl.innerText = `Adding position to nedDB...`;
    messageEl.classList.add('orange');
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
    };
    console.log('Post to DB', location);
    const response = await fetch('/api', options);
    const data = await response.text();
    console.log('response.data:', data);
}
// Create map using leaflet.js and OpenStreetMaps
async function mapLocation(latitude, longitude) {
    console.log('Mapping position...', latitude, longitude);
    const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';

    const mymap = L.map('mapid').setView([latitude, longitude], 16);
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);
    L.marker([latitude, longitude]).addTo(mymap);
    let location = { latitude: latitude, longitude: longitude };
}
// getPos returns a promise with the location using the browsers navigator API
function getPos() {
    console.log('getPos...');
    messageEl.innerText = `Getting position...`;
    messageEl.classList.add('red');
    // return a position with a promise
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('resolving', position);
            resolve(position);
            reject('error!!!');
        });
    });
}

// End of functions
const messageEl = document.getElementById('message');

// getPos returns a promise
getPos()
    .then((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Map position
        mapLocation(latitude, longitude);
        // Post location to 'nedb' database on server (Node.js server via index.js)
        postData({ latitude: latitude, longitude: longitude });

        messageEl.innerText = `Your position ${latitude}°, ${longitude}° is in neDB`;
        messageEl.classList.add('green');

        console.log('Resolved getPos', latitude, longitude);
    })
    .catch((err) => {
        console.log(err);
    });
