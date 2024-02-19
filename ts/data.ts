/* exported data */
interface Data {
  view: unknown;
  entries: object[];
  editing: unknown;
  nextEntryId: number;
}

const data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

console.log('data', data);
