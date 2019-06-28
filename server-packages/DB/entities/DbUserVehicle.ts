import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToOne,
    JoinColumn, CreateDateColumn, AfterLoad
} from "typeorm";
import {DbUser} from "./DbUser";

@Entity({
    name: "user_vehicle"
})
export class DbUserVehicle extends BaseEntity {
    constructor() {
        super();
    }

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => DbUser, user => user.id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        persistence: true
    })
    @JoinColumn()
    owner: DbUser;

    @Column({
        type: "varchar",
        length: 150
    })
    model: string;

    @Column({
        type: "varchar",
        length: 20,
        nullable: true
    })
    numberPlate: string;

    @AfterLoad()
    setNumberPlate(): void {
        if (this.numberPlate === null) {
            this.numberPlate = this.id.toString(36);
        }
    }

    @Column({
        type: "json",
        default: "{\"x\":0,\"y\":0,\"z\":0,\"heading\":0}"
    })
    positionData: { x: 0, y: 0, z: 0, heading: 0 };

    @UpdateDateColumn({
        default: null,
        nullable: true
    })
    updated: Date;

    @CreateDateColumn({readonly: true})
    created: Date;
}

