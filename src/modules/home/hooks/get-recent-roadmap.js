import { useState } from "react";
import services from '../services';

const useGetRecentRoadmap = () => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);
    const action = () => {
        setStatus('loading');
        services.getRecentRoadmapList().then(res=> {
            setStatus('done');
            setData(res.data.items);
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

export default useGetRecentRoadmap;