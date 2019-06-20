//Input/button functionality
var input = document.querySelector('form');
var search = document.querySelector('input')
var button = document.querySelector('button');

button.addEventListener('click', function(e) {
  e.preventDefault();
  input.classList.toggle('active');
});

search.addEventListener('focus', function() {
  input.classList.add('focus');
});

search.addEventListener('blur', function() {
  search.value.length != 0 ? input.classList.add('focus') : input.classList.remove('focus');
});

//Data-source
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data)); 
    
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regEx = new RegExp(wordToMatch, 'gi');
    return place.city.match(regEx) || place.state.match(regEx);
  });
}

//Adds commas in the population number
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const MatchArray = findMatches(this.value, cities);
  const html = MatchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`);
    return `
    <li>
      <span>${cityName}, ${stateName}</span>
      <span>${numberWithCommas(place.population)}</span>
    </li>`;
  }).join('');
  if(this.value) {
    suggestions.innerHTML = html;
  } else {
    suggestions.innerHTML = "";
  }
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);