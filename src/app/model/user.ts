export class User{
    id?: number;
    name: string;
    email: string;
    address: string;

    constructor(name: string, email: string, address: string) {
        this.name = name;
        this.email = email;
        this.address = address;
    }
}