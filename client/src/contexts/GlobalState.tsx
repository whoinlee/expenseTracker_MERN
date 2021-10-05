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
  // getTransactions(); //--is called in the TransactionList, using useEffect
  
  const deleteTransaction = async (id:number) => {
    // console.log("GlobalState :: deleteTransaction, id?? ", id)
    try {
      await axios.delete(`${transaction_url}/${id}`);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err:any) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  };
  
  const addTransaction = async (transaction:TransactionType) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    // console.log("GlobalState :: addTransaction, transaction: ", transaction);
    try {
      // const res = await axios.post(transaction_url, transaction, config);  //----> ERROR
      const postData = {"text": transaction.text, "amount": transaction.amount};
      const res = await axios.post('/api/v1/transactions', postData, config);
      // console.log("GlobalState :: addTransaction, res: ", res)
      const dataObj:any = res.data;
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: dataObj.data
      });
    } catch (err:any) {
      // console.log("GlobalState :: addTransaction, err: ", err)
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
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