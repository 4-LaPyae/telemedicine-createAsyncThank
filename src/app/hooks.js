//export const api = "http://192.168.100.4:5002/api";
export const api = "https://api.telemed.sabahna.com/api";
// export const api = 'http://192.168.100.3:5002/api';
// export const api = "http://192.168.2.103:5001/api";
// export const socketApi = 'http://192.168.100.3:5001';
export const socketApi = "https://api.telemed.sabahna.com";

async function useFetch({ url, method, data = null, token }) {
  const generalData = (token, method) => {
    return {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };
  };
  const test = generalData(token, method);
  if (data) {
    const post = JSON.stringify(data);
    test["body"] = post;
  }

  const response = await fetch(`${api}/${url}`, test);
  const result = await response.json();

  return result;
}
export default useFetch;
