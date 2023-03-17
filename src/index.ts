import express from "express";
import cors from "cors";
import dataSource from "./utils";
import wilderController from "./controller/WilderController";
import skillController from "./controller/SkillController";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello world from express");
});

app.post("/api/wilder", wilderController.create);
app.get("/api/wilder", wilderController.get);
app.put("/api/addSkill", wilderController.addSkills);
app.put("/api/wilder/changeSkillScore", wilderController.changeSkillScore);
app.put("/api/wilder/:id", wilderController.put);
app.delete("/api/wilder/:id", wilderController.delete);

app.post("/api/skill", skillController.create);
app.put("/api/skill/:id", skillController.put);
app.delete("/api/skill/:id", skillController.delete);
app.get("/api/skill", skillController.get);

const start = async (): Promise<void> => {
    await dataSource.initialize();
    app.listen(5000, () => console.log("Server started"));
}

void start();