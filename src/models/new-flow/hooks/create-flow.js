import { LINKS } from "@/shared/constants/links";
import makeUrl from "@/shared/helper/make-url";
import { useRouter } from "next/router";
import { useState } from "react";
import services from '../services';

const useCreateFlow = () => {
    const router = useRouter();
    const [status, setStatus] = useState('idle');
    
    const afterCreateFlow = (_id) => {
        const flowUrlPage = makeUrl(LINKS.FLOW, { id: _id });
        router.push(flowUrlPage);
    }

    const action = ({tocken, textOrder}) => {
        setStatus('loading');
        services.createFlow({tocken, textOrder}).then(res=> {
            setStatus('done');
            afterCreateFlow("100");
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