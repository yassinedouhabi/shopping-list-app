const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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

  const button = createButton('remove-btn btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);

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

itemForm.addEventListener('submit', addItem);
