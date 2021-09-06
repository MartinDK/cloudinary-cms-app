getData().then((data) => {
    console.log('GET data', data);
    const dataOutputEl = document.getElementById('data');
    for (item of data) {
        const dataEl = document.createElement('p');
        console.log(item);
        dataEl.innerHTML = `<span class="red">lat</span>:${item.latitude.toFixed(
            2
        )}° <span class="red">lon</span>:${item.longitude.toFixed(
            2
        )}° <span class="red">time</span>:${new Date(
            item.timestamp
        ).toLocaleString()} <span class="red">id</span>:${item._id}`;
        dataOutputEl.appendChild(dataEl);
    }
});

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log('GET data', data);
    return await data;
}
