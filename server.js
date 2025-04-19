// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal data op uit de FDND API, ga pas verder als de data gedownload is
const data = await fetchJson('https://fdnd.directus.app/items/person/53')
// console.log(data); // uncomment om de opgehaalde data te checken

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')
// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))


// Maak een GET route voor de index
app.get('/', async function (request, response) {
  const data = await fetchJson('https://fdnd.directus.app/items/person/53')
  response.render('index', data)
})



app.post('/', async function (request, response) {
  const newColor = request.body.fav_color;

  // Save the color change
  await fetch('https://fdnd.directus.app/items/person/53', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fav_color: newColor }),
  });

  const updatedData = await fetchJson('https://fdnd.directus.app/items/person/53');
  response.render('index', updatedData);
});



// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
