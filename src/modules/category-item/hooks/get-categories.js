import { useRef, useState } from "react";
import services from '../services';

const useGetCategoryData = () => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState({
        items: [],
    });
    const [isLastPage, toggleLastPage] = useState(false);

    const page = useRef(1);
    const action = (slug) => {
        setStatus('loading');
        services.getCategoryData(slug, page.current).then(res => {
            setData({
                ...data,
                category: res.category,
                items: [
                    ...data.items,
                    ...res.items.items
                ]
            });
            if (res.items.totalPages == page.current) {
                toggleLastPage(true);
            }

        }).finally(() => setStatus("done"))
    }

    return {
        data,
        action,
        status,
        page,
        isLastPage
    }
}

export default useGetCategoryData;