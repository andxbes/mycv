import { Report } from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Index({ unique: true })
  email: string;
  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User width id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User width id', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User width id', this.id);
  }

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
