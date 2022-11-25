import { router } from '../trcp';
import { todoRouter } from './todo';

export const appRouter = router({
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
