const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

document.getElementById('search-button').addEventListener('click', () => {
            const query = document.getElementById('search-box').value.trim();
            fetchRecipes(query);
        });

        async function fetchRecipes(query) {
            try {
                const response = await fetch(`${API_URL}${query}`);
                const data = await response.json();

                displayRecipes(data.meals);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        }

        function displayRecipes(recipes) {
            const container = document.getElementById('recipes-container');
            container.innerHTML = '';

            if (!recipes) {
                container.innerHTML = '<p>No recipes found. Try another search!</p>';
                return;
            }

            recipes.forEach(recipe => {
                const card = document.createElement('div');
                card.className = 'recipe-card';
                card.innerHTML = `
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                    <div class="recipe-info">
                        <h3>${recipe.strMeal}</h3>
                        <p>${recipe.strArea} Cuisine</p>
                    </div>
                `;

                card.addEventListener('click', () => {
                    showRecipeDetails(recipe);
                });

                container.appendChild(card);
            });
        }

        function showRecipeDetails(recipe) {
            const modal = document.getElementById('recipe-modal');
            document.getElementById('recipe-title').textContent = recipe.strMeal;

            const ingredientsList = document.getElementById('recipe-ingredients');
            ingredientsList.innerHTML = '';
            for (let i = 1; i <= 20; i++) {
                const ingredient = recipe[`strIngredient${i}`];
                const measure = recipe[`strMeasure${i}`];

                if (ingredient) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${measure} ${ingredient}`;
                    ingredientsList.appendChild(listItem);
                }
            }

            document.getElementById('recipe-instructions').textContent = recipe.strInstructions;

            modal.style.display = 'flex';
        }

        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('recipe-modal').style.display = 'none';
        });

        // Fetch default recipes on load
        fetchRecipes('');
