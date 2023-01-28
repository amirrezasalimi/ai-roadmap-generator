import pocketbaseInstance from "@/shared/helper/pocketbase";

export default async function handler(req, res) {
    const code = req.query.code;
    if (!code) {
        return res.status(400).json({
            ok: false
        })
    }
    const pocket = pocketbaseInstance()
    try {
        const list = await pocket.collection('roadmaps').getList(0, 1, {
            filter: `code = "${code}"`,
            expand: "created,title,code"
        })
        if (list.items.length) {
            const { collectionName, collectionId, ...data } = list.items[0];
            return res.status(200).json({
                ok: true,
                data
            })
        } else {
            return res.status(200).json({
                ok: false,
                message: "not found"
            })
        }
    } catch (e) {
        return res.status(200).json({
            ok: false,
            message: e
        })
    }


}