export const localStorageAPI = {
    setData(key, cities) {
        localStorage.setItem(key, cities);
    },
    async getData(key) {
       let cities = localStorage.getItem(key);
       return new Promise((resolve, reject) => {
           cities !== null ? resolve(cities) : reject('storage clean')
       })
    }
};