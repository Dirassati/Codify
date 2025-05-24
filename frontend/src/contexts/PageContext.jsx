import { createContext, useContext, useState, useEffect } from "react";

export const PageContext = createContext(1);

export const usePageContext = () => {
  return useContext(PageContext);
};

export const PageContextProvider = ({ children }) => {
  const [page, setPage] = useState(() => {
    // Load from localStorage on first render
    const storedPage = localStorage.getItem("page");
    return storedPage ? JSON.parse(storedPage) : 1;
  });

  // Update localStorage when page changes
  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page));
  }, [page]);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
};
