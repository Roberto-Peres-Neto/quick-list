// script.js

const form = document.getElementById('form');
const itemInput = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');
const alertBox = document.getElementById('alert');
const closeAlert = document.getElementById('closeAlert');
const deleteSelectedBtn = document.getElementById('deleteSelected');
const searchInput = document.getElementById('searchInput');
const exportBtn = document.getElementById('exportList');

function showAlert(message = 'O item foi removido da lista') {
  alertBox.querySelector('span').textContent = message;
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

function saveItems() {
  const items = [];
  itemList.querySelectorAll('li').forEach((li) => {
    const text = li.querySelector('.item-text').textContent;
    const done = li.classList.contains('done');
    items.push({ text, done });
  });
  localStorage.setItem('shoppingList', JSON.stringify(items));
}

function loadItems() {
  const saved = JSON.parse(localStorage.getItem('shoppingList')) || [];
  saved.forEach(({ text, done }) => {
    const item = createItemElement(text, done);
    itemList.appendChild(item);
  });
  updateItemNumbers();
  updateDeleteSelectedVisibility();
}

function createItemElement(text, done = false) {
  const li = document.createElement('li');
  if (done) li.classList.add('done');

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
  span.style.cursor = 'pointer';
  span.onclick = () => {
    li.classList.toggle('done');
    saveItems();
  };

  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = '🗑️';
  removeBtn.onclick = () => {
    if (confirm('Tem certeza que deseja remover este item?')) {
      li.remove();
      updateItemNumbers();
      showAlert();
      updateDeleteSelectedVisibility();
      saveItems();
    }
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
    saveItems();
  }
});

closeAlert.addEventListener('click', () => {
  alertBox.classList.add('hidden');
});

deleteSelectedBtn.addEventListener('click', () => {
  if (confirm('Deseja excluir os itens selecionados?')) {
    const selected = document.querySelectorAll('.item-checkbox:checked');
    selected.forEach((checkbox) => {
      checkbox.closest('li').remove();
    });
    showAlert('Itens removidos da lista');
    updateItemNumbers();
    updateDeleteSelectedVisibility();
    saveItems();
  }
});

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const items = itemList.querySelectorAll('li');
  items.forEach((li) => {
    const text = li.querySelector('.item-text').textContent.toLowerCase();
    li.style.display = text.includes(filter) ? '' : 'none';
  });
});

exportBtn.addEventListener('click', () => {
  const items = Array.from(itemList.querySelectorAll('li')).map((li) => li.querySelector('.item-text').textContent);
  const text = items.map((item, i) => `${i + 1}. ${item}`).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    showAlert('Lista copiada para a área de transferência');
  });
});

loadItems();
