import crypto from 'crypto';

var generatekey = (length) => {
    const key = crypto.randomBytes(length).toString('hex');
    return process.env.KEYTAG + key +"."+ Date.now().toString();
    //crypto.createHash('sha256').update(key).digest('hex')
}

export default generatekey