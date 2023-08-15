import {ActorsService} from "./actors.service";

import express from 'express';

const router = express.Router();

const actorsService = new ActorsService();

router.post('/', async (req, res) => {
    try {
        console.log("newActokkkr", req.body)

        const actor = await actorsService.createActor(req.body.name);
        res.status(201).json(actor);
    } catch (err) {
        res.status(500).json({error: 'Failed to create actor'});
    }
});

router.get('/', async (req, res) => {
    try {
        const actors = await actorsService.getActors();
        res.json(actors);
    } catch (err) {
        res.status(500).json({error: 'Failed to retrieve actors'});
    }
});

export default router;
