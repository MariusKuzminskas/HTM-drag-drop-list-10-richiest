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
  .map(a => ({
      value: a,
      sort: Math.random()
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
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
  addEventListeners();
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItem = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart)
  })
  dragListItem.forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })
}

function dragStart() {
  // console.log('Event', 'dragStart')
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  // console.log(dragStartIndex)
}

function swapItems(fromIndex, toIndex) {
  console.log('swap')
  const itemOne = listItems[fromIndex].querySelector('.draggable')
  const itemTwo = listItems[toIndex].querySelector('.draggable')

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);

}

function dragOver(e) {
  // console.log('Event', 'dragOver')
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event', 'dragDrop')
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over')
}

function dragEnter() {
  // console.log('Event', 'dragEnter')
  this.classList.add('over')
}

function dragLeave() {
  // console.log('Event', 'dragLeave')
  this.classList.remove('over')
}

check.addEventListener('click', checkOrder)

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong')
    } else {
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }
  })
}