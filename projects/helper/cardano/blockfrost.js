const axios = require('axios')

const axiosObj = axios.create({
  baseURL: 'https://cardano-mainnet.blockfrost.io/api/v0',
  headers: {
    'project_id': 'mainnet9mqP0lhGpRfqcUnVjOFaTSK67Z9UdZMM',
    'Content-Type': 'application/json'
  },
  timeout: 300000,
})

async function getAddressesUTXOs(address) {
  const utxos = []
  let page = 1
  let response
  do {
    response = await axiosObj.get(`addresses/${address}/utxos?page=${page}`)
    response = response.data
    utxos.push(...response)
    page++
  } while (response.length)
  return utxos
}

async function getAssets(address) {
  return (await axiosObj.get(`addresses/${address}`)).data.amount
}

async function getTxsRedeemers(utxo) {
  const { data } = await axiosObj.get(`txs/${utxo}/redeemers`)
  return data
}

async function getTxsMetadata(utxo) {
  const { data } = await axiosObj.get(`txs/${utxo}/metadata`)
  return data
}

module.exports = {
  getAssets,
  getAddressesUTXOs,
  getTxsRedeemers,
  getTxsMetadata,
}
