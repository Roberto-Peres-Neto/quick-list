// script.js

const form = document.getElementById('form');
const itemInput = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');
const alertBox = document.getElementById('alert');
const closeAlert = document.getElementById('closeAlert');
const deleteSelectedBtn = document.getElementById('deleteSelected');

function showAlert() {
  alertBox.classList.remove('hidden');
  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 3000);
}

function updateItemNumbers() {
  const items = itemList.querySelectorAll('li');
  items.forEach((item, index) => {
    const numberSpan = item.querySelector('.item-number');
    if (numberSpan) {
      numberSpan.textContent = `${index + 1}.`;
    }
  });
}

function updateDeleteSelectedVisibility() {
  const checkboxes = document.querySelectorAll('.item-checkbox:checked');
  deleteSelectedBtn.classList.toggle('hidden', checkboxes.length === 0);
}

function createItemElement(text) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('item-checkbox');
  checkbox.addEventListener('change', updateDeleteSelectedVisibility);

  const numberSpan = document.createElement('span');
  numberSpan.classList.add('item-number');
  numberSpan.style.marginRight = '0.5rem';

  const span = document.createElement('span');
  span.textContent = text;
  span.classList.add('item-text');

  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = '🗑️';
  removeBtn.onclick = () => {
    li.remove();
    updateItemNumbers();
    showAlert();
    updateDeleteSelectedVisibility();
  };

  li.appendChild(checkbox);
  li.appendChild(numberSpan);
  li.appendChild(span);
  li.appendChild(removeBtn);

  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = itemInput.value.trim();
  if (value !== '') {
    const item = createItemElement(value);
    itemList.appendChild(item);
    itemInput.value = '';
    updateItemNumbers();
    updateDeleteSelectedVisibility();
  }
});

closeAlert.addEventListener('click', () => {
  alertBox.classList.add('hidden');
});

deleteSelectedBtn.addEventListener('click', () => {
  const selected = document.querySelectorAll('.item-checkbox:checked');
  selected.forEach((checkbox) => {
    checkbox.closest('li').remove();
  });
  showAlert();
  updateItemNumbers();
  updateDeleteSelectedVisibility();
});
