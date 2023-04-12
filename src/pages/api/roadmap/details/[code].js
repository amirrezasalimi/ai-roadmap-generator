import { backendServices } from "@/backend/services/services";
import requestIp from 'request-ip'

export default async function handler(req, res) {
    const code = req.query.code;
    if (!code) {
        return res.status(400).json({
            ok: false,
            message: "code required"
        })
    }
    try {
        const detectedIp = requestIp.getClientIp(req)
        const data = await backendServices.getRoadmapByCode({ code, client_ip: detectedIp }).catch(e => {
            return res.status(404).json({
                ok: false,
                message: e.message
            })
        })
        if (data?.collectionId) {
            return res.status(200).json({
                ok: true,
                data
            })
        }
    } catch (e) {
        return res.status(500).json({
            ok: false,
            message: e?.message
        })
    }
}