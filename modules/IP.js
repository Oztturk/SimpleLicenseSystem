import crypto from 'crypto'
import * as dotenv from 'dotenv' 
dotenv.config()


var EncryptIp = (ip) =>{
    const hash = crypto.createHmac('sha256', process.env.HASHSECRET)
            .update(ip)
            .digest('hex');
    return hash
}

var CompareIP = (ip,CompareIP) =>{
    if (EncryptIp(ip).toString() == CompareIP) return true
    return false
}


export {
    EncryptIp,
    CompareIP
}