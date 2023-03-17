import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Grade } from "./Grade";


@Entity()
export class Wilder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;
    
    @OneToMany(() => Grade, (grade) => grade.wilder)
    grade: Grade[]
}
