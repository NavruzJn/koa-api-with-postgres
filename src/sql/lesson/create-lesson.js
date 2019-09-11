import r from 'ramda';
import db from '../../db';
import read from './read-lesson';

export default function (fields) {
  return db('lessons')
    .insert({
      ...fields})
    .returning('id')
    .then(r.head)
    .then(read);
}
