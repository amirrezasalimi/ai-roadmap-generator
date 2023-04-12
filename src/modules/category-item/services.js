import mainApi from "@/infrastructure/http-client-main";
import {CATEGORY_ITEM_API} from "./constants";
import makeUrl from "@/shared/helper/make-url";

class CategoryItemService {
  getCategoryData = (slug) => {
    return new Promise((resolve, reject) => {
      mainApi
          .post(makeUrl(CATEGORY_ITEM_API.GET_CATEGORY_DATA, {slug: slug }))
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
