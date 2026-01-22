export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
}

export class InMemoryLedger {
  private transactions: Transaction[] = [];

  record(tx: Transaction): void {
    this.transactions.push(tx);
  }

  list(): Transaction[] {
    return [...this.transactions];
  }
}
