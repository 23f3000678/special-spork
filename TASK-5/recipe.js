const apiKey = "df8e0c1d997148b3a7ada67fdcbbd61d"; 
let ingredients = [];
let recipesData = [];

function addIngredient() {
  const input = document.getElementById("ingredientInput");
  const ingredient = input.value.trim();
  if (ingredient && !ingredients.includes(ingredient)) {
    ingredients.push(ingredient);
    updateIngredientList();
  }
  input.value = "";
}

function removeIngredient(index) {
  ingredients.splice(index, 1);
  updateIngredientList();
}

function updateIngredientList() {
  const list = document.getElementById("ingredientList");
  list.innerHTML = "";
  ingredients.forEach((ingredient, index) => {
    const li = document.createElement("li");
    li.className = "chip";
    li.innerHTML = `${ingredient} <span onclick="removeIngredient(${index})">✖</span>`;
    list.appendChild(li);
  });
}

function findRecipes() {
  if (ingredients.length === 0) {
    alert("Please add at least one ingredient.");
    return;
  }
  const query = ingredients.join(",");
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&apiKey=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      recipesData = data;
      displayRecipes(recipesData);
    })
    .catch((error) => console.error("Error fetching recipes:", error));
}

function displayRecipes(data) {
  const recipeContainer = document.getElementById("recipes");
  recipeContainer.innerHTML = "";
  data.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
      <h3>${recipe.title}</h3>
      <p>Used: ${recipe.usedIngredientCount} | Missing: ${recipe.missedIngredientCount}</p>
      <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-").toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
    `;
    recipeContainer.appendChild(card);
  });
}

function applyFiltersAndSort() {
  let filtered = [...recipesData];

  const filterValue = document.getElementById("filterSelect").value;
  if (filterValue === "missing2") {
    filtered = filtered.filter(r => r.missedIngredientCount <= 2);
  }

  const sortValue = document.getElementById("sortSelect").value;
  if (sortValue === "name") {
    filtered.sort((a,b) => a.title.localeCompare(b.title));
  } else if (sortValue === "used") {
    filtered.sort((a,b) => b.usedIngredientCount - a.usedIngredientCount);
  }

  displayRecipes(filtered);
}

// To-Do List with localStorage
const todoList = document.getElementById("todoList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

function addTask() {
  const input = document.getElementById("todoInput");
  const value = input.value.trim();
  if (!value) return;
  tasks.push(value);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
}

function removeTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    const span = document.createElement("span");
    span.textContent = "✖";
    span.onclick = () => removeTask(index);
    li.appendChild(span);
    todoList.appendChild(li);
  });
}
