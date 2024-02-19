'use strict';
/* global data */
const $photoURL = document.querySelector('#photo-url');
if (!$photoURL) throw new Error('$photoURL query has failed');
$photoURL.addEventListener('input', () => {
  const $image = document.querySelector('img');
  if (!$image) throw new Error('$image query has failed');
  $image.setAttribute('src', $photoURL.value);
});
