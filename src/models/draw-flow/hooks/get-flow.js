import { useState } from "react";
import services from '../services';

const useGetFlow = () => {
    const [status, setStatus] = useState('loading');

    const action = ({token, textOrder}) => {
        setStatus('loading');
        services.createFlow({token, textOrder}).then(res=> {
            afterCreateFlow(res.data.code);
        }).catch(err=> {
            setStatus('idle');
        })
    }
    
    return {
        action,
        status,
    }
}

export default useGetFlow;