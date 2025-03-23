const form = document.getElementById('form');
const itemInput = document.getElementById('itemInput');
const itemList = document.getElementById('itemList');
const alertBox = document.getElementById('alert');
const closeAlert = document.getElementById('closeAlert');

function showAlert() {
  alertBox.classList.remove('hidden');
  setTimeout(() => {
    alertBox.classList.add('hidden');
  }, 3000);
}

function createItemElement(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;

  const removeBtn = document.createElement('button');
  removeBtn.innerHTML = '🗑️';
  removeBtn.onclick = () => {
    li.remove();
    showAlert();
  };

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
  }
});

closeAlert.addEventListener('click', () => {
  alertBox.classList.add('hidden');
});
