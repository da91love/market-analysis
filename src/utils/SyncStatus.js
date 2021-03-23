class SyncStatus{
    static set({storageKey, statusSetter, data} = {}) {
        localStorage.setItem(storageKey, JSON.stringify(data)); 
        statusSetter(data);
    }

    static remove() {
        return null;
    }
}

export default SyncStatus;