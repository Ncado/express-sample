import express from 'express';
import actorsRoutes from './modules/actors/actors.controller';
import moviesRoutes from './modules/movies/movies.controller';
import authRoutes from './modules/auth/auth.contoller';
import {authMiddleware} from "./middlewares/auth.middleware";

const apiRouter = express.Router();

apiRouter.use('/movies', authMiddleware, moviesRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/actors', authMiddleware, actorsRoutes);
apiRouter.get('/', (req, res) => {
    res.send('Hello from Express and TypeScript!');
});

export default apiRouter;
