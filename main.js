const form = document.querySelector('#search-form');
// get the form element on the page

const baseUrl = "https://itunes.apple.com/search?term=";

const container = document.querySelector('#artContainer');

const player = document.querySelector("#audio");

const body = document.querySelector('#body')




form.addEventListener('submit', function (event) {
    // listen for the search form being submitted
    event.preventDefault();
    // prevent page from reloading immediately, control when it reloads
    console.log(event.target);
    let term = document.querySelector('#search-text').value;
    console.log(`Search term ${term}`);
    search(term);
});

function search(searchTerm) {
    // put these actions in a function so i can control when they fire
    let searchUrl = `${baseUrl}${searchTerm}`;
    // combine base url with search term from form to get search url
    console.log(searchUrl);
    fetch(searchUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // authorization would go here if we needed it
        // example would be an API key/ password
    })
        .then(function (response) {
            // response is whatever the previous action returns
            // js, when you have a response, then parse that response as json
            console.log("first .then executed")
            return response.json()
        })
        .then(function (data) {
            // data refers to whatever the previous action returned
            // when you have data from the above promise, console log it
            console.log("second .then executed")
            console.log('Here is what we got back from the API', data.results);
            // how to clear results out of the div...
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            buildResultsHtml(data.results);
        });
}

// let behold = document.createElement('h2');
// behold.classList.add('behold')
// behold.innerText = 'BEHOLD';
// body.appendChild(behold);


function buildResultsHtml(resultsArray) {
    for (let result of resultsArray) {

        // overall grouping
        let overallDiv = document.createElement("div");
        overallDiv.classList.add("overallDiv");
        container.appendChild(overallDiv);

        // album artwork from the API
        let albumArtEl = document.createElement("img");
        albumArtEl.classList.add("albumArt");
        albumArtEl.src = `${result.artworkUrl100}`;
        overallDiv.appendChild(albumArtEl);

        // song title from the API
        let songNameEl = document.createElement('p');
        let songNameGroup = document.createElement("div");
        songNameGroup.classList.add("songNameGroup");
        songNameEl.innerText = `Song Title: ${result.trackName}`;
        songNameGroup.appendChild(songNameEl);
        overallDiv.appendChild(songNameGroup);

        // artist name from the API
        let artistEl = document.createElement('p');
        let artistGroup = document.createElement('div');
        artistGroup.classList.add("artistGroup");
        artistEl.innerText = `Artist Name: ${result.artistName}`;
        artistGroup.appendChild(artistEl);
        overallDiv.appendChild(artistGroup);

        // making the player funcional by clicking the album art
        overallDiv.addEventListener('click', function (event) {
            let playSrc = `${result.previewUrl}`;
            console.log(playSrc);
            player.src = playSrc;
        })
    }
}


