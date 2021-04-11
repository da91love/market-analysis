import _ from "lodash";

class SyncStatus{
    static set({storageKey, statusSetter, data} = {}) {
        localStorage.setItem(storageKey, JSON.stringify(data)); 

        if (statusSetter) {
            statusSetter(data);
        }
    }

    static get({storageKey} = {}) {
        return JSON.parse(localStorage.getItem(storageKey));
    }

    static remove({storageKey, statusSetter, data, rmFunc} = {}) {
        _.remove(data, rmFunc);

        localStorage.setItem(storageKey, JSON.stringify(data));
        
        if (statusSetter) {
            statusSetter(data);
        }
    }
}

export default SyncStatus;