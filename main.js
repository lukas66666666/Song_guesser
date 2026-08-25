const ACCESS_TOKEN = process.env.ACCESS_TOKEN

const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click", function (){
    let input = document.getElementById("songInput").value

    fetch(`https://api.genius.com/search?q=${input}`, 
    {
        headers: {
            authorization: `Bearer ${ACCESS_TOKEN}`
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
})

