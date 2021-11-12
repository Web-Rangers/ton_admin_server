import TonWeb,{BlockSubscribe} from 'tonweb'
import {BlocksStorageImpl} from './helpers'

let tnw = new TonWeb()


async function init(){
    const onTransaction = async (shortTx) => {
        console.log('TX ' + shortTx.account);
    }
    const storage = new BlocksStorageImpl();
    let blcs = new BlockSubscribe(tnw.provider,storage,onTransaction)
    await blcs.start()
    // let transactions = await 
    tnw.getTransactions("Ef9NXAIQs12t2qIZ-sRZ26D977H65Ol6DQeXc5_gUNaUys5r").then(val =>{
        console.log(val);
    })
}
init()