const makeUrl = (url, data) => {
    for (let key in data) {
        if (!data.hasOwnProperty(key)) {
            continue;
        }
        url = url.replace(`{${  key  }}`, data[key]);
    }
    return url;
};
export default makeUrl;