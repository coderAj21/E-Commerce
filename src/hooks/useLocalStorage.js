export function getDataFromLocalStorage(key){
    let storeData=localStorage.getItem(key);
    if (storeData){
        return JSON.parse(storeData);
    }
    return null;
}


export function setDataInLocalStorage(key,data){
    let setData=JSON.stringify(data);
    localStorage.setItem(key,setData);
    return true;
}
