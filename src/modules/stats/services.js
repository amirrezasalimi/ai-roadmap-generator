import mainApi from "@/infrastructure/http-client-main";
import { STATS_API } from "./constants";

class StatsService {
    getRoadmapPerdayStats = () => mainApi.get(STATS_API.ROADMAPS_PER_DAY)
}
export default new StatsService();