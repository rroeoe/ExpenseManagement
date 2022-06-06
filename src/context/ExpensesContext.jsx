import { createContext, useReducer, useContext } from "react"
import expensesReducer, { initialstate } from "./expensesReducer"

const ExpensesContext = createContext(initialstate)

export const ExpensesProvider = ({ children }) => {
 const [state, dispatch] = useReducer(expensesReducer, initialstate)

 const addExpense = (expense) => {
   const updatedExpenses = state.expenses.concat(expense)

   dispatch({
     type: "ADD_EXPENSE",
     payload: {
       expenses: updatedExpenses
     }
   });
 };

 const removeExpense = (expense) => {

   const updatedExpenses = state.expenses.filter(
      (currentExpense) => currentExpense.uniqueId != expense.uniqueId
    );


   dispatch({
     type: "DELETE_EXPENSE",
     payload: {
       expenses: updatedExpenses
     }
   });
 };

 const updateTotal = (expenses) => {
     let total = 0;
     state.expenses.forEach((expense) => (total += Number(expense.amount)));

     dispatch({
       type: "UPDATE_TOTAL",
       payload: {
         total
       }
     });
   };

 const value = {
   total: state.total,
   expenses: state.expenses,
   addExpense,
   removeExpense,
   updateTotal
 }

 return <ExpensesContext.Provider value={value}> { children } </ExpensesContext.Provider>

};

const useTool = () => {
  const context = useContext(ExpensesContext)

  if (context === undefined){
    throw new Error("useTool must be used within ExpensesContext")
  }

  return context
}

export default useTool
