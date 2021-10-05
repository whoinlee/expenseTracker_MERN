import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
//-- Types
import { TransactionType, State } from '../datatypes/DataTypes';
import axios from 'axios';


//-- Initial state
const initialState:State = {
  transactions: [
    // { id: 1, text: 'Flower', amount: -20 },
    // { id: 2, text: 'Salary', amount: 300 },
    // { id: 3, text: 'Book', amount: -10 },
    // { id: 4, text: 'Camera', amount: 150 }
  ],
  error: null,
  loading: true,
  getTransactions: () => {},
  deleteTransaction: (id) => {},
  addTransaction: (transaction) => {}
};
//-- Create context
export const GlobalContext = createContext(initialState);


const transaction_url = "/api/v1/transactions";
type Props = { children?: React.ReactNode };
//-- Provider component
export const GlobalProvider = ({ children }:Props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getTransactions = async() => {
    try {
      const res = await axios.get(transaction_url);
      // console.log("res:: ", res)
      const dataObj:any = res.data;
      const transactions = dataObj.data;
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: transactions
      })
    } catch (err:any) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }
  getTransactions();
  
  const deleteTransaction = (id:number) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  };
  
  const addTransaction = (transaction:TransactionType) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  };

  return (
    <GlobalContext.Provider value={{transactions: state.transactions, 
                                    error: state.error, 
                                    loading: state.loading, 
                                    getTransactions, deleteTransaction, addTransaction}} >
      {children}
    </GlobalContext.Provider>
  );
};