import { useState } from "react";
import services from '../services/category';

const useGetCategories = () => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);
    const action = () => {
        setStatus('loading');
        services.getCategoriesList().then(res=> {
            setStatus('done');
            setData(res);
        }).catch(_err=> {
            setStatus('idle');
        })
    }
    
    return {
        data,
        action,
        status,
    }
}

export default useGetCategories;