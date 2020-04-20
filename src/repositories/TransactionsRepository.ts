import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce((soma, transaction) => {
      switch (transaction.type) {
        case 'income':
          return {
            ...soma,
            income: transaction.value + soma.income,
            total: transaction.value + soma.income - soma.outcome,
          };
        case 'outcome':
          return {
            ...soma,
            outcome: transaction.value + soma.outcome,
            total: soma.income - transaction.value + soma.outcome,
          };
        default:
          return soma;
      }
    }, initialBalance);

    return balance;
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
