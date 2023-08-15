import express from 'express';
import multer from "multer";
import {MoviesService} from "./movies.service";

const router = express.Router();
const {extname} = require('path');

const moviesService = new MoviesService();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (extname(file.originalname) !== '.txt') {
            return callback(new Error('ONLY_TXT_FILE_ALLOWED'));
        }
        callback(null, true);
    },
});

router.post('/import', upload.single('movies'), async (req, res) => {
    try {
        const fileContent = req.file.buffer.toString();
        const result = await moviesService.import(fileContent);
        res.json(result);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await moviesService.createMovie(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.patch('/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const result = await moviesService.updateMovie(req.body, Number(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const actorObj = {};
        const titleObj = {};

        if (req.query.actor) {
            actorObj['name'] = req.query.actor;
        }
        if (req.query.title) {
            titleObj['title'] = req.query.title;
        }
        if (Number(req.query.page) == 0) {
            res.status(400).json({error: 'page must be at least 1'});
            return 0
        }

        const result = await moviesService.getMovies(
            actorObj,
            titleObj,
            req.query.search as string,
            req.query.sort as string || 'id',
            req.query.order as string || 'ASC',
            Number(req.query.limit) || 5,
            Number(req.query.page) || 1
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await moviesService.getMovie(Number(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await moviesService.deleteMovie(Number(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;
