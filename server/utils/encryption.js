const crypto = require('crypto')
require("dotenv").config()

const { FIELD_ENC_KEY, FIELD_ENC_IV } = process.env

if (!FIELD_ENC_KEY || !FIELD_ENC_IV) {
  throw new Error('FIELD_ENC_KEY and FIELD_ENC_IV are required in .env')
}

const ENC_KEY = Buffer.from(FIELD_ENC_KEY, 'utf8')
const ENC_IV = Buffer.from(FIELD_ENC_IV, 'utf8') 
const ENC_METHOD = 'aes-256-cbc'


function encryptData(data) {
  const cipher = crypto.createCipheriv(ENC_METHOD, ENC_KEY, ENC_IV)
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  ).toString('base64')
}


function decryptData(encryptedData) {
  const buff = Buffer.from(encryptedData, 'base64')
  const decipher = crypto.createDecipheriv(ENC_METHOD, ENC_KEY, ENC_IV)
  return (
    decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
    decipher.final('utf8')
  )
}

module.exports = { decryptData, encryptData }