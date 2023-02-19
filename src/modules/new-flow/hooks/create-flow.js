import { LINKS } from "@/shared/constants/links";
import makeUrl from "@/shared/helper/make-url";
import { useRouter } from "next/router";
import { useState } from "react";
import services from '../services';

const useCreateFlow = () => {
    const router = useRouter();
    const [status, setStatus] = useState('idle');
    
    const afterCreateFlow = (_id) => {
        const flowUrlPage = makeUrl(LINKS.ROADMAP, { id: _id });
        router.push(flowUrlPage);
    }

    const action = ({token, textOrder}) => {
        setStatus('loading');
        services.createFlow({token, textOrder}).then(res=> {
            setStatus('done');
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

export default useCreateFlow;