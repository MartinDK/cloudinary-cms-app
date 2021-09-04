async function postData(options, location) {
    console.log('Post to DB', location);
    const response = await fetch('/api', options);
    const data = await response.text();
    console.log('response.data:', data);
}
async function getLocation(myCallback) {
    if ('geolocation' in navigator) {
        console.log('geolocation available');

        let options = {};
        // Using the browsers navigator API
        const coOrds = await navigator.geolocation.getCurrentPosition((position) => {
            console.log('getting locations...');
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
            myCallback(location.latitude, location.longitude);
        });
    } else {
        console.log('geolocation not available');
    }
}
function mapLocation(latitude, longitude) {
    // Create map using leaflet.js and OpenStreetMaps
    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
    const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>';

    console.log(latitude, longitude);

    const mymap = L.map('mapid').setView([latitude, longitude], 16);
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);
    L.marker([latitude, longitude]).addTo(mymap);
    let location = { latitude: latitude, longitude: longitude };
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
    };
    postData(options, { latitude: latitude, longitude: longitude });
}

// Using a mapLocation as a callback function
getLocation(mapLocation);
