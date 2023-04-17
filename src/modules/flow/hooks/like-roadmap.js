import { useState } from "react";
import services from '../services';

const useLike = (isLike, roadmapId, likes) => {
    const [isLiked, setIsLiked] = useState(isLike);
    const [likeCount, setLikeCount] = useState(likes);
    const [status, setStatus] = useState('loading');
    const like = () => {
        setStatus('loading');
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        services.likeRoadmap(roadmapId).then(_res=> {
            setStatus('done');
        }).catch(_err=> {
            setStatus('idle');
        })
    }
    const disLike = () => {
        setStatus('loading');
        setIsLiked(false);
        setLikeCount(likeCount - 1);
        services.disLikeRoadmap(roadmapId).then(_res=> {
            setStatus('done');
        }).catch(_err=> {
            setStatus('idle');
        })
    }
    
    return {
        status,
        likeAction: like,
        disLikeAction: disLike,
        data: {
            isLiked,
            likeCount
        },
    }
}

export default useLike;