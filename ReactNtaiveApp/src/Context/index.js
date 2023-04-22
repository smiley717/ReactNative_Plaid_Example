import React, {createContext} from 'react';
const RootContext = createContext();

const initialState = {
  accessToken: '',
  itemId: '',
};

function rootReducer(state, action) {
  switch (action.type) {
    case 'SET_STATE': {
      return {
        ...state,
        accessToken: action.accessToken,
        itemId: action.itemId,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function RootProvider(props) {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const value = {state, dispatch};
  return (
    <RootContext.Provider value={value}>{props.children}</RootContext.Provider>
  );
}
function useRoot() {
  const context = React.useContext(RootContext);
  if (context === undefined) {
    throw new Error('useRoot must be used within a RootProvider');
  }
  return context;
}

export {RootProvider, useRoot};
