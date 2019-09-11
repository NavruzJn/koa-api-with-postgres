module.exports.up = async (db) => {

    await db.raw(`
        CREATE TABLE students (
        id integer NOT NULL,
        name character varying(10)
    )`);

    await db.raw(`
    CREATE TABLE lessons (
        id integer NOT NULL,
        date date NOT NULL,
        title character varying(100),
        status integer DEFAULT 0
    )`);

    await db.raw(`
    CREATE TABLE teachers (
      id integer NOT NULL,
      name character varying(10)
    )`);

    await db.raw(`
    CREATE TABLE lesson_students (
        lesson_id integer,
        student_id integer,
        visit boolean DEFAULT false
    )`);

    await db.raw(`
    CREATE TABLE lesson_teachers (
      lesson_id integer,
      teacher_id integer
    )`);

};

module.exports.down = async (db) => {
    await db.dropTable('students');
    await db.dropTable('lessons');
    await db.dropTable('teachers');
    await db.dropTable('lesson_students');
    await db.dropTable('lesson_teachers');
};

module.exports.configuration = {transaction: true};
