/* global data */
const $photoURL = document.querySelector('#photo-url') as HTMLInputElement;
if (!$photoURL) throw new Error('$photoURL query has failed');
const $image = document.querySelector('img');
if (!$image) throw new Error('$image query has failed');
const $form = document.querySelector('#form-entry') as HTMLFormElement;
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
const $h1 = document.querySelector('.edit');
if (!$h1) throw new Error('$h1 query has failed');
const $delete = document.querySelector('#delete-button');
if (!$delete) throw new Error('$delete query failed');
const $confirm = document.querySelector('.confirm');
if (!$confirm) throw new Error('$confirm query failed');
const $cancel = document.querySelector('.cancel');
if (!$cancel) throw new Error('$cancel query failed');
const $dialog = document.querySelector('dialog');
if (!$dialog) throw new Error('$dialog query failed');

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

  if (data.editing !== null) {
    journalEntry.entryID = data.editing.entryID;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID === journalEntry.entryID) {
        data.entries[i] = journalEntry;
      }
    }
    const editedEntry = renderEntry(journalEntry);
    const $li = document.querySelectorAll('li');
    for (let i = 0; i < $li.length; i++) {
      if (
        $li[i].getAttribute('data-entry-id') === String(data.editing.entryID)
      ) {
        $li[i].replaceWith(editedEntry);
      }
    }
    $h1.innerHTML = 'New Entry';
    data.editing = null;
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    viewSwap('entries');
  } else {
    data.nextEntryId++;
    data.entries.unshift(journalEntry);
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    const newEntry = renderEntry(journalEntry);
    $list.prepend(newEntry);
    viewSwap('entries');
    toggleNoEntries();
  }
});

function renderEntry(entry: Entry): HTMLLIElement {
  const $listItem = document.createElement('li');
  $listItem.setAttribute('data-entry-id', String(entry.entryID));
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
  const $row2 = document.createElement('row');
  $row2.setAttribute('class', 'row title-row');
  const $pencil = document.createElement('i');
  $pencil.setAttribute('class', 'fa-solid fa-pencil');

  $listItem.appendChild($row);
  $row.appendChild($columnHalf1);
  $columnHalf1.appendChild($image);
  $row.appendChild($columnHalf2);
  $columnHalf2.appendChild($row2);
  $row2.appendChild($title);
  $row2.appendChild($pencil);
  $columnHalf2.appendChild($notes);

  return $listItem;
}

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $list.appendChild($newEntry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});

function toggleNoEntries(): void {
  if (data.entries.length > 0) {
    $h3?.setAttribute('class', 'hidden');
  } else {
    $h3?.setAttribute('class', 'regular');
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
  $h1.innerHTML = 'New Entry';
  $form.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $delete?.setAttribute('class', 'delete hidden');
});

$list.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLElement;
  const $closest = $eventTarget.closest('[data-entry-id]') as HTMLLIElement;
  const $EntryId = Number($closest?.getAttribute('data-entry-id'));
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryID === $EntryId) {
      data.editing = data.entries[i];
    }
  }
  if (!data.editing) {
    throw new Error('EntryId does not exist in entry list');
  }
  $title.value = data.editing.title;
  $notes.value = data.editing.notes;
  $image.setAttribute('src', data.editing.photoURL);
  $photoURL.value = data.editing.photoURL;
  viewSwap('entry-form');
  $h1.innerHTML = 'Edit entry';
  $delete?.setAttribute('class', 'delete');
});

$delete.addEventListener('click', () => {
  $dialog.showModal();
});
$cancel.addEventListener('click', () => {
  $dialog.close();
});

$confirm.addEventListener('click', () => {
  data.entries = data.entries.filter(
    (entry) => entry.entryID !== data.editing?.entryID
  );
  const $li = document.querySelectorAll('li');
  if (!data.editing) {
    throw new Error('EntryId does not exist in entry list');
  }
  for (let i = 0; i < $li.length; i++) {
    if ($li[i].getAttribute('data-entry-id') === String(data.editing.entryID)) {
      $li[i].remove();
    }
  }
  toggleNoEntries();
  $dialog.close();
  viewSwap('entries');
});
