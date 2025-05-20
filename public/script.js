document.querySelector('.color-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // ⛔️ Prevent full page reload

    const form = event.target;
    const formData = new FormData(form);
    const fav_color = formData.get('fav_color');

    const response = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fav_color })
    });

    if (response.ok) {
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // 🔁 Replace just the sections we care about
        document.querySelector('.favorite-color').innerHTML =
            doc.querySelector('.favorite-color').innerHTML;
        document.querySelector('.json-data').innerHTML =
            doc.querySelector('.json-data').innerHTML;
    } else {
        alert('Fout bij opslaan');
    }
});