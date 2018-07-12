import React from 'react';

const ReaderContext = React.createContext({});

const ReaderProvider = ({ children, value }) => (
  <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
);

export { ReaderContext, ReaderProvider };
