import { makeNonceStr, mosaicUrl } from './common.js'
import { setTimeout } from 'core-js'
import axios from 'axios'

export class HttpRequest {
    constructor() {}
    
    request(options, mock = false) {
        const http = axios.create({
            baseURL: 'http://ienc.123nat.com:6661/',
            adapter: config => {
                return new Promise((resolve, reject) => {

                    console.log(`-------------------${JSON.stringify(config)}`)

                })
            },
            timeout: 10000,
            headers: {
                post: {
                    'Content-Type': 'application/json'
                },
                common: {
                    sources_type: "H5",
                    version: ""
                }
            }
        })

        return http(options);
    }
    


}