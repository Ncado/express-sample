import express from 'express';
import actorsRoutes from './modules/actors/actors.controller';
import moviesRoutes from './modules/movies/movies.controller';
import userRoutes from './modules/users/users.controller';

import authRoutes from './modules/auth/auth.contoller';
import {authMiddleware} from "./middlewares/auth.middleware";

export const apiRouter = express.Router();

apiRouter.use('/movies', authMiddleware, moviesRoutes);
apiRouter.use('/sessions', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/actors', authMiddleware, actorsRoutes);
apiRouter.get('/', (req, res) => {
    res.send('Hello from Express and TypeScript!');
});

export default apiRouter;
