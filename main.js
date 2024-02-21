const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings  //list of objects/dictionaries
}
const createList = (position, points, driverId, givenName, familyName, nationality, constructorId) => {
    const fullName = givenName + familyName
    const sponsor = constructorId
    const html = `<div id=${driverId} class='card mt-3 mb-3 style="width: 18rem;">
    <ul class='list-group list-group-flush' id=${driverId}>
        <li class='list-group-item'>${position}</li>
        <li class='list-group-item'>${fullName}</li>
        <li class='list-group-item'>${nationality}</li>
        <li class='list-group-item'>${sponsor}</li>
        <li class='list-group-item'>${points}</li>
    </ul>
    </div>
    `
    // searching the DOM for class of .rangers-list and then inserting our html into that div
    document.querySelector(".rangers-list").insertAdjacentHTML('beforeend', html)
}
// Create a function to "load" the data from the API
const loadData = async (season, round) => {
    const f1Racers = await getData(season, round)
    // We want to loop through rangers list of dictionaries and call the createList function for each dictionary. Need to match
    // the parameters of (id, name, color, season, coin) with arguments coming from the dictionaries
    // same as saying 'for ranger in rangers'
    f1Racers.forEach(f1Racer => {
        // const coin = ranger['power-coin'] ? ranger['power-coin'] : ranger['morp-coin']
        createList(f1Racer.position, f1Racer.Driver.givenName, f1Racer.Driver.familyName, f1Racer.Driver.nationality, f1Racer.Driver.sponsor, f1Racer.Driver.points,);
    });
}
// function to clear our data
const clearData = () => {
    document.querySelector(DOMElements['alexsupercoolkey']).innerHTML = ""
}
// Add an event listener on this form
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // two different ways to select something
    // first is if you know attributes from html
    let queryFirst = document.querySelector('season').value
    let queryLast = document.querySelector('round').value
    // if i'm not certain what the html is
    console.log(event)
    let firstName = event.target[0].value
    let lastName = event.target[1].value
    console.log(queryFirst, queryLast)
    console.log(firstName, lastName)
    document.body.append(firstName)
    document.body.append(lastName)
})