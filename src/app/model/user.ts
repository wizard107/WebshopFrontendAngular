export class User{
    id: number;
    name: string;
    email: string;
    address: string;

    constructor(id: number, name: string, email: string, address: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
    }
}