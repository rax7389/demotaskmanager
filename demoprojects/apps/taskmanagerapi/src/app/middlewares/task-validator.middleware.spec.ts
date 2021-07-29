import { TaskValidator } from './task-validator.middleware';

describe('TaskValidator', () => {
  it('should create an instance', () => {
    expect(new TaskValidator()).toBeTruthy();
  });
});
