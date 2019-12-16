import ReduxPersist from '../config/ReduxPersist'
import AsyncStorage from '@react-native-community/async-storage'
import {persistStore} from 'redux-persist'
/*import createEncryptor from 'redux-persist-transform-encrypt';
*/

const updateReducers = (store) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const config = ReduxPersist.storeConfig


  /*const encryptor = createEncryptor({
    secretKey: 'my-super-secret-key'
  });*/


  // Begin a fresh store
  persistStore(store, config)

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // console.log('PURGING STORE', localVersion, 'vs.', reducerVersion)
      // Purge store and refresh
      persistStore(store, config, () => {
        // Start a fresh store
        persistStore(store, config)
      }).purgeAll()
      // Update reducer to current version number
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    }
  }).catch(() => AsyncStorage.setItem('reducerVersion', reducerVersion))
}

export default {updateReducers}
