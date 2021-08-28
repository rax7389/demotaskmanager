export class AuthenticationAction {

  public login(type: string, payload: { token: string }) {
    return {
      type,
      payload
    }
  }

  public logout(type: string, payload: number) {
    return {
      type,
      payload
    }
  }
}
