import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Wilder } from "./Wilder";
import { Skill } from "./Skill";

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    grade: string;

    @Column()
    wilderId: string;

    @Column()
    skillId: string;

    @ManyToOne(() => Wilder, (wilder) => wilder.grade, {
        onDelete: "CASCADE"
    })
    wilder: Wilder

    @ManyToOne(() => Skill, (skill) => skill.grade, {
        onDelete: "CASCADE"
    })
    skill: Skill
}