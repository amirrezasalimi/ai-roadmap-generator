import {CATEGORY} from "@/shared/constants/api-urls";
import mainApi from "@/infrastructure/http-client-main";

class CategoryService {
  getCategoriesList = () => {
    return new Promise((resolve, reject) => {
      mainApi
          .post(CATEGORY.GET_CATEGORIES)
          .then((res) => {
            resolve(res.data.data.items);
          })
          .catch((err) => {
            //reject(err);
          });
    });
  };
}

export default new CategoryService();
