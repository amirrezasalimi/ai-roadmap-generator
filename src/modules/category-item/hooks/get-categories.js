import { useState } from "react";
import services from '../services';

const useGetCategoryData = () => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState({});
    const action = (slug) => {
        setStatus('loading');
        services.getCategoryData(slug).then(res=> {
            setStatus('done');
            setData({
                category: res.category,
                items: res.items.items
            });
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

export default useGetCategoryData;