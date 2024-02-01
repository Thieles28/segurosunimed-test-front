import { Address } from "./address";

export class Customer {
  name: string;
  email: string;
  gender: string;
  addresses: Array<Address>;

  constructor(name: string, email: string, gender: string, addresses: Array<Address>) {
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.addresses = addresses;
  }
}
