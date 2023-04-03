import { backendServices } from "@/backend/services/services";
import cacheData from "memory-cache";

export default async function handler(req, res) {
    try {
        const cacheKey = "roadmap/chart"
        let data = cacheData.get(cacheKey);
        if (data) {
            return res.status(200).json({
                ok: true,
                data
            })
        }
        data = await backendServices.getRoadmapsChart();
        // cache
        const cacheTime = 1000 * 60 * 10; // 10 min cache
        cacheData.put(cacheKey, data, cacheTime);
        // 
        return res.status(200).json({
            ok: true,
            data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: e
        })
    }
}