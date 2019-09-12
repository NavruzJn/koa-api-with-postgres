import createLesson from '../sql/lesson/create-lesson';
import createLessonTacher from '../sql/lesson/create-lesson-teacher';
import {getLessons} from '../sql/lesson/read-lesson';

import {getDates} from '../utils/getDates';

class Lesson {
  static async createLessons(lessonsData) {
    const { teacherIds, title, days, firstDate, lessonsCount, lastDate} = lessonsData;
    const dates = await getDates(days, firstDate, lastDate, lessonsCount);
    const lessonIds = await Promise.all(await dates.forEach(async date => await createLesson({
      title,
      date,
      status: 0
    })));

    return teacherIds.forEach(async (teacher_id) => {
      await Promise.all(await  lessonIds.forEach(async (lesson_id) => await createLessonTacher({
        teacher_id, lesson_id
      })))
    });
  }

  static async getLessons(options) {
    return await getLessons(options);
  }
}

module.exports = Lesson;
