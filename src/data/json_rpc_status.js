const EventEmitter = require('events')
const emitter = new EventEmitter()
class Status{
    constructor(){
        this.status = {
            electionId: 0,
            tpsAvg: [],
            totalValidators: 0,
            onlineValidators: 0,
            startValidation: 0,
            endValidation: 0,
            startNextElection: 0,
            startElection: 0,
            endElection: 0,
            services:[],
            offers:[],
            blocks_rate:{
                last_block:0,blocks_rate:[]
            },
            complains:[],
            validators:[],
            complaints:[],
            liteservers:[],
            dhtservers:[],
            blocks:[],
            bridge:{
                eth:false,
                bsc:false
            },
        }
    }

    update_status(data){
        let change = false
        for (let kw of Object.entries(data)) {
            let [key,val] = kw
            if (this.status[key]&&this.status[key]!=val){
                change = true
                this.status[key]= val  
            }    
        }
        if (change)
            emitter.emit('data_change',this.status)
    }

    get_status(){
        return this.status
    }
}
const status = new Status()
module.exports ={status,emitter}