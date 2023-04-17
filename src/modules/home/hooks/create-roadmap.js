import { LINKS } from "@/shared/constants/links";
import makeUrl from "@/shared/helper/make-url";
import { useRouter } from "next/router";
import { useState } from "react";
import services from '../services';

const useCreateRoadmap = () => {
    const router = useRouter();
    const [status, setStatus] = useState('idle');

    const afterCreateRoadmap = (_id) => {
        const roadmapUrlPage = makeUrl(LINKS.ROADMAP, { id: _id });
        router.push(roadmapUrlPage);
    }

    const action = ({ token, textOrder }) => {
        setStatus('loading');
        services.createRoadmap({ token: token !== "" ? token : null, textOrder }).then(res => {
            setStatus('done');
            afterCreateRoadmap(res.data.code);
        }).catch(_err => {
            setStatus('idle');
        })
    }

    return {
        action,
        status,
    }
}

export default useCreateRoadmap;