import {useEffect, useState } from 'react'
import axios from "../../api/axios";
import { AxiosResponse } from 'axios';

const useFetch: Function = (url:string) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | unknown >("");

    useEffect(() => {
        const fetch = async function(){
            try{
                setLoading(true)
                const response: AxiosResponse  = await axios(url);
                const {data} = response;
                setData(data.payload)
            }
            catch(error:unknown){
                setError(error)
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }

        fetch();
    }, [url])

 return {data, loading, error}
}

export default useFetch