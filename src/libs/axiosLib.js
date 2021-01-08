import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

async function GET(url) {
    console.log('api request: ', url)
    return new Promise((resolve, reject) => {
        axios.get(BACKEND_URL+url, {})
            .then(function (response) {
                console.log("response:", response);
                if (!response.data) return reject('response have no data');
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    })



}
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
  };
function POST(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(BACKEND_URL+url, data, axiosConfig)
            .then(function (response) {
                console.log("response:", response);
                if (!response.data) return reject('response have no data');
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

const AxiosLib = { GET, POST }
export default AxiosLib;