import { Authentication } from './authentication.middleware';

describe('Authentication', () => {
  it('should create an instance', () => {
    expect(new Authentication()).toBeTruthy();
  });
});
