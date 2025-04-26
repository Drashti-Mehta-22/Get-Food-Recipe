const search = document.getElementById('button');
const foodList = document.getElementById('meal');
const recipeDetails = document.getElementById('r');
const overlay = document.getElementById('overlay');


search.addEventListener('click', getList);
foodList.addEventListener('click', getRecipe);
overlay.addEventListener('click', closeRecipe);

recipeDetails.addEventListener('click', (e) => {
    if (e.target.classList.contains('cross')) {
        recipeDetails.classList.remove('showRecipe');
        closeRecipe();
    }
});

function closeRecipe() {
    recipeDetails.classList.remove('showRecipe');
    overlay.classList.remove('active');
}

async function getList() {
    let inText = document.getElementById('input').value.trim();

    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inText}`).then(response => response.json());

    let html = "";
    if (data.meals) {
        data.meals.forEach(meal => {
            html += `
                <div class="card" data-id = "${meal.idMeal}">
                <div class="img">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="name">
                    <p><b>${meal.strMeal}</b></p>
                    <a class="recipe-btn" href="#">Get recipe</a>
                </div>
            </div>
            `;
        });
    }
    foodList.innerHTML = html;
}

function getRecipe(e) {
    e.preventDefault();

    if (e.target.classList.contains('recipe-btn')) {

        let mealItem = e.target.parentElement.parentElement;

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => recipe(data.meals));
    }
}

function recipe(meal) {
    meal = meal[0];
    let html = `
        <div class="n">
                <p><h1>${meal.strMeal}</h1></p>
                <p class="cross">x</p>
            </div>
            <p>
            ${meal.strInstructions}
            </p>
            
            <img src="${meal.strMealThumb}" alt="">
    `;
    recipeDetails.innerHTML = html;
    recipeDetails.classList.add('showRecipe');
    overlay.classList.add('active');
    console.log('Recipe should be visible now. Class list:', recipeDetails.classList);
}