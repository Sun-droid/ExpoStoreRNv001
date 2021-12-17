import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ActivityIndicator } from 'react-native';
import { Connection, createConnection } from 'typeorm';

import { ProductModel } from './entities/ProductModel';
// import { CreateProductsTable1608217149351 } from './migrations/1608217149351-CreateProductsTable';
import { CreateProductsTable1638117577460 } from './migrations/1638117577460-CreateProductsTable';
import { ProductsRepository } from './repositories/ProductsRepository';
import * as FileSystem from 'expo-file-system';

// load DB for expo
FileSystem.downloadAsync(
  'http://example.com/downloads/data.sqlite',
  FileSystem.documentDirectory + 'data.sqlite'
)
.then(({ uri }) => {
  console.log('Finished downloading to ', uri)
})
.catch(error => {
  console.error(error);
})




interface DatabaseConnectionContextData {
  productsRepository: ProductsRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData,
);

export const DatabaseConnectionProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    const createdConnection = await createConnection({
      type: 'expo',
      database: 'products07.db',
      driver: require('expo-sqlite'),
      entities: [ProductModel],

      migrations: [CreateProductsTable1638117577460],
      migrationsRun: false,

      synchronize: true,
    });

    setConnection(createdConnection);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return <ActivityIndicator />;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        productsRepository: new ProductsRepository(connection),
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);

  return context;
}
