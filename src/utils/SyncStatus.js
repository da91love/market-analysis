class SyncStatus{
    static set({storageKey, statusSetter, data} = {}) {
        localStorage.setItem(storageKey, JSON.stringify(data)); 

        statusSetter(data);
    }

    static remove({storageKey, statusSetter, data} = {}) {
        localStorage.removeItem(storageKey);
        localStorage.setItem(storageKey, JSON.stringify(data)); 
        
        statusSetter(data);
    }
}

export default SyncStatus;