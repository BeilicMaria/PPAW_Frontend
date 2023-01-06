import React, { createContext, useState } from "react";

export const MenuContext = createContext({
  open: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOpen: (value: boolean) => {},
});

export const MenuContextProvider = (props: any) => {
  const setOpen = (open: boolean) => {
    setState({ ...state, open: open });
  };
  const initState = {
    open: true,
    setOpen: setOpen,
  };
  const [state, setState] = useState(initState);
  return (
    <MenuContext.Provider value={state}>{props.children}</MenuContext.Provider>
  );
};
