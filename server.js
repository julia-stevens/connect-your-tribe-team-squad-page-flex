import express from 'express'

import { Liquid } from 'liquidjs';

// Vul hier jullie team naam in
const teamName = 'Flex';

const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express()); 

app.set('views', './views')

app.use(express.urlencoded({extended: true}))

const squadResponse = await fetch('https://fdnd.directus.app/items/squad?filter={"_and":[{"cohort":"2425"},{"tribe":{"name":"FDND Jaar 1"}}]}')

const squadResponseJSON = await squadResponse.json()

app.get('/', async function (request, response) {
  const teamResponse = await fetch('https://fdnd.directus.app/items/person/?fields=team&filter[team][_neq]=null&groupBy=team')
  const teamResponseJSON = await teamResponse.json()

  const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=name,avatar,website,team,id&filter=%7B%22_and%22:%5B%7B%22squads%22:%7B%22squad_id%22:%7B%22tribe%22:%7B%22name%22:%22FDND%20Jaar%201%22%7D%7D%7D%7D,%7B%22squads%22:%7B%22squad_id%22:%7B%22cohort%22:%222425%22%7D%7D%7D%5D%7D&sort=birthdate')
  const personResponseJSON = await personResponse.json()

  // maak van elk team item in de teamRepsonseJSON.data een object met team en members 
  const teams = teamResponseJSON.data.map(teamObject => ({ 
    teamName: teamObject.team,
    members: []  
  }));

  // voor elk persoon uit de API
  personResponseJSON.data.forEach(person => {
    if (person.team) { // als persoon een team heeft
      const matchingTeam = teams.find(teamObject => teamObject.teamName === person.team); // zoek naar een match van de team namen
      if (matchingTeam) { // bij een match
        matchingTeam.members.push({ // voeg dit toe aan de members array: name, avatar, website
          name: person.name,
          avatar: person.avatar,
          website: person.website,
          id: person.id
        });
      }
    }
  });

  // console.log(JSON.stringify(teams));

  const messagesResponse = await fetch(`https://fdnd.directus.app/items/messages/?filter={"for":"Team ${teamName}"}`)
  const messagesResponseJSON = await messagesResponse.json()

  response.render('index.liquid', {
    teamName: teamName,
    messages: messagesResponseJSON.data,
    teams
  })
})

app.get('/studenten', async function (request, response) {
  let personResponseJSON

  let personURL = await fetch('https://fdnd.directus.app/items/person/?fields=*,squads.squad_id.name,squads.squad_id.cohort&filter=%7B%22_and%22:%5B%7B%22squads%22:%7B%22squad_id%22:%7B%22tribe%22:%7B%22name%22:%22FDND%20Jaar%201%22%7D%7D%7D%7D,%7B%22squads%22:%7B%22squad_id%22:%7B%22cohort%22:%222425%22%7D%7D%7D%5D%7D&sort=name')

  if (request.query.sort == 'za'){
    const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=*,squads.squad_id.name,squads.squad_id.cohort&filter=%7B%22_and%22:%5B%7B%22squads%22:%7B%22squad_id%22:%7B%22tribe%22:%7B%22name%22:%22FDND%20Jaar%201%22%7D%7D%7D%7D,%7B%22squads%22:%7B%22squad_id%22:%7B%22cohort%22:%222425%22%7D%7D%7D%5D%7D&sort=-name')
    personResponseJSON = await personResponse.json()
  } else if (request.query.sort == 'birthdate'){
    const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=*,squads.squad_id.name,squads.squad_id.cohort&filter=%7B%22_and%22:%5B%7B%22squads%22:%7B%22squad_id%22:%7B%22tribe%22:%7B%22name%22:%22FDND%20Jaar%201%22%7D%7D%7D%7D,%7B%22squads%22:%7B%22squad_id%22:%7B%22cohort%22:%222425%22%7D%7D%7D%5D%7D&sort=birthdate')
    personResponseJSON = await personResponse.json()
  } else {
    const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=*,squads.squad_id.name,squads.squad_id.cohort&filter=%7B%22_and%22:%5B%7B%22squads%22:%7B%22squad_id%22:%7B%22tribe%22:%7B%22name%22:%22FDND%20Jaar%201%22%7D%7D%7D%7D,%7B%22squads%22:%7B%22squad_id%22:%7B%22cohort%22:%222425%22%7D%7D%7D%5D%7D&sort=name')
    personResponseJSON = await personResponse.json()
  }

  response.render('studenten.liquid', {persons: personResponseJSON.data, squads: squadResponseJSON.data})
})

app.get('/student', async function (request, response) {
  const personResponse = await fetch ('https://fdnd.directus.app/items/person/?fields=avatar,name,birthdate,nickname,fav_property&filter=%7B%22_and%22:%5B%7B%22squads%22:%7B%22squad_id%22:%7B%22tribe%22:%7B%22name%22:%22FDND%20Jaar%201%22%7D%7D%7D%7D,%7B%22squads%22:%7B%22squad_id%22:%7B%22cohort%22:%222425%22%7D%7D%7D%5D%7D')
  // En haal daarvan de JSON op
  const personResponseJSON = await personResponse.json()

  response.render('student.liquid', { persons: personResponseJSON.data })
})

app.post('/', async function (request, response) {
  await fetch('https://fdnd.directus.app/items/messages/', {
    method: 'POST',
    body: JSON.stringify({
      for: `Team ${teamName}`,
      from: request.body.from,
      text: request.body.text
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/')
})

app.set('port', process.env.PORT || 8000)

if (teamName == '') {
  console.log('Voeg eerst de naam van jullie team in de code toe.')
} else {
  app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
}