export function getRepositoryToken(entity: Function, database?: string) {
    return `${entity.name}@${database || 'DEFAULT'}`
}