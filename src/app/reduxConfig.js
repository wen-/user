import { configureStore } from '@reduxjs/toolkit';
import {
    // createMigrate,
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer'
import rootSaga from './rootSaga';

const devMode = process.env.NODE_ENV === 'development';
const sagaMiddleware = createSagaMiddleware();
const middleware = (getDefaultMiddleware) => {
    const m = [
        ...getDefaultMiddleware({
            thunk: false,
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }),
        sagaMiddleware
    ];

    if (devMode) {
        m.push(logger);
    }

    return m;
};

// const migrations = {
//   1: (state) => {
//     const newData = {
//       ...state,
//       counter: {...state.counter, test: 'abc123'}
//     }
//     return newData
//   },
// };

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // migrate: createMigrate(migrations, { debug: true }),//数据迁移功能，version要对应上
    whitelist: ['test'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: devMode,
    middleware,
});

sagaMiddleware.run(rootSaga);

let persistor = persistStore(store);

export {
    store,
    persistor,
    PersistGate,
}
