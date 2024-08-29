import { Column, Entity } from "typeorm";
import Model from "./model.entity";
import { Status } from "../utils/status.enum";

@Entity("rfq")
export class rfq  extends Model{
    
    @Column()
    rfqNo:string;
    @Column()
    created_by:string;
    @Column({
        type: "enum",
        enum: Status,
        default: Status.PENDING,
        name: "status",
      })
      status: Status;
      
  
}