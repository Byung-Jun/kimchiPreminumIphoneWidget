//바이낸스
const symbol = 'BTCUSDT'
const urlBinance = `https://api.binance.com/api/v1/ticker/price?symbol=${symbol}`
const reqBinance = new Request(urlBinance)
const resBinance = await reqBinance.loadJSON()

//환율
const curr = 'USDKRW'
const urlCurrncy = `https://earthquake.kr:23490/query/${curr}`
const reqCurrncy = new Request(urlCurrncy)
const resCurrncy = await reqCurrncy.loadJSON()

//업비트
const bit = 'KRW-BTC'
const urlUpbit = `https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.${bit}`
const reqUpbit = new Request(urlUpbit)
const resUpbit = await reqUpbit.loadJSON()

let binanPrice = parseFloat(`${resBinance.price}`)
let curren = parseFloat(`${resCurrncy.USDKRW[0]}`)
let binanPriceKRW = parseFloat(binanPrice*curren)
let upbitPrice = parseFloat(`${resUpbit[0].tradePrice}`)

let kimPrice = parseFloat(upbitPrice - binanPriceKRW)
let kimchiPrice = kimPrice.toFixed()
kimchiPrice *= 1

let kimchiPremium = ( kimPrice / binanPriceKRW ) * 100

let widget = new ListWidget()
widget.backgroundColor = Color.black()

let titleTxt = widget.addText('김치프리미엄')
titleTxt.textColor = Color.white()

widget.addSpacer(5)
let txt = ''
if(kimchiPrice>0){
    txt = widget.addText('￦' + String(kimchiPrice.toLocaleString()) + '원' )
    txt.textColor = Color.red()
    
    widget.addSpacer(5)

    txtPercent = widget.addText('( +' + String(kimchiPremium.toFixed(2)) + '%)')
    txtPercent.textColor = Color.red()
}
else{    
    txt = widget.addText('￦' + String(kimchiPrice.toLocaleString()) + '원' )
    txt.textColor = Color.blue()
    
    widget.addSpacer(5)
        
    txtPercent = widget.addText('( -' + String(kimchiPremium.toFixed(2)) + '%)')
    txtPercent.textColor = Color.blue()
}


Script.setWidget(widget)
Script.complete()
