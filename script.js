const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
]

// Store list items
const listItems = []

let dragStartIndex;

createList();

function createList() {
  [...richestPeople]
  .forEach((person, index) => {
    const listItemEl = document.createElement('li');

    listItemEl.setAttribute('data-index', index);

    listItemEl.innerHTML = `
      <span class="number">${index} </span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fa fa-bars"></i>
      </div>
    `;

    listItems.push(listItemEl)
    draggableList.appendChild(listItemEl)
  })
}
console.log(listItems);