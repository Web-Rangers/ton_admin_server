const {get_validators} = require('./validator')
const {get_bsc_status,get_eth_status} = require('./bridge');
const {get_tps} = require('./tsp')
const {login} = require('./login')
const {get_status} = require('./status')

const metrics_service = {get_tps,get_validators,get_status}
const bridge_service = {get_bsc_status,get_eth_status}
const auth_service = {login}

module.exports = {bridge_service,metrics_service,auth_service}