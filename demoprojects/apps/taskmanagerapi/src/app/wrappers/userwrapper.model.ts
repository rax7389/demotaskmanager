export class Userwrapper {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  theme?: string;
  constructor(data) {
    this.id = data.user_id_pk;
    this.email = data.user_email;
    this.password = data.user_password;
    this.firstname = data.user_firstname;
    this.lastname = data.user_lastname;
    this.theme = data?.user_theme || null;
  }
}
