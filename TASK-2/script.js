
function toggleForm() {
  const popup = document.getElementById("contactPopup");
  popup.classList.toggle("show");
}


window.addEventListener("click", function(event) {
  const popup = document.getElementById("contactPopup");
  const button = document.querySelector(".contact-button");

  if (popup.classList.contains("show") &&
      !popup.contains(event.target) &&
      !button.contains(event.target)) {
    popup.classList.remove("show");
  }
});


function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  alert("Thank you! Your message has been sent.");
  toggleForm();
}


function adjustContactButton() {
  const button = document.querySelector(".contact-button");
  const footer = document.querySelector("footer");

  if (!button || !footer) return;

  const footerRect = footer.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (footerRect.top < windowHeight - 70) {
    
    button.style.bottom = (windowHeight - footerRect.top + 20) + "px";
  } else {
    
    button.style.bottom = "80px";
  }
}


window.addEventListener("scroll", adjustContactButton);
window.addEventListener("resize", adjustContactButton);


let userIngredients = localStorage.getItem('userIngredients')?.split(',') || [];

const allRecipes = [
  { name: '🍝 Pasta', ingredients: ['pasta', 'tomato', 'cheese'] },
  { name: '🥗 Salad', ingredients: ['lettuce', 'tomato', 'cucumber'] },
  { name: '🍕 Pizza', ingredients: ['dough', 'cheese', 'tomato'] },
  { name: '🍲 Soup', ingredients: ['carrot', 'onion', 'celery'] },
  { name: '🌮 Tacos', ingredients: ['taco shell', 'chicken', 'cheese'] }
];

const recipeGrid = document.getElementById('recipeGrid');
function displayRecipes() {
  recipeGrid.innerHTML = '';

  let found = false;
  allRecipes.forEach(recipe => {
    const match = recipe.ingredients.some(i => userIngredients.includes(i.toLowerCase()));
    if (match || userIngredients.length === 0) {
      found = true;
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <p>${recipe.name}</p>
      `;
      recipeGrid.appendChild(card);
    }
  });

  if (!found) {
    recipeGrid.innerHTML = '<p>No recipes found. Try adding more ingredients!</p>';
  }
}



function addIngredient() {
  const input = document.getElementById('ingredientsInput');
  const ingredient = input.value.trim().toLowerCase();
  if (ingredient && !userIngredients.includes(ingredient)) {
    userIngredients.push(ingredient);
    input.value = '';
    displayRecipes();
  }
}


displayRecipes();



function addTask() {
  const input = document.getElementById('todoInput');
  const value = input.value.trim();
  if (!value) return;

  const li = document.createElement('li');
  li.textContent = value;

  const span = document.createElement('span');
  span.textContent = '✖';
  span.onclick = () => li.remove();

  li.appendChild(span);
  document.getElementById('todoList').appendChild(li);
  input.value = '';
}
const userIngredientsGrid = document.getElementById('userIngredientsGrid');

function displayUserIngredients() {
  if (!userIngredientsGrid) return;
  userIngredientsGrid.innerHTML = '';

  userIngredients.forEach(ingredient => {
    const card = document.createElement('div');
    card.className = 'user-ingredient-card';
    card.textContent = ingredient;
    userIngredientsGrid.appendChild(card);
  });
}

function addIngredient() {
  const input = document.getElementById('ingredientsInput');
  const ingredient = input.value.trim().toLowerCase();
  if (ingredient && !userIngredients.includes(ingredient)) {
    userIngredients.push(ingredient);
    input.value = '';
    displayUserIngredients(); 
    displayRecipes(); 
  }
}


displayUserIngredients();
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function renderTasks() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed || false;

    const label = document.createElement('span');
    label.textContent = task.text || task;
    if (checkbox.checked) {
      label.style.textDecoration = 'line-through';
      label.style.color = '#777';
    }

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
        label.style.color = '#777';
      } else {
        label.style.textDecoration = 'none';
        label.style.color = '#333';
      }
      
      tasks[index].completed = checkbox.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('todoInput');
  const value = input.value.trim();
  if (!value) return;

  const li = document.createElement('li');


  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  
  const label = document.createElement('span');
  label.textContent = value;

 
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      label.style.textDecoration = 'line-through';
      label.style.color = '#777';
    } else {
      label.style.textDecoration = 'none';
      label.style.color = '#333';
    }
  });

  li.appendChild(checkbox);
  li.appendChild(label);
  document.getElementById('todoList').appendChild(li);

  input.value = '';
}



