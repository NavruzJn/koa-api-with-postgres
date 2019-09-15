import compose from 'koa-compose';
import lessons from './lessons';

function combineRoutes(routes) {
  if (!Array.isArray(routes)) routes = [].prototype.slice.call(arguments);

  const middleware = [];
  routes.forEach(router => {
    middleware.push(router.routes());
    if (router.allowedMethods) middleware.push(router.allowedMethods());
  });

  return compose(middleware);
}

const routes = [lessons];

export default () => combineRoutes(routes);
