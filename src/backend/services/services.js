import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from "@/shared/constants/config";
import pocketbaseInstance from "./pocketbase";
import cacheData from "memory-cache";

class Services {
    pb
    isLoading = false

    // todo: this should be refactor , its not optimal way
    async autoAuth() {
        const cacheKey = "auth/cookie"
        const cachedToken = cacheData.get(cacheKey);
        if (cachedToken) {
            this.pb.authStore.save(cachedToken)
            return true;
        } else {
            // if (this.isLoading) return
            this.isLoading = true;
            await new Promise((resolve, reject) => {
                this.pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD).then(() => {
                    cacheData.put(cacheKey, this.pb.authStore.token, 1000 * 60 * 60 * 24 * 7); // 7 days 
                }).catch(e => {
                    console.log("error on login", e);
                }).finally(() => {
                    this.isLoading = false
                    resolve();
                })
            })
        }
    }
    constructor() {
        this.pb = pocketbaseInstance()
        this.pb.autoCancellation(false)
        this.pb.beforeSend = (async (url, options) => {
            if (url.indexOf("auth-with-password") == -1) {
                await this.autoAuth();
            }
            return { url, options }
        });
    }
    // save roadmap
    async saveRoadmap(data) {
        return await this.pb.collection('roadmaps').create(data);
    }
    // recent roadmaps
    async getRecents() {
        return await this.pb.collection('recents').getList(1, 50, {
            expand: "category"
        });
    }
    // roadmap details + likes
    async getRoadmapByCode(code) {
        const data = await this.pb.collection('roadmaps').getFirstListItem(`code = "${code}"`);
        let likes = 0
        try {
            likes = await this.pb.collection("roadmaps_likes").getOne(data.id)
        } catch (e) {
            // nothing really
        }
        data.likes = likes;
        return data;
    }
    // categories 
    async getCategories() {
        return await this.pb.collection('categories').getList(1, 99, {
            sort: "index"
        })
    }
    // roadmaps by category + pagination
    async getRoadmapsByCategorySlug({ page = 1, perPage = 24, slug } = {}) {
        const category = await this.pb.collection('categories').getFirstListItem(`slug="${slug}"`)
        const items = await this.pb.collection('list').getList(page, perPage, {
            filter: `category="${category.id}"`,
            sort: "+created",
        });
        return {
            items,
            category
        }
    }
    // like?roadmap_id=xx&type=remove
    async likeRoadmap({ roadmap_id, type = "add", client_ip } = {}) {
        let oldLike = null
        try {
            oldLike = await this.pb.collection("likes").getFirstListItem(`roadmap="${roadmap_id}" && client_ip="${client_ip}"`)
        } catch (e) { }
        if (type == "add") {
            if (!oldLike) {
                return await this.pb.collection("likes").create({
                    roadmap: roadmap_id,
                    client_ip
                });
            }
            return false;
        } else {
            if (oldLike) {
                return await this.pb.collection("likes").delete(oldLike.id);
            }
            return false;
        }
    }
    // roadmaps chart
    async getRoadmapsChart({ page = 1, perPage = 30 } = {}) {
        return await this.pb.collection("roadmaps_chart").getList(page, perPage)
    }
    // soon
    // views by google analytics api + cache 
}
export const backendServices = new Services();
