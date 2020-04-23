import { TransactionDuplicatesPipe } from './transaction-duplicates.pipe';

describe('TransactionDuplicatesPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionDuplicatesPipe();
    expect(pipe).toBeTruthy();
  });
});
