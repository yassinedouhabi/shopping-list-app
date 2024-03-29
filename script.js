const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function addItem(e) {
  e.preventDefault();

  const itemValue = itemInput.value.trim();
  const newItem = document.createTextNode(itemValue);
  const formError = document.querySelector('.error-message');

  if (itemValue === '') {
    formError.textContent = '** Please enter an item';
    return;
  }

  if (itemValue.length >= 100) {
    formError.textContent = '** Please enter a shorter item (max 100 characters)';
    return;
  }

  // Add new item
  const li = document.createElement('li');
  li.appendChild(newItem);

  let button = createButton('remove-btn btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);
  checkUI();

  itemInput.value = '';
  formError.textContent = '';
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fas fa-trash');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-btn')) {
    if (confirm('Are you sure you want to remove this item?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = document.querySelectorAll('li');

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function checkUI() {
  const items = document.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
