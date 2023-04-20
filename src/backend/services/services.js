import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from "@/shared/constants/config";
import pocketbaseInstance from "./pocketbase";
import cacheData from "memory-cache";
import { POCKETBASE_COLLECTIONS } from "../constants";

class Services {
    pb
    isLoading = false

    // todo: this should be refactor , its not optimal way
    async checkAuth() {
        console.log("check login");
        const cacheKey = "auth/cookie"
        const cachedToken = cacheData.get(cacheKey);
        if (cachedToken) {
            this.pb.authStore.save(cachedToken)
            console.log("use cached token");

            return true;
        } else {
            // if (this.isLoading) return
            this.isLoading = true;
            await new Promise((resolve, reject) => {
                return this.pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD).then(() => {
                    cacheData.put(cacheKey, this.pb.authStore.token, 1000 * 60 * 60 * 24 * 1); // 1 days 
                    console.log("get new token");
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
    }
    // save roadmap
    async saveRoadmap(data) {
        return await this.pb.collection(POCKETBASE_COLLECTIONS.ROADMAPS).create(data);
    }
    // recent roadmaps
    async getRecents() {
        return await this.pb.collection(POCKETBASE_COLLECTIONS.ROADMAPS_RECENTS).getList(1, 50, {
            expand: "category",
            sort: "-created"
        });
    }
    // roadmap details + likes
    async getRoadmapByCode({ code, client_ip }) {
        const data = await this.pb.collection(POCKETBASE_COLLECTIONS.ROADMAPS).getFirstListItem(`code = "${code}"`);
        let likes = 0
        try {
            likes = (await this.pb.collection(POCKETBASE_COLLECTIONS.ROADMAPS_LIKES).getOne(data.id)).likes
        } catch (e) {
            // nothing really
        }
        data.likes = likes;
        try {
            data.is_liked = (await this.getRoadmapClientLike({ roadmap_id: data.id, client_ip })) != null
        } catch (e) {
            data.is_liked = false
        }
        return data;
    }
    // categories 
    async getCategories() {
        return await this.pb.collection(POCKETBASE_COLLECTIONS.CATEGORIES_EXTRA).getList(1, 99, {
            sort: "category_index"
        })
    }
    // roadmaps by category + pagination
    async getRoadmapsByCategorySlug({ page = 1, perPage = 24, slug } = {}) {
        const category = await this.pb.collection(POCKETBASE_COLLECTIONS.CATEGORIES_EXTRA).getFirstListItem(`slug="${slug}"`)
        const items = await this.pb.collection(POCKETBASE_COLLECTIONS.ROADMAPS_EXTRA).getList(page, perPage, {
            filter: `category="${category.id}"`,
            sort: "-created"
        });
        return {
            items,
            category
        }
    }
    // isLiked?client_ip=x.x.x.x&roadmap_id=xxx
    async getRoadmapClientLike({ roadmap_id, client_ip } = {}) {
        return await this.pb.collection(POCKETBASE_COLLECTIONS.LIKES).getFirstListItem(`roadmap="${roadmap_id}" && client_ip="${client_ip}"`)
    }
    // like?roadmap_id=xx&type=remove
    async likeRoadmap({ roadmap_id, type = "add", client_ip } = {}) {
        let oldLike = null
        try {
            oldLike = await this.getRoadmapClientLike({ roadmap_id, client_ip })
        } catch (e) { }
        if (type == "add") {
            if (!oldLike) {
                return await this.pb.collection(POCKETBASE_COLLECTIONS.LIKES).create({
                    roadmap: roadmap_id,
                    client_ip
                });
            }
            return false;
        } else {
            if (oldLike) {
                return await this.pb.collection(POCKETBASE_COLLECTIONS.LIKES).delete(oldLike.id);
            }
            return false;
        }
    }
    // roadmaps chart
    async getRoadmapsChart({ page = 1, perPage = 30 } = {}) {
        return await this.pb.collection(POCKETBASE_COLLECTIONS.ROADMAPS_CHART).getList(page, perPage)
    }
    // soon
    // views by google analytics api + cache 
}

export const backendServices = new Proxy(new Services(), {
    get(target, propKey, receiver) {
        const origMethod = target[propKey];
        if (propKey === "checkAuth") {
            // If the method being called is "checkAuth", just return the original method
            return origMethod;
        } else {
            // Otherwise, return a new function that first calls "checkAuth", then calls the original method
            return async function (...args) {
                await target.checkAuth();
                const result = origMethod.apply(target, args);
                return result;
            };
        }
    },
});
