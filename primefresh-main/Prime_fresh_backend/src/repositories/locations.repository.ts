import { Repository } from "typeorm";

import { Locations } from "../entities/location.entity";

export class LocationsRepository extends Repository<Locations> {}
