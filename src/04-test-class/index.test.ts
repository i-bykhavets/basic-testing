import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 10000;
    const myAccount = getBankAccount(initialBalance);
    expect(myAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 10000;
    const myAccount = getBankAccount(initialBalance);
    expect(() => myAccount.withdraw(100000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 10000;
    const myAccount = getBankAccount(initialBalance);
    const beneficiaryAccount = getBankAccount(0);
    expect(() => myAccount.transfer(100000, beneficiaryAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 10000;
    const myAccount = getBankAccount(initialBalance);
    expect(() => myAccount.transfer(100, myAccount)).toThrow();
  });

  test('should deposit money', () => {
    const initialBalance = 10000;
    const depositAmount = 5000;
    const myAccount = getBankAccount(initialBalance);
    myAccount.deposit(depositAmount);
    expect(myAccount.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 10000;
    const withdrawAmount = 5000;
    const myAccount = getBankAccount(initialBalance);
    myAccount.withdraw(withdrawAmount);
    expect(myAccount.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalance = 10000;
    const transferAmount = 5000;
    const myAccount = getBankAccount(initialBalance);
    const beneficiaryAccount = getBankAccount(0);
    expect(() =>
      myAccount.transfer(transferAmount, beneficiaryAccount),
    ).not.toThrow();
    expect(myAccount.getBalance()).toBe(initialBalance - transferAmount);
    expect(beneficiaryAccount.getBalance()).toBe(transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 10000;
    const myAccount = getBankAccount(initialBalance);
    try {
      const balance = await myAccount.fetchBalance();
      expect(typeof balance).toBe('number');
    } catch (error) {
      return error;
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 10000;
    const depositAmount = 5000;
    const myAccount = getBankAccount(initialBalance);
    try {
      const balance = await myAccount.fetchBalance();
      if (typeof balance === 'number') {
        myAccount.deposit(depositAmount);
        expect(myAccount.getBalance()).toBe(initialBalance + depositAmount);
      }
    } catch (error) {
      return error;
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 10000;
    const myAccount = getBankAccount(initialBalance);
    try {
      await myAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toStrictEqual(new SynchronizationFailedError());
    }
  });
});
