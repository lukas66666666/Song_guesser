const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click", function (){
    let input = document.getElementById("songInput").value

    fetch(`/api/search-song?q=${encodeURIComponent(input)}`)
        .then(response => response.json())
        .then(data => console.log(data))
})

