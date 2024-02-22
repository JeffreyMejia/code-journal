/* exported data */
interface Entry {
  title: string;
  photoURL: string;
  notes: string;
  entryID?: number;
}

interface Data {
  view: string;
  entries: Entry[];
  editing: Entry | null;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('journal-local-storage', dataJSON);
});

const entries = localStorage.getItem('journal-local-storage');
if (entries !== null) {
  data = JSON.parse(entries);
}
