import _ from "lodash";

class SyncStatus{
    static set({storageKey, statusSetter, data} = {}) {
        localStorage.setItem(storageKey, JSON.stringify(data)); 

        statusSetter(data);
    }

    static get({storageKey} = {}) {
        return JSON.parse(localStorage.getItem(storageKey));
    }

    static remove({storageKey, statusSetter, data, rmFunc} = {}) {
        // If data is array, remove target by logic
        if (_.isArray(data)) {
            _.remove(data, rmFunc);
        // If data is object, remove target by logic
        } else if (data.constructor === Object) {
            Object.keys(data).forEach(rmFunc);
        }

        // Update data into storagekey
        localStorage.setItem(storageKey, JSON.stringify(data));
        
        // Update data into status
        statusSetter(data);
    }
}

export default SyncStatus;