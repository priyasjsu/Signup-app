
const baseUrl = 'http://localhost:3000'

export const getData = async<T>(url: string, email: string, password: string): Promise<T | undefined> => {
try{
    const res = await fetch(baseUrl+url, 
        {method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    if(res.status === 401){
        console.log('error')
        return undefined
    }
    return await res.json();
}catch(e){
    console.log(e)
    return undefined;
}
}

