import dataSource from "../utils";
import { Wilder } from "../entity/Wilder";
import { Skill } from "../entity/Skill";
import { Grade } from "../entity/Grade";
import { Request, Response } from "express";

const wilderController = {
  get: async (req: Request, res: Response) => {
    try {
      const allWilders = await dataSource
        .getRepository(Wilder)
        .find({relations: {grade: {skill: true}}});
      res.send(allWilders);
    } catch (error) {
      console.log("error", error);
      res.send("Error while fetching wilders");
    }
  },
  create: (req: Request, res: Response) => {
    dataSource
      .getRepository(Wilder)
      .save(req.body)
      .then(() => {
        res.send(`Wilder has been created`);
      })
      .catch((err) => {
        console.log("error", err);
        res.send("Error while creating wilder");
      });
  },
  put: (req: Request, res: Response) => {
    dataSource
      .getRepository(Wilder)
      .update(req.params.id, req.body)
      .then(() => {
        res.send(`Wilder ${req.params.id} has been modified`);
      })
      .catch((err) => {
        console.log("error", err);
        res.send("Error while modifying wilder");
      });
  },
  delete: (req: Request, res: Response) => {
    dataSource
      .getRepository(Wilder)
      .delete(req.params.id)
      .then(() => {
        res.send(`Wilder ${req.params.id} has been deleted`);
      })
      .catch((err) => {
        console.log("error", err);
        res.send("Error while deleting wilder");
      });
  },
  addSkills: async (req: Request, res: Response) => {
    console.log("addskills controller");
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneByOrFail({ id: req.body.wilderName });
    
      req.body.skills.forEach(async (element: any) => {

        const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneByOrFail({ name: element.skillName });
      
        await dataSource.getRepository(Grade).save({
          grade: element.grade,
          wilder: wilderToUpdate,
          skill: skillToAdd
        })
        
      });

      res.send("Wilder updated");
    } catch (err) {
      console.log("error", err);
      res.send("Error while adding skill");
    }
  },
  changeSkillScore: async (req: Request, res: Response) => {
    try {
    
      await dataSource.getRepository(Grade).update({id: req.body.skillId}, {
        grade: req.body.grade,
      })

      res.send("Wilder updated");
    } catch (error) {
      console.log("error", error);
      res.send("Error while adding skill");
    }
  }
};

export default wilderController;