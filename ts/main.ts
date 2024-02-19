/* global data */
interface Entry {
  title: string;
  photoURL: string;
  notes: string;
  entryID?: number;
}

const $photoURL = document.querySelector('#photo-url') as HTMLInputElement;
if (!$photoURL) throw new Error('$photoURL query has failed');

const $image = document.querySelector('img');
if (!$image) throw new Error('$image query has failed');

$photoURL.addEventListener('input', () => {
  $image.setAttribute('src', $photoURL.value);
});

console.log('data', data);

const $form = document.querySelector('form');
if (!$form) throw new Error('The $form query has failed');

const $title = document.querySelector('#title') as HTMLInputElement;
const $notes = document.querySelector('#notes') as HTMLInputElement;

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const journalEntry: Entry = {
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
