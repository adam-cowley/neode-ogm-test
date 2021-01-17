import Neode, { Repository } from "neodegm";
import { getRepositoryToken } from "./neode.utils";

export const repositories = new Map<String, Repository<Function>>()

export function createNeodeProviders(entities: Function[], database?: string) {
    return entities.map(entity => {
        const token = getRepositoryToken(entity, database)

        return {
            provide: token,
            // global: true,
            inject: [Neode],
            useFactory: (neode: Neode) => {
                return repositories.has(token) ? repositories.get(token) : neode.getRepository(entity, database)
            },
        }
    })
}