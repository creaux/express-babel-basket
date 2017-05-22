import logger from 'morgan';

export default app => logger('dev', {
  skip: () => app.get('env') === 'test'
});
