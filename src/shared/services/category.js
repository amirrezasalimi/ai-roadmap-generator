import {CATEGORY} from "@/shared/constants/api-urls";
import mainApi from "@/infrastructure/http-client-main";

class CategoryService {
  getCategoriesList = () => {
    return new Promise((resolve, reject) => {
      mainApi
          .post(CATEGORY.GET_CATEGORIES)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            //reject(err);
              // mock
              resolve([
                  {
                      id: 1,
                      title: "Software development",
                      slug: "Product management",
                      count: 12,
                  },
                  {
                      id: 2,
                      title: "Software development",
                      slug: "Product management",
                      count: 12,
                  },
                  {
                      id: 3,
                      title: "Software development",
                      slug: "Product management",
                      count: 12,
                  },
                  {
                      id: 4,
                      title: "Software development",
                      slug: "Product management",
                      count: 12,
                  },
                  {
                      id: 5,
                      title: "Software development",
                      slug: "Product management",
                      count: 12,
                  },
                  {
                      id: 6,
                      title: "Software development",
                      slug: "Product management",
                      count: 12,
                  },
                  {
                      id: 7,
                      title: "Software development",
                      slug: "Product management",
                      count: 12,
                  },
                  {
                      id: 8,
                      title: "Software development",
                      slug: "Product management",
                      count: 12,
                  },
                  {
                      id: 9,
                      title: "Software development",
                      slug: "Product management",
                      count: 12,
                  },
              ]);
          });
    });
  };
}

export default new CategoryService();
