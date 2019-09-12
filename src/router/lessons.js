import Router from 'koa-router';

import Lesson from '../controllers/Lesson';

const router = new Router();

router
    .prefix("/api/lessons")

    .get("/", async ctx => {
      try {
          ctx.response.body = await Lesson.getLessons(ctx.query);
      } catch (error) {
        console.log("error", error);
        ctx.status = 402;
        ctx.body = "Lesson not found";
      }
    })

    .post("/", async ctx => {
      try {
        ctx.response.body = await Lesson.createLessons(ctx.request.body);
      } catch (error) {
        console.log("error", error);
        ctx.status = 402;
        ctx.body = "Lesson not found";
      }
    });

module.exports = router;
