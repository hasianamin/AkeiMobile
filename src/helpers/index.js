export const API_URL=`http://192.168.1.9:5001`

export const PriceFormatter=(val)=>{
    let temp = String(val)
    temp = temp.split('').reverse()
    console.log(temp)
    let x = 0
    for(let i=0; i < temp.length; i++){
        if(x === 3){
            x = 0
            temp.splice(i,0,',')  
        } else {
            x++
        }
    }
    temp = temp.reverse().join('')
    return temp
}