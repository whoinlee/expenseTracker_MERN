export type TransactionType = {
    id: number;
    text: string;
    amount: number;
}

export type State = {
    transactions: TransactionType[];
    error: any;
    loading: boolean;
    getTransactions: () => void;
    deleteTransaction: (id:number) => void;
    addTransaction: (transaction:TransactionType) => void;
}

export type Action =  
| { type: 'GET_TRANSACTIONS', payload: TransactionType[] }
| { type: 'DELETE_TRANSACTION', payload: number }
| { type: 'ADD_TRANSACTION', payload: TransactionType }
| { type: 'TRANSACTION_ERROR', payload: any }
