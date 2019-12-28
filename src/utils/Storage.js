import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'

let storage = new Storage({
    size: 12000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync : {
        
    }
})

storage.doSave = function(key, data = null, id = null) {
	let obj = {
		key,
		data
	}
	
	if(id !== null) obj[id] = id
	
	this.save(obj)
}

storage.doLoad = function(key, id = null) {
	let obj={
        key
    }
	
	if(id !== null) obj[id] = id

	return this.load(obj)
}

export default storage