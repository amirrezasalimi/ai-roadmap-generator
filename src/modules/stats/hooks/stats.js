import { useState } from "react"
import services from "../services";

const useStats = () => {
    const [isLoading, toggleLoading] = useState(false);
    const [data, setData] = useState([]);

    const load = () => {
        toggleLoading(true);
        services.getRoadmapPerdayStats().then(res => {
            if (res.data.ok) {
                setData(res.data.data.items)
            }
        }).finally(() => toggleLoading(false))
    }
    return {
        isLoading,
        load,
        data
    }
}
export default useStats