import React, { useContext } from 'react';
import { numberWithCommas } from '../utils/format';
//-- Contexts
import { GlobalContext } from '../contexts/GlobalState';
//-- Types
import { TransactionType } from '../datatypes/DataTypes';
//-- Styles
import '../styles/Transactions.css';


type Props = { transaction: TransactionType };
const Transaction = ({ transaction }:Props) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
        {transaction.text} <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
        <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">x</button>
    </li>
  );
};

export default Transaction;
