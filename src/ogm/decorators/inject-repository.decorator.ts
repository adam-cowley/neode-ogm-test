import { Inject } from "@nestjs/common";
import { getRepositoryToken } from "../neode.utils";

export const InjectRepository = (entity: Function, database?: string) => Inject(getRepositoryToken(entity, database))
