let currentAudio = null;

async function getTrackInfo(title, artist) {
    const res = await fetch(`/api/get-track-info?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`);
    return res.json();
}

function playPreview(url, button) {
    if (currentAudio && currentAudio._btn === button && !currentAudio.paused) {
        currentAudio.pause();
        button.classList.remove("playing")
        return;
    }

    if (currentAudio) {
        currentAudio.pause();
        currentAudio._btn?.classList.remove("playing");
    }
    console.log("preview url:", url);
    if (!url) return;

    currentAudio = new Audio();
    currentAudio.src = url;
    currentAudio._btn = button;
    currentAudio.play().catch(err => console.error("Playback blocked:", err));
    button.classList.add("playing");

    currentAudio.addEventListener("ended", () => {
        button.classList.remove("playing");
        currentAudio = null;
    });
}

const submitBtn = document.getElementById("submitBtn")

submitBtn.addEventListener("click", function (){
    let input = document.getElementById("songInput").value
    if (document.getElementById("placeholder")) {
        document.getElementById("placeholder").style.display = "flex"
    }

    fetch(`/api/search-song?q=${encodeURIComponent(input)}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById("results").innerHTML = ""
            document.getElementById("allResults").innerHTML = ""
            for (let i=0; i < 3; i++){
                let songName = data.response.hits[i].result.title
                let songArtist = data.response.hits[i].result.primary_artist.name
                let songImage = data.response.hits[i].result.song_art_image_thumbnail_url

                document.getElementById("results").innerHTML += `
                <div class="result" id="result${i}">
                    <img src="${songImage}" class="resultImg">
                    <p class="resultName">${songName}</p>
                    <p class="resultArtist">${songArtist}</p>
                    <button class="playResult" data-title="${songName}" data-artist="${songArtist}"><svg class="playIcon" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e6e6e6"><path d="M320-202v-560l440 280-440 280Zm66.67-280Zm0 158.67L636-482 386.67-640.67v317.34Z"/></svg><svg class="pauseIcon" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e6e6e6"><path d="M523.33-200v-560H760v560H523.33ZM200-200v-560h236.67v560H200Zm390-66.67h103.33v-426.66H590v426.66Zm-323.33 0H370v-426.66H266.67v426.66Zm0-426.66v426.66-426.66Zm323.33 0v426.66-426.66Z"/></svg></button>
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
                    <p class="resultPlace" id="resultPlace${i}">${place}</p>
                    <img src="${songImage}" class="resultImgAll">
                    <div class="resultTextAll">
                        <p class="resultNameAll">${songName}</p>
                        <p class="resultArtistAll">${songArtist}</p>
                    </div>
                    <button class="playResult playAll" data-title="${songName}" data-artist="${songArtist}"><svg class="playIcon" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e6e6e6"><path d="M320-202v-560l440 280-440 280Zm66.67-280Zm0 158.67L636-482 386.67-640.67v317.34Z"/></svg><svg class="pauseIcon" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e6e6e6"><path d="M523.33-200v-560H760v560H523.33ZM200-200v-560h236.67v560H200Zm390-66.67h103.33v-426.66H590v426.66Zm-323.33 0H370v-426.66H266.67v426.66Zm0-426.66v426.66-426.66Zm323.33 0v426.66-426.66Z"/></svg></button>
                </div>
                `
            }
            document.querySelectorAll(".playResult").forEach(btn => {
                btn.addEventListener("click", async () => {
                const track = await getTrackInfo(btn.dataset.title, btn.dataset.artist);
                playPreview(track?.previewUrl, btn);
            });
        });
    })
})

document.getElementById("allResultsBtn").addEventListener("click", function (){
    document.getElementById("bgBlur").style.display = "block"
    if (window.innerWidth < 720) {
        document.getElementById("allResultsBtn").style.display = "none"
    }
})

document.getElementById("closeBtn").addEventListener("click", function (){
    document.getElementById("bgBlur").style.display = "none"
})