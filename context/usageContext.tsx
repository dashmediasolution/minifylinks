'use client'
import React, { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback, 
  ReactNode 
} from 'react';

// 1. Define the Context interface
interface GlobalVariableContextType {
  myVariable: number;
  setMyVariable: React.Dispatch<React.SetStateAction<number>>;
  fetchData: () => Promise<void>;
  loading: boolean;
}

// 2. Pass the interface to createContext (with null as initial value)
const GlobalVariableContext = createContext<GlobalVariableContextType | null>(null);

// Interface for Provider props
interface GlobalVariableProviderProps {
  children: ReactNode;
}

// 3. Provider Component
export const GlobalVariableProvider: React.FC<GlobalVariableProviderProps> = ({ children }) => {
  const [myVariable, setMyVariable] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch('/api/get-usage', {
        method: 'GET',
      });
      const data = await res.json();
      setMyVariable(data?.usage ?? 0);
    } catch (error) {
      console.error('Failed to fetch usage data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <GlobalVariableContext.Provider
      value={{
        myVariable,
        setMyVariable,
        fetchData,
        loading,
      }}
    >
      {children}
    </GlobalVariableContext.Provider>
  );
};

// 4. Custom Hook with Non-Null Assertion Guard
export const useGlobalVariable = (): GlobalVariableContextType => {
  const context = useContext(GlobalVariableContext);
  if (!context) {
    throw new Error('useGlobalVariable must be used within a GlobalVariableProvider');
  }
  return context;
};