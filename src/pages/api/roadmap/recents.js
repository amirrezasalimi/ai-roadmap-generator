import pocketbaseInstance from "@/shared/helper/pocketbase"
import cacheData from "memory-cache";

export default async function handler(req, res) {
    try {
        const cacheKey = "roadmap/recents"
        const recents = cacheData.get(cacheKey);
        if (recents) {
            return res.status(200).json({
                ok: true,
                data: recents
            })
        }
        const page = req.query.page || 1;
        const perPage = req.query.perPage || 20;
        const pocket = pocketbaseInstance()
        let list = await pocket.collection('roadmaps').getList(page, perPage, {
            filter: "verified = true",
            sort: '-created',
        })
        // remove data cuz its large json
        list.items = list.items.map(item => ({ ...item, data: null }))
        // cache
        const cacheTime = 1000 * 60; // 1 min cache
        cacheData.put(cacheKey, list, cacheTime);
        // 
        return res.status(200).json({
            ok: true,
            data: list
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            message: e
        })
    }
}