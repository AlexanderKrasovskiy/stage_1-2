import { StateClass } from './StateClass';

describe('StateClass.getInstance()', () => {
  it('should be defined', () => {
    expect(StateClass.getInstance).toBeDefined();
  });

  it('should be an instance of StateClass', () => {
    const instance = StateClass.getInstance();
    expect(instance).toBeInstanceOf(StateClass);
  });

  it('should return the same instance', () => {
    const instance = StateClass.getInstance();
    const theSameInstance = StateClass.getInstance();
    expect(instance).toBe(theSameInstance);
  });
});

describe('StateClass.setDefaultState()', () => {
  it('to be a function', () => {
    const instance = StateClass.getInstance();
    expect(typeof instance.setDefaultState).toBe('function');
  });

  it('returns undefined', () => {
    const instance = StateClass.getInstance();
    expect(instance.setDefaultState()).toBeUndefined();
  });
});
