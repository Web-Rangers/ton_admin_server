import {bridge_service} from '../../request'

const build_bridge_controller = function() {
    return ({
        get_bsc_bridge_status,
        get_eth_bridge_status,
        get_eth_bridge_transactions,
        get_bsc_bridge_transactions
    })
    async function get_bsc_bridge_status({params}) {
        return {status:200,result:{bridge_status:bridge_service.get_bsc_status()}}
    }
    async function get_eth_bridge_status({params}) {
        return {status:200,result:{bridge_status:bridge_service.get_eth_status()}}
    }
    async function get_eth_bridge_status({params}) {
        return {status:200,result:{bridge_status:bridge_service.get_eth_status()}}
    }
    async function get_eth_bridge_status({params}) {
        return {status:200,result:{bridge_status:bridge_service.get_eth_status()}}
    }
    async function get_eth_bridge_transactions({params}) {
        return {status:200,result:{transactions:bridge_service.get_eth_bridge_transactions()}}
    }
    async function get_bsc_bridge_transactions({params}) {
        return {status:200,result:{transactions:bridge_service.get_bsc_bridge_transactions()}}
    }
}

export {
    build_bridge_controller
}