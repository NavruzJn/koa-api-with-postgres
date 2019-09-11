import createLesson from '../sql/lesson/create-lesson';
import {getLessons} from '../sql/lesson/read-lesson';

class Lesson {
  static async createLessons(lessonsData) {
    return await createLesson();
  }

  static async getLessons(options) {
    return await getLessons(options);
  }
}

module.exports = Lesson;
