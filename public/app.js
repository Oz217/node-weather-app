// file opening indication
console.log('Index page - client js script activated')

//ger doc. objects
const weatherForm = document.querySelector('form')
const adressInp = document.querySelector('input')
const pMsg1 = document.querySelector('#msg-1')
const pMsg2 = document.querySelector('#msg-2')

//create the handler
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const adress = adressInp.value

    //clear text messages content
    pMsg1.textContent='Loading...'
    pMsg2.textContent=''

    //fetch by form input
    fetch('/weather?adress='+adress).then((response)=>{
        response.json().then((data)=>{
            if(data.Error){
                pMsg1.textContent= data.Error
            }else{
                pMsg1.textContent= data.forecast
                // pMsg2.textContent= data.forecast
            }
        })
    }) //E fetch

}) //E handler
