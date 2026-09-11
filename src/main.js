const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click", function (){
    let input = document.getElementById("songInput").value

    fetch(`/api/search-song?q=${encodeURIComponent(input)}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById("results").innerHTML = ""
            for (let i=0; i < 3; i++){
                let songName = data.response.hits[i].result.title
                let songArtist = data.response.hits[i].result.primary_artist.name
                let songImage = data.response.hits[i].result.song_art_image_thumbnail_url

                document.getElementById("results").innerHTML += `
                <div class="result" id="result${i}">
                    <img src="${songImage}" class="resultImg">
                    <p class="resultName">${songName}</p>
                    <p class="resultArtist">${songArtist}</p>
                </div>
                `
            }
            document.getElementById("allResultsBtn").style.display = "block"
            for (let i=0; i < data.response.hits.length; i++){
                let songName = data.response.hits[i].result.title
                let songArtist = data.response.hits[i].result.primary_artist.name
                let songImage = data.response.hits[i].result.song_art_image_thumbnail_url
                let place = i + 1
                document.getElementById("allResults").innerHTML += `
                <div class="resultAll" id="resultAll${i}">
                    <p class="resultPlace">${place}</p>
                    <img src="${songImage}" class="resultImgAll">
                    <p class="resultNameAll">${songName}</p>
                    <p class="resultArtistAll">${songArtist}</p>
                </div>
                `
            }
        })
})

document.getElementById("allResultsBtn").addEventListener("click", function (){
    document.getElementById("allResultsContainer").style.display = "block"
})

document.getElementById("closeBtn").addEventListener("click", function (){
    document.getElementById("allResultsContainer").style.display = "none"
})