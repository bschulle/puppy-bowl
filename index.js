// State
const state = {
  allPuppies: [],
}
// DOM Selectors
const main = document.querySelector('main');

//
const getAllPuppies = async() => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2410-ftv-mt-web-pt/players`)
  const puppies = await response.json();
  state.allPuppies = puppies.data.players;

  renderPuppies();
}


const renderPuppies = () => {
  const puppyLIs = state.allPuppies.map((puppy) =>{
    return `<li>${puppy.name}</li>`;
  });
  // 
  main.innerHTML = `
    <ol>
    ${puppyLIs.join(``)}
    </ol>
  `;
  
  const ol = document.querySelector('ol');
  ol.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI'){
      renderSinglePuppy(event.target.innerText);
      
    }
    
  });
    
}

const renderSinglePuppy = (clickedPuppy) => {
  const foundPuppy =state.allPuppies.find((puppy) => {
    return puppy.name === clickedPuppy
  });
  
  const html = `
    <h2>${clickedPuppy}</h2>
    <h3>${foundPuppy.breed}</h3>
    <img src= "${foundPuppy.imageUrl}" alt="puppy" />

    <button>Back</button>
  `;

  main.innerHTML = html;

  const backButton = document.querySelector('button');
  backButton.addEventListener(`click`, renderPuppies);
}
 

getAllPuppies();
