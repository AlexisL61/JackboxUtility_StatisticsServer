export function hidePrivateData(data:any){
    data.hash = undefined;
    data._id = undefined;
    return data;
}

export function hidePrivateDataArray(data:any[]){
    return data.map((item)=>{
        return hidePrivateData(item);
    });
}