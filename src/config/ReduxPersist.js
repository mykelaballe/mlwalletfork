import immutablePersistenceTransform from '../store/ImmutablePersistenceTransform'
import {persistentStoreBlacklist, persistentStoreWhitelist} from '../reducers/'
import AsyncStorage from '@react-native-community/async-storage'


const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: persistentStoreBlacklist,
    whitelist: persistentStoreWhitelist,
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
