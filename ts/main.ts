/* global data */
const $photoURL = document.querySelector('#photo-url') as HTMLInputElement;
if (!$photoURL) throw new Error('$photoURL query has failed');
const $image = document.querySelector('img');
if (!$image) throw new Error('$image query has failed');
const $form = document.querySelector('form') as HTMLFormElement;
if (!$form) throw new Error('The $form query has failed');
const $title = document.querySelector('#title') as HTMLInputElement;
const $notes = document.querySelector('#notes') as HTMLInputElement;
const $list = document.querySelector('ul');
if (!$list) throw new Error('$list query has failed');
const $h3 = document.querySelector('h3');
if (!$h3) throw new Error('$h3 query has failed');
const $dataView = document.querySelectorAll('div[data-view]');
const $anchor = document.querySelectorAll('a');
if (!$anchor) throw new Error('$anchor query has failed');

$photoURL.addEventListener('input', () => {
  $image.setAttribute('src', $photoURL.value);
});

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const journalEntry: Entry = {
    title: $title.value,
    photoURL: $photoURL.value,
    notes: $notes.value,
  };
  journalEntry.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(journalEntry);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  const newEntry = renderEntry(journalEntry);
  $list.prepend(newEntry);
  viewSwap('entries');
  toggleNoEntries();
});

function renderEntry(entry: Entry): HTMLLIElement {
  const $listItem = document.createElement('li');
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half');
  const $image = document.createElement('img');
  $image.setAttribute('class', 'list-image');
  $image.setAttribute('src', entry.photoURL);
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  const $title = document.createElement('h2');
  $title.textContent = entry.title;
  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;

  $listItem.appendChild($row);
  $row.appendChild($columnHalf1);
  $columnHalf1.appendChild($image);
  $row.appendChild($columnHalf2);
  $columnHalf2.appendChild($title);
  $columnHalf2.appendChild($notes);

  return $listItem;
}

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $list.appendChild($newEntry);
    viewSwap(data.view);
    toggleNoEntries();
  }
});

function toggleNoEntries(): void {
  if (data.entries.length > 0) {
    $h3?.setAttribute('class', 'hidden');
  }
}

function viewSwap(view: string): void {
  if (view === 'entry-form') {
    $dataView[0].setAttribute('class', 'regular');
    $dataView[1].setAttribute('class', 'hidden');
  } else if (view === 'entries') {
    $dataView[0].setAttribute('class', 'hidden');
    $dataView[1].setAttribute('class', 'regular');
  }
  data.view = view;
}

$anchor[0].addEventListener('click', () => {
  viewSwap('entries');
});
$anchor[1].addEventListener('click', () => {
  viewSwap('entry-form');
});
