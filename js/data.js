'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
window.addEventListener('beforeunload', () => {
  console.log('string');
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('journal-local-storage', dataJSON);
});
const entries = localStorage.getItem('journal-local-storage');
if (entries !== null) {
  data = JSON.parse(entries);
}
