import pocketbaseInstance from "@/shared/helper/pocketbase"

export default async function handler(req, res) {
    const page=req.query.page || 1;
    const perPage=req.query.perPage || 20;
    try {
        const pocket = pocketbaseInstance()
        const list = await pocket.collection('roadmaps').getList(page, perPage, {
            expand: "created,title,code",
            sort: '-created',
        })
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