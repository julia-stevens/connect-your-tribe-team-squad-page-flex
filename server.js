import express from 'express'

import { Liquid } from 'liquidjs';

// Vul hier jullie team naam in
// const teamName = 'Flex';

const app = express()

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

app.use(express.urlencoded({ extended: true }))

const squadResponse = await fetch('https://fdnd.directus.app/items/squad?filter={"_and":[{"cohort":"2425"},{"tribe":{"name":"FDND Jaar 1"}}]}')

const squadResponseJSON = await squadResponse.json()

const teamLinksRepo = { // alle links naar repo's van teams
  Awesome:"https://github.com/misspastelwitch/connect-your-tribe-team-squad-page",
  Blaze:"https://github.com/Mikiyas-hs/connect-your-tribe-team-squad-page",
  Chill:"https://github.com/KyanTG/connect-your-tribe-team-squad-page",
  Cool:"https://github.com/saschavanvliet/connect-your-tribe-team-squad-page",
  Epic:"https://github.com/halie404/connect-your-tribe-team-squad-page",
  Flex:"https://github.com/julia-stevens/connect-your-tribe-team-squad-page-flex",
  Flux:"https://github.com/kimnikitaschijf/connect-your-tribe-team-squad-page",
  Hype:"https://github.com/Naddybsx/connect-your-tribe-team-squad-page",
  Peak:"https://github.com/irisvw/connect-your-tribe-team-squad-page",
  Rad:"https://github.com/SuleymanHG/connect-your-tribe-team-squad-page",
  Rocket:"https://github.com/fdnd-task/connect-your-tribe-team-squad-page",
  Spirit:"https://github.com/Sebastiaan-hva/connect-your-tribe-team-squad-page",
  Storm:"https://github.com/Brancovanbeek/connect-your-tribe-team-squad-page",
  Zen:"https://github.com/Ravirkt/connect-your-tribe-team-squad-page"
}

const teamLinksSite = { // alle links naar live websites
  Awesome:"https://connect-your-tribe-team-squad-page.onrender.com/",
  Blaze:"",
  Chill:"https://connect-your-tribe-team-squad-page-9ofu.onrender.com/",
  Cool:"https://connect-your-tribe-team-squad-page-0i5a.onrender.com/",
  Epic:"https://connect-your-tribe-team-squad-page-u0rc.onrender.com/",
  Flex:"https://connect-your-tribe-team-squad-page-flex.onrender.com",
  Flux:"https://connect-your-tribe-team-squad-page-fwmf.onrender.com/",
  Hype:"https://connect-your-tribe-team-squad-page-72f1.onrender.com/login",
  Peak:"https://connect-your-tribe-team-squad-page-apxc.onrender.com/",
  Rad:"https://connect-your-tribe-team-squad-page-uko4.onrender.com/",
  Rocket:"https://programma.fdnd.nl/",
  Spirit:"https://connect-your-tribe-team-squad-page-kb0l.onrender.com/",
  Storm:"",
  Zen:"https://connect-your-tribe-team-squad-page-tl10.onrender.com/"
}

app.get('/', async function (request, response) {
  const teamResponse = await fetch('https://fdnd.directus.app/items/person/?fields=team&filter[team][_neq]=null&groupBy=team') // haal alle teams op
  const teamResponseJSON = await teamResponse.json()

  const personResponse = await fetch('https://fdnd.directus.app/items/person/?fields=name,avatar,website,team,id&filter=%7B%22_and%22:%5B%7B%22squads%22:%7B%22squad_id%22:%7B%22tribe%22:%7B%22name%22:%22FDND%20Jaar%201%22%7D%7D%7D%7D,%7B%22squads%22:%7B%22squad_id%22:%7B%22cohort%22:%222425%22%7D%7D%7D%5D%7D&sort=birthdate') // haal alle personen op: naam, avatar, website, team, id
  const personResponseJSON = await personResponse.json()

  // maak van elk team item in de teamRepsonseJSON.data een object met team en members 
  let teams = teamResponseJSON.data.map(teamObject => ({
    teamName: teamObject.team,
    members: [],
    linkSite: teamLinksSite[teamObject.team],
    linkRepo: teamLinksRepo[teamObject.team]
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

  const messagesResponse = await fetch(`https://fdnd.directus.app/items/messages/?sort=-created&filter[for][_starts_with]=Team%20Flex%20%2F%20Rating%20for`) // haal alle berichten op met 'Team Flex / Rating for'
  const messagesResponseJSON = await messagesResponse.json()

  const messages = messagesResponseJSON.data;
  teams.forEach(team => { // loop door de teams
    const ratings = messages.filter((a) => a.for === `Team Flex / Rating for Team ${team.teamName}`); // filter alle berichten per team en stop in nieuwe array (ratings)
    let rating = 0;

    if (ratings.length !== 0) { // als er ratings zijn
      rating = 0
      ratings.forEach((r) => {
        rating += parseInt(r.text); // zet om naar int en tel op (want ratings zijn strings)
      })
      rating /= ratings.length; // reken remiddelde uit (totaal ratings delen door aantal)
    };

    team.rating = rating.toFixed(1); // 1 decimaal achter komma
  })

  // sort ratings highest to lowest
  teams = teams.sort((a, b) => b.rating - a.rating); 

  // console.log(teams)

  response.render('index.liquid', {
    // teamName: teamName,
    messages: messagesResponseJSON.data,
    teams,
  })
})

app.post('/', async function (request, response) {
  await fetch('https://fdnd.directus.app/items/messages/?sort=-created&filter[for][_starts_with]=Team%20Flex%20%2F%20Rating%20for', {
    method: 'POST',
    body: JSON.stringify({
      for: request.body.teamID,
      text: request.body.ratingInput
    }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  });

  response.redirect(303, '/')
})

app.get('/studenten', async function (request, response) {
  let personResponseJSON

  // let personURL = await fetch('https://fdnd.directus.app/items/person/?fields=*,squads.squad_id.name,squads.squad_id.cohort&filter=%7B%22_and%22:%5B%7B%22squads%22:%7B%22squad_id%22:%7B%22tribe%22:%7B%22name%22:%22FDND%20Jaar%201%22%7D%7D%7D%7D,%7B%22squads%22:%7B%22squad_id%22:%7B%22cohort%22:%222425%22%7D%7D%7D%5D%7D&sort=name')

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
  const personResponse = await fetch ('https://fdnd.directus.app/items/person/?fields=avatar,name,birthdate,nickname,github_handle,fav_property&filter=%7B%22_and%22:%5B%7B%22squads%22:%7B%22squad_id%22:%7B%22tribe%22:%7B%22name%22:%22FDND%20Jaar%201%22%7D%7D%7D%7D,%7B%22squads%22:%7B%22squad_id%22:%7B%22cohort%22:%222425%22%7D%7D%7D%5D%7D')
  
  const personResponseJSON = await personResponse.json()

  response.render('student.liquid', { persons: personResponseJSON.data })
})

app.get('/student/:id', async function (request, response) {
  const personId = request.params.id;
  
  const personIdResponse = await fetch(`https://fdnd.directus.app/items/person/${personId}?fields=name,id,avatar,birthdate,nickname,fav_property,github_handle`);
  const personIdResponseJSON = await personIdResponse.json();
  
  response.render('student.liquid', { person: personIdResponseJSON.data });
});

app.get('/admin', async function (request, response){
  response.render('admin.liquid')
})

app.post('/admin', async function (request, response) {
    const getMessages = await fetch('https://fdnd.directus.app/items/messages/?filter[for][_starts_with]=Team%20Flex%20%2F%20Rating%20for');
    const getMessagesJSON = await getMessages.json(); 

    if (getMessagesJSON.data && getMessagesJSON.data.length > 0) {
      for (const message of getMessagesJSON.data) {
        await fetch(`https://fdnd.directus.app/items/messages/${message.id}`, {
          method: 'DELETE',
        });
      }
    }
    response.redirect(303, '/');
});

app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
