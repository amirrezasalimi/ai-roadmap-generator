import { useState } from "react";
import services from '../services';

const useGetRecentRoadMap = () => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);
    const action = () => {
        setStatus('loading');
        services.getRecentRoadMapList().then(res=> {
            setStatus('done');
            setData(res.data.items);
        }).catch(err=> {
            setStatus('idle');
        })
    }
    
    return {
        data,
        action,
        status,
    }
}

export default useGetRecentRoadMap;