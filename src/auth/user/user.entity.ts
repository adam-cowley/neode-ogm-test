import { v4 } from 'uuid'
import { Uuid, String, NodeEntity } from 'neodegm'

import { UserClaims } from './user-claims.interface'
import { UserProperties } from './user-properties.interface'

@NodeEntity()
export class User {

    @Uuid({
        primary: true
    })
    id: string;


    @String({
        unique: true,
    })
    email: string;

    @String()
    firstName: string;

    @String()
    lastName: string;


    @String()
    private password: string;


    static create(email: string, password: string, firstName: string, lastName: string) {
        const user = new User

        user.id = v4()
        user.email = email
        user.password = password
        user.firstName = firstName
        user.lastName = lastName

        return user
    }

    getId(): string {
        return this.id
    }

    getPassword(): string {
        return this.password
    }

    setEmail(email: string) {
        this.email = email
    }

    setFirstName(firstName: string) {
        this.firstName = firstName
    }

    setLastName(lastName: string) {
        this.lastName = lastName
    }

    getClaims(): UserClaims {
        const { email, firstName, lastName } = this

        return {
            email, firstName, lastName
        } as UserClaims
    }

    toJson(): UserProperties {
        const { password, ...properties } = this;

        return properties as UserProperties
    }
}