import { CustomErrorHandler } from './custom-error-handler.middleware';

describe('CustomErrorHandler', () => {
  it('should create an instance', () => {
    expect(new CustomErrorHandler()).toBeTruthy();
  });
});
