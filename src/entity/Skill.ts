import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grade } from "./Grade";
// import { Wilder } from "./Wilder";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Grade, (grade) => grade.skill)
    grade: Grade[]
}
