import { inject, injectable } from "inversify";
import { DataSource, Repository, Like } from "typeorm";
import { Role } from "../entities/role.entity";
import { TYPES } from "../types";
import { RoleRepository } from "../repositories/role.repository";

@injectable()
export class RoleService {
  private roleRepository: Repository<Role>;

  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {
    this.roleRepository = this.dataSource.getRepository(Role) as RoleRepository;
  }

  async findAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findRoleById(id: string): Promise<Role | null> {
    return this.roleRepository.findOneBy({ id });
  }

  async findRoleByName(name: string): Promise<Role | null> {
    const uppercasedName = name.toUpperCase();
    return this.roleRepository
    .createQueryBuilder('role')
    .where('UPPER(role.name) = :name', { name: uppercasedName })
    .getOne();
  }

  async createRole(roleData: Partial<Role>): Promise<Role> {
    if (roleData.name) {
      roleData.name = roleData.name.toUpperCase();
    }
    const role = this.roleRepository.create(roleData);
    return this.roleRepository.save(role);
  }

  async updateRole(id: string, roleData: Partial<Role>): Promise<Role | undefined> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new Error("Role not found");
    }
    // If the roleData contains a name, convert it to uppercase
  if (roleData.name) {
    roleData.name = roleData.name.toUpperCase();
  }

    Object.assign(role, roleData);
    return this.roleRepository.save(role);
  }

  async deleteRole(id: string): Promise<void> {
    const result = await this.roleRepository.softDelete(id);
    if (result.affected === 0) {
      throw new Error("Role not found");
    }
}
async findOneRole(id:string):Promise<Role|null>{
  return this.roleRepository.findOne({ where: { id} })
}
}