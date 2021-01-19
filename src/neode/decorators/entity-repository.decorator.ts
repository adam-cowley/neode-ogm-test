import { Repository, registerRepository } from "neodegm"

export default function EntityRepository(entity: any) {
    return function(constructor: any)  {
        registerRepository(entity, constructor)
    }
}