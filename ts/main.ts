/* global data */
const $photoURL = document.querySelector('#photo-url') as HTMLInputElement;

if (!$photoURL) throw new Error('$photoURL query has failed');

$photoURL.addEventListener('input', () => {
  const $image = document.querySelector('img');
  if (!$image) throw new Error('$image query has failed');
  $image.setAttribute('src', $photoURL.value);
});

console.log('data', data);

// const $form = document.querySelector('form');

// if(!$form) throw new Error('The $form query has failed');

// $form.addEventListener('submit', (event:Event) => {
// event.preventDefault;

// })
