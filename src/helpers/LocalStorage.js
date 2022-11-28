// Returns the Sticky Notes data from Local Storage already parsed in JSON format
export const getStickyNotesFromLocalStorage = () => {
    const localStorageData = window.localStorage.getItem("STICKY_NOTES");

    if (localStorageData !== null) return JSON.parse(localStorageData);

    return [];
};

// Sets the new Sticky Notes data to Local Storage
export const setStickyNotesDataToLocalStorage = (stickyNotesData) => {
    window.localStorage.setItem(
        "STICKY_NOTES",
        JSON.stringify(stickyNotesData)
    );
};

// Returns the Clusters data from Local Storage already parsed in JSON format
export const getClustersFromLocalStorage = () => {
    const localStorageData = window.localStorage.getItem("CLUSTERS");

    if (localStorageData !== null) return JSON.parse(localStorageData);

    return ["none"];
};

// Sets the new Clusters data to Local Storage
export const setClustersDataToLocalStorage = (stickyNotesData) => {
    window.localStorage.setItem("CLUSTERS", JSON.stringify(stickyNotesData));
};
