const search = document.querySelector('#search');
const form = document.querySelector('.search-form');
const container = document.querySelector('.container');
const APIURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';



const getDrinks = async (drink) => {

    try {
    const { data } = await axios(APIURL + drink);

    createDrinkCard(data);
    }catch(err) {
        createErrorCard('Hmm, we couldn\'t find that')
        // console.log('error1')
    }
}



//from https://stackoverflow.com/questions/22203463replace-null-values-to-empty-values-in-a-json-object
//courtesy of akshay  https://stackoverflow.com/a/38097432
//SLIGHTLY modified
//-------------------------------------------------------------------------------
const removeEmptyOrNull = function ( target ) {
    Object.keys( target ).map( function ( key ) {
      if ( target[ key ] instanceof Object ) {
        if ( ! Object.keys( target[ key ] ).length && typeof target[ key] !== 'function') {
          target[ key ] = "";
        }
        else {
          removeEmptyOrNull( target[ key ] );
        }
      }
      else if ( target[ key ] === null ) {
         target[ key ] = "";
      }
    } );
    return target;
  };
//------------------------------------------------------------------------------

    
function createDrinkCard(data) {
    newData = removeEmptyOrNull(data)

    newData.drinks.forEach((drink) =>{
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        
        cardEl.innerHTML = `
            <div class="card-top">
                <button class="close"><i class="far fa-times-circle"></i></button>
                    <div class="image">
                        <img src="${drink.strDrinkThumb}/preview" alt="${drink.strDrink}">
                    </div>
                    <div class="drink-info">
                        <h3>${drink.strDrink}</h3>
                        <div class="ingredient-list">
                            <ul class="meas">
                                <li>${drink.strMeasure1}</li>
                                <li>${drink.strMeasure2}</li>
                                <li>${drink.strMeasure3}</li>
                                <li>${drink.strMeasure4}</li>
                                <li>${drink.strMeasure5}</li>
                                <li>${drink.strMeasure6}</li>
                                <li>${drink.strMeasure7}</li>
                                <li>${drink.strMeasure8}</li>
                                <li>${drink.strMeasure9}</li>
                                <li>${drink.strMeasure10}</li>
                            </ul>
                            <ul class="ing">
                                <li>${drink.strIngredient1}</li>
                                <li>${drink.strIngredient2}</li>
                                <li>${drink.strIngredient3}</li>
                                <li>${drink.strIngredient4}</li>
                                <li>${drink.strIngredient5}</li>
                                <li>${drink.strIngredient6}</li>
                                <li>${drink.strIngredient7}</li>
                                <li>${drink.strIngredient8}</li>
                                <li>${drink.strIngredient9}</li>
                                <li>${drink.strIngredient10}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p class="howto">${drink.strInstructions}</p>
                <button class="toggle">
                    <i class="fas fa-caret-down"></i>
                </button>
            </div>
        `
        

         
        container.appendChild(cardEl);
        
    } )

    document.querySelectorAll('.card').forEach((card) => card.addEventListener('click', (e) => {
        const toggleBtn = e.target.parentNode;
        const closeBtn = e.target.parentNode;

        if(toggleBtn && toggleBtn.matches('.toggle')) {
            toggleBtn.parentNode.classList.toggle('expand');
            
        }else if(closeBtn && closeBtn.matches('.close')) {
            container.removeChild(card);
            
        }

        }))
     
    }

function createErrorCard(msg) {
    const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        
        cardEl.innerHTML = `<h1>${msg}</h1>`
        // console.log('error2')
}    

    

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const drink = search.value;

    if(drink) {
        getDrinks(drink);
        search.value = '';
    }    
})