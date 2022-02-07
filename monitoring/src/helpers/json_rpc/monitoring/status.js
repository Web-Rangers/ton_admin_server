import {sendJRPC} from '../send_jrpc'
import db_connection from '../../../db/dbaccess/db_connection'
import {emitter} from '../../../data/json_rpc_status'
import analyze_validator from './analyze_validators'
async function get_status() {
    let result = await sendJRPC('/','status') 
    if (result&&!result.data.error){
        let res = result.data.result
        let start_end = db_connection.connection.execute('SELECT startValidation,endValidation from status',(err,result)=>{
            if (result.length>0&&res.endValidation>result[0].endValidation){
                emitter.emit('calc_vl_profit',{})
                db_connection.connection.execute(`INSERT IGNORE INTO validators_cycle_history (date_start,date_end) VALUES(${result[0].startValidation},${result[0].endValidation})`)
                db_connection.connection.execute(`DELETE FROM validators_cycle_history WHERE date_start>${result[0].startValidation} and (date_start-${result[0].startValidation})/(60*60)<15`)
            }
            db_connection.connection.execute(`INSERT INTO status (electionId,totalValidators,onlineValidators,startValidation,endValidation,startNextElection,endElection,tpsAvg,startElection,id) values`+
            `(${res.electionId},${res.totalValidators},${res.onlineValidators},${res.startValidation},${res.endValidation},${res.startNextElection},${res.endElection},${res.tpsAvg[0]},${res.startElection},1)`+
            ` ON DUPLICATE KEY UPDATE electionId=${res.electionId},totalValidators=${res.totalValidators},onlineValidators=${res.onlineValidators},startValidation=${res.startValidation},endValidation=${res.endValidation},startNextElection=${res.startNextElection},endElection=${res.endElection},startElection=${res.startElection},tpsAvg=${res.tpsAvg[0]}`,(err,res)=>{if(err)console.log(err);})   
            emitter.emit('data_change',{electionId:res.electionId,totalValidators:res.totalValidators,onlineValidators:res.onlineValidators,startValidation:res.startValidation,endValidation:res.endValidation,startNextElection:res.startNextElection,endElection:res.endElection,tpsAvg:res.tpsAvg[0],startElection:res.startElection})
        })
        return res
    }
    return undefined
    
}

export {get_status}