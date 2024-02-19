'use strict';
const $photoURL = document.querySelector('#photo-url');
if (!$photoURL) throw new Error('$photoURL query has failed');
const $image = document.querySelector('img');
if (!$image) throw new Error('$image query has failed');
$photoURL.addEventListener('input', () => {
  $image.setAttribute('src', $photoURL.value);
});
console.log('data', data);
const $form = document.querySelector('form');
if (!$form) throw new Error('The $form query has failed');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const journalEntry = {
    title: $title.value,
    photoURL: $photoURL.value,
    notes: $notes.value,
  };
  journalEntry.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(journalEntry);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
