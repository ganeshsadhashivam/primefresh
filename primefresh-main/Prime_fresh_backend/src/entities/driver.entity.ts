import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Status } from '../utils/status.enum';
import Model from './model.entity';
import { Address } from './address.entity';

@Entity('drivers')
export class Drivers extends Model {
  

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn()
  address: Address;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @Column()
  vehicleType: string;

  @Column()
  vehicleNo: string;
}
