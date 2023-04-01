import { backendServices } from "@/backend/services/services";
import requestIp from 'request-ip'

export default async function handler(req, res) {
    const type = req.query.type;
    const roadmap_id = req.query.roadmap_id;
    if (!roadmap_id) {
        return res.status(400).json({
            ok: false,
            message: "bad request params"
        })
    }
    try {
        const detectedIp = requestIp.getClientIp(req)
        const ok = await backendServices.likeRoadmap({
            roadmap_id,
            type,
            client_ip: detectedIp
        });
        return res.status(200).json({
            ok
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: e
        })
    }
}