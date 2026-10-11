/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';

const MenuContext = createContext(null);

export function MenuProvider({ children, value }) {
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useStore() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useStore deve ser usado dentro de MenuProvider.');
  }

  return context;
}
