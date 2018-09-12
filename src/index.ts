const axios = require('axios')
const SHA384 = require('crypto-js/sha384')
const Base64 = require('crypto-js/enc-base64')

/** 
 * curl https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css | openssl dgst -sha384 -binary | openssl base64 -A
 */

const url = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'

axios.get(url).then(d => {
    console.log(!!d.data)
    return d.data
}).then(d => {
    const a = Base64.stringify(SHA384(d))
    const temp = `<link rel="stylesheet" href="${url}" integrity="sha384-${a}" crossorigin="anonymous">`
    const res = `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">`
    console.log(temp)
    console.log(temp === res)
})