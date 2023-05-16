import mainApi from "@/infrastructure/http-client-main";
import { CATEGORY_ITEM_API } from "./constants";

class CategoryItemService {
  getCategoryData = (slug, page = 1) => {
    return new Promise((resolve, reject) => {
      mainApi
        .get(CATEGORY_ITEM_API.GET_CATEGORY_DATA, {
          params: {
            category_slug: slug,
            page
          }
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          //reject(err);
        });
    });
  };
}

export default new CategoryItemService();
