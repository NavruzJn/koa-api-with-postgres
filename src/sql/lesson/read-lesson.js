import db from '../../db';

const filterFields = {
    date: "date",
    status: "status",
    teacherIds: "teacherIds",
    students: "studentsCount",
    page: "page",
    lessonsPerPage: "lessonsPerPage"
};

async function nest(lessons) {
    const groupedLessons = [];
    await lessons.data.forEach((lesson) => {
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
                if(!l.students.find(s => s.id === student.id)) {
                    l.students.push(student);
                    l.visitCount++;
                }
                if(!l.teachers.find(t => t.id === teacher.id)) l.teachers.push(teacher);
                reducer = true;
            }
        });

        if(!reducer) {
            const l = { id, date, title, status };
            l.visitCount = student.visit ? 1 : 0;
            l.students = [student];
            l.teachers = [student];
            groupedLessons.push(l);
        }
    });

    lessons.data = groupedLessons;

    return lessons;
}

export function getLessons(options) {
    let query = '';
    const perPage = options[filterFields.lessonsPerPage] || 10;
    const page = options[filterFields.page] || 1;
    Object.keys(options).forEach(key => {
        const values = options[key].split(",");
        switch (key) {
            case filterFields.date:
                values.map((v) => new Date(v));
                if(value.length>0) {
                    query += `date IN (${values})`;
                } else {
                    query += ` date = ${values[0]}`;
                }
                break;
            case filterFields.status:
                query +=  ` status = ${parseInt(values[0], 10)}`;
                break;
            case filterFields.teacherIds:
                values.map((v) => parseInt(v, 10));
                query += ` t_id IN (${values})`;
                break;
            case filterFields.students:
                values.map((v) => parseInt(v, 10));
                query = ` s_id IN (${values})`;
                break;
            default: break;
        }
    });
    return db('lessons')
        .whereRaw(query)
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
        .paginate(perPage, page)
        .then(lessons=> lessons && nest(lessons));
}
