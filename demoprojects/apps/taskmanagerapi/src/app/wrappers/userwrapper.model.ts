export class Userwrapper {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  theme?: string;
  constructor(id, email, password, firstname, lastname, theme) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.theme = theme || null;
  }
}
