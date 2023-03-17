import dataSource from "../utils";
import { Skill } from "../entity/Skill";
import { Request, Response } from "express";

const skillController = {
    get: async (req: Request, res: Response) => {
        try {
            const allSkill = await dataSource.getRepository(Skill).find()
            res.send(allSkill);
        } catch (error) {
            console.log("error", error);
            res.send("Error while fetching wilders")
        }
    },
    create: (req: Request, res: Response) => {
        dataSource
            .getRepository(Skill)
            .save(req.body)
            .then(() => {
                res.send(`Skill has been created`);
            })
            .catch((err) => {
                console.log("error", err);
                res.send(`Error while creating Skill`)
            });  
    },
    put: (req: Request, res: Response) => {
        dataSource
            .getRepository(Skill)
            .update(req.params.id, req.body)
            .then(() => {
                res.send(`Skill has been modified`);
            })
            .catch((err) => {
                console.log("error", err);
                res.send("Error while modifying Skill")
            })
    },
    delete: (req: Request, res: Response) => {
        dataSource
            .getRepository(Skill)
            .delete(req.params.id)
            .then(() => {
                res.send(`Skill has been deleted`);
            })
            .catch((err) => {
                console.log("error", err);
                res.send("Error while deleting Skill")
            })
    },
};

export default skillController;