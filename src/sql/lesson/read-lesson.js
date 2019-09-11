import db from '../../db';

const filterFields = {
    date: Date,
    status: integer,
    t_id: "teacherIds",
    students: "studentsCount", "page", "lessonsPerPage"
};

async function nest(lessons) {
    const groupedLessons = [];
    lessons.forEach((lesson) => {
        let reducer = false;
        const {
            id,
            date,
            title,
            status, ...rest} = lesson;

        const student = {
            id: lesson.s_id,
            name: lesson.s_name,
            visit: lesson.visit
        };

        const teacher = {
            id: lesson.t_id,
            name: lesson.t_name,
        };

        groupedLessons.forEach((l) => {
            if(lesson.id === l.id) {
                if(!l.students.indexOf(student) < 0) {
                    l.students.push(student);
                }
                if(!l.teachers.indexOf(teacher) < 0) {
                    l.teachers.push(teacher);
                }
                reducer = true;
            }
        });

        if(!reducer) {
            const l = { id, date, title, status };
            l.students = [];
            l.teachers = [];
            l.students.push(student);
            l.teachers.push(teacher);
            groupedLessons.push(l);
        }
    });

    return groupedLessons;
  // return await lessons.map((lesson) => {
  //   const {
  //     student_name,
  //     student_id,
  //     student_visit,
  //     teacher_name,
  //     teacher_id, ...rest} = lessons;
  //
  //   return {
  //     ...rest,
  //     user: {
  //       first_name: student_name,
  //       last_name: student_id,
  //       phone_number: student_visit},
  //     category: order.category_id && {
  //       name: category_name,
  //       min_price: category_min_price,
  //       day_hour_price: category_day_hour_price,
  //       night_hour_price: category_night_hour_price,
  //       five_hours_price: category_five_hours_price,
  //       twelve_hours_price: category_twelve_hours_price}}
  // })
}

export function getLessons(options) {
    const query = {};
    filterFields.forEach((field) => {
        if(field in options) {
            const values = options[field].split(",");
            if(values.length > 1) {
                query[field] = "IN (" + options[field] + ")";
            } else {
                query[field] = options[field];
            }
        }
    });
    return db('lessons')
        //.where(query)
        .leftJoin(
            db('lesson_teachers')
                .select("lesson_id", "t_id", "t_name")
                .leftJoin(
                    db('teachers')
                        .select("id as t_id", "name as t_name")
                        .as("teachers"),
                    "lesson_teachers.teacher_id", "teachers.t_id"
                )
                .as("lesson_teachers"),
            "lessons.id", 'lesson_teachers.lesson_id'
        )
        .leftJoin(
            db('lesson_students')
                .select("lesson_id", "s_id", "s_name", "visit")
                .leftJoin(
                    db('students')
                        .select("id as s_id", "name as s_name")
                        .as("students"),
                    "lesson_students.student_id", "students.s_id"
                )
                .as("lesson_students"),
            "lessons.id", "lesson_students.lesson_id"
        )
        .orderBy('lessons.id')
        .then(lessons=> lessons && nest(lessons));
}
