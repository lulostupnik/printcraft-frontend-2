import { API_URL } from "./api";

//puto el que lee
export async function RegisterUser(username:string,password:string) 
{
    const ans = await fetch(`${API_URL}/register`,{
            method: "POST",
            body: JSON.stringify({
                username,password
            })
        })
}

export async function LogInUser(username:string,password:string) 
{
    const ans = await fetch(`${API_URL}/login`,{
            method: "POST",
            body: JSON.stringify({
                username,password
            })
        })
}

export async function CreateSeller(storeName:string,description:string,address:string) 
{
    const ans = await fetch(`${API_URL}/login`,{
        method: "POST",
        body: JSON.stringify({
            storeName,description,address
        })
    })
}

export async function PublishProduct(name:string, material: string,stock:number,description:String,image_url:string,price:number) 
{
    const ans = await fetch(`${API_URL}/login`,{
        method: "POST",
        body: JSON.stringify({
            name,material,stock,description,image_url,price
        })
    })
}
