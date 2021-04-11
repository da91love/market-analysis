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
        if (_.isArray(data)) {
            _.remove(data, rmFunc);
        } else if (data.constructor === Object) {
            Object.keys(data).forEach(rmFunc);
        }

        localStorage.setItem(storageKey, JSON.stringify(data));
        
        statusSetter(data);
    }
}

export default SyncStatus;