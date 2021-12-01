import axios from 'axios'
import config from '../../config'

async function sendJRPC(url, data, params = {}){

    let headers = {
        'Content-Type': 'application/json'
    }

    if (config.TOKEN.length>0){
        headers['Authorization'] = "token " + config.TOKEN
    }
    return axios.post(config.NODE_URL+url,
        JSON.stringify({jsonrpc: "2.0", id: 0, method: data, params: params}),
        {headers:headers})
};

export {sendJRPC}