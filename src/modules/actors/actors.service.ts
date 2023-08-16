import {Actor} from "./actor.model";

export class ActorsService {

    async createActor(value) {
        const actor = await Actor.findOne({
            where: {name: value}
        });
        if (actor) {
            return actor;
        }
        try {
            return await Actor.create({name: value});
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return Actor.findOne({where: {name: value}});
            }
            throw e;
        }
    }

    async getActors() {
        return {data: await Actor.findAll()};
    }
}

