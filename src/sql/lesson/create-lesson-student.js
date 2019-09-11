import r from 'ramda';
import db from '../../db';
import read from './read-lesson';

export default function (fields) {
    return db('lesson_students')
        .insert({
            ...fields})
        .returning('id')
        .then(r.head)
        .then(read);
}
