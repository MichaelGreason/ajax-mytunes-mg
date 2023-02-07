const form = document.querySelector('#search-form');
// get the form element on the page

const baseUrl = "https://itunes.apple.com/search?term="

const container = document.querySelector('#artContainer');

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
            buildResultsHtml(data.results);
        });
}

function buildResultsHtml(resultsArray) {
    for (let result of resultsArray) {
        let artistDiv = document.createElement("div");
        let titleEl = document.createElement('h2');
        titleEl.innerText = result.artistName;
        artistDiv.appendChild(titleEl);
        container.appendChild(artistDiv);

    }


}


