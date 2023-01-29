export const copyObject = (referencedObject) => JSON.parse(JSON.stringify(referencedObject));

export const getUrlParams = () => {
  let params = {};
  let paramString = decodeURIComponent(window.location.search.replace('?', ''));

  if ('' !== paramString) {
    let urlParams = paramString.split('&');
    for(let index in urlParams) {
      if (urlParams.hasOwnProperty(index)) {
        let object = urlParams[index];
        let keyValuePair = object.split('=');
        let key = keyValuePair[0];
        let value = keyValuePair[1];
        let formattedKey = key.replace('[]', '');
        if (-1 !== key.indexOf('[')) {
          if (params.hasOwnProperty(formattedKey)) {
            params[formattedKey].push(value);
          } else {
            params[formattedKey] = [
              value
            ];
          }
        } else {
          params[formattedKey] = value;
        }
      }
    }
  }
  return params;
};

export const getUrlParam = key => {
  let param = '';
  let params = getUrlParams();
  if (params.hasOwnProperty(key)) {
    param = params[key];
  }
  return param;
};