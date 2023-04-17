import { backendServices } from "@/backend/services/services";
import cacheData from "memory-cache";

export default async function handler(req, res) {
    try {
        const cacheKey = "roadmap/categories"
        let data = cacheData.get(cacheKey);
        if (data) {
            return res.status(200).json({
                ok: true,
                data
            })
        }
        data = await backendServices.getCategories();
        // cache
        const cacheTime = 1000 * 60 * 60; // 60 min cache
        cacheData.put(cacheKey, data, cacheTime);
        // 
        return res.status(200).json({
            ok: true,
            data
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            message: e
        })
    }
}