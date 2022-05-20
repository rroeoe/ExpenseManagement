export const initialstate = {
  total: 0,
  expenses: []
}

const expensesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_EXPENSE":
    console.log("ADD_EXPENSE", payload);
    return{
      ...state,
      expenses: payload.expenses
    };

    case "DELETE_EXPENSE":
      console.log("DELETE_EXPENSE", payload);

      return {
        ...state,
        expenses: payload.expenses
      };

    case "UPDATE_TOTAL":
      console.log("UPDATE_TOTAL", payload);

      return {
        ...state,
        total: payload.total
      };

    default:
    throw new Error("no case for type ${type} found in expensesReducer");
  };


}

export default expensesReducer
