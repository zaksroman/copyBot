import {INTERVAL, VALETS, ETHERSCAN_API_KEY} from "./constants.js";
import {sendMessagesToChat} from "./tg_bot.js";

const getValetTxList = async (address) => {
    try {
        const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&offset=3&page=1&sort=desc&tag=latest&apikey=${ETHERSCAN_API_KEY}`);
        const result = await response.json()

        if (result.message !== 'OK' || !Array.isArray(result.result)) {
            throw new Error(result)
        }
        return result.result;
    } catch (e) {
        await sendMessagesToChat('Пришла ошибка')
        console.log(e)
    }
}

let currentAddress = 0
const changeCurrentAddress = () => {
    currentAddress++
    if(currentAddress === VALETS.length){
        currentAddress = 0
    }
}


setInterval(async () => {
    const transactions = await getValetTxList(VALETS[currentAddress]);

    if (transactions) {
        transactions.forEach((transaction)=>{
            if(new Date().getTime() / 1000 - transaction.timeStamp <= 20) {
                console.log(new Date().getTime() / 1000 - transaction.timeStamp)
                sendMessagesToChat(`https://etherscan.io/tx/${transaction.hash}`)
            }
        })
    }

    changeCurrentAddress()
}, INTERVAL)
