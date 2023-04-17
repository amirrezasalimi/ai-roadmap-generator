import { backendServices } from "@/backend/services/services";
import cacheData from "memory-cache";

export default async function handler(req, res) {
    const slug = req.query.category_slug;
    const page = req.query?.page;
    const perPage = req.query?.perPage;
    if (!slug) {
        return res.status(400).json({
            ok: false,
            message: "bad request params"
        })
    }
    try {
        const cacheKey = `roadmap/list/${slug}/${page}/${perPage}`
        let data = cacheData.get(cacheKey);
        if (data) {
            return res.status(200).json({
                ok: true,
                data
            });
        }
        data = await backendServices.getRoadmapsByCategorySlug({ page, perPage, slug });
        // cache
        const cacheTime = 1000 * 60 * 1; // 10 min cache
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