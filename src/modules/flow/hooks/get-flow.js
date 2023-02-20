import { useState } from "react";
import services from '../services';

const useGetFlow = () => {
    const [status, setStatus] = useState('loading');
    const [data, setData] = useState();
    const action = (id) => {
        setStatus('loading');
        services.getFlowData(id).then(res=> {
            const data = res.data;
            setData(data);
            setStatus('done');
        }).catch(err=> {
            setStatus('idle');
        })
    }
    
    return {
        action,
        data,
        status,
    }
}

export default useGetFlow;