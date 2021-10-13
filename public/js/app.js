
console.log('client js loaded')



const weatherForm  = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message_one')
const messageTwo = document.querySelector('#message_two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Searching...'
    messageTwo.textContent = ''

    const location = search.value
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageTwo.textContent = data.error
                messageOne.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = `${data.forecast.description} and ${data.forecast.temperature} degrees`
            }
        })
    })
})