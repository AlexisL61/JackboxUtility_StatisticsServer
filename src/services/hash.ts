const { createHash } = require('crypto');

export function hash256(toHash:string){
    return createHash('sha256').update(toHash).digest('hex');
}