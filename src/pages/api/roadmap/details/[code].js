import pocketbaseInstance from "@/shared/helper/pocketbase";

export default async function handler(req, res) {
    const code = req.query.code;
    if (!code) {
        return res.status(400).json({
            ok: false,
            message: "code required"
        })
    }
    const pocket = pocketbaseInstance()
    try {
        const data = await pocket.collection('roadmaps').getFirstListItem(`code = "${code}"`, {
            expand: "created,title,code"
        })
        if (data) {
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