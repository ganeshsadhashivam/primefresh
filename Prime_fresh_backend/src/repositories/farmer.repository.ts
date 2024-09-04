import { Repository } from "typeorm";
import { Farmer } from "../entities/farmer.entity";

export class FarmerRepository extends Repository<Farmer> {
  async findById(id: string): Promise<Farmer | null> {
    return this.findOne({ where: { id }, relations: ["crops"] });
  }

  async updateFarmer(
    id: string,
    updateData: Partial<Farmer>
  ): Promise<Farmer | null> {
    const farmer = await this.findById(id);

    if (!farmer) {
      return null;
    }

    Object.assign(farmer, updateData);
    return this.save(farmer);
  }
}

// import { Repository } from "typeorm";
// import { Farmer } from "../entities/farmer.entity";

// export class FarmerRepository extends Repository<Farmer> {}

// import { Repository } from "typeorm";
// import { Farmer } from "../entities/farmer.entity";

// export class FarmerRepository extends Repository<Farmer> {}
