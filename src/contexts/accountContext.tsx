import React, { Dispatch, useReducer } from "react";
import { createContext, useContext } from "react";
import Account, { AccountColumn, AccountTypes } from "../models/Accout";

export const CREATE = "account/create";
export const UPDATE = "account/update";
export const DELETE = "account/delete";

type State = {
  account: Account[];
};

type Action =
  | { type: "account/delete"; id: number }
  | { type: "account/create"; account: Account }
  | {
      type: "account/update";
      id: number;
      column: AccountColumn;
      value: boolean | null | string | Date | number;
    };

const initialValues: State = {
  account: [],
};

function reducer(state: State, action: Action): State {
  "" as AccountColumn;
  switch (action.type) {
    case CREATE:
      return {
        account: state.account.concat(action.account),
      };
    case UPDATE:
      return {
        ...state,
        account: state.account.map((account) => {
          if (account.id === action.id) {
            switch (action.column) {
              case "id":
              case "cost":
                account[action.column] = action.value as number;
                break;
              case "category":
              case "username":
                account[action.column] = action.value as string;
                break;
              case "regdate":
              case "updates":
                account[action.column] = action.value as Date | number | null;
                break;
              case "inout":
                account[action.column] = action.value as boolean;
                break;
              default:
                break;
            }
          }
          return account;
        }),
      };
    case DELETE:
      return {
        ...state,
        account: state.account.filter((account) => account.id !== action.id),
      };
    default:
      break;
  }
}

export const AccountState = createContext<State | null>(null);
export const AccountDispatch = createContext<Dispatch<Action> | null>(null);

const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <AccountDispatch.Provider value={dispatch}>
      <AccountState.Provider value={state}>{children}</AccountState.Provider>
    </AccountDispatch.Provider>
  );
};

export default AccountProvider;
