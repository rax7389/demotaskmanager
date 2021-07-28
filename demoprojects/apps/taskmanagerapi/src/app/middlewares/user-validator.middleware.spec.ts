import { UserValidator } from './user-validator.middleware';

describe('UserValidator', () => {
  it('should create an instance', () => {
    expect(new UserValidator()).toBeTruthy();
  });
});
