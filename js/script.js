const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.music-progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#music-title')
const cover = document.querySelector('#music-cover')
const totaldur = document.querySelector('#totaldur')
const currtime = document.querySelector('#currtime')

// Song title
const songs = ['music1', 'music2', 'music3']

// songs length
// let songIndex = songs.length
let songIndex = 2

console.log(`song length: ${songs.length}`)
console.log(`song type: ${typeof(songs)}`)

// load song into DOM
loadSong(songs[songIndex])

// update song detail(title, cover, mp3 file)
function loadSong(song) {
    title.innerText = song
    audio.src = `../mp3/${song}.mp3`
    cover.src = `../img/${song}.jpg`
    
    console.log(`title: ${title.innerText}`)
    console.log(`audio: ${audio.src}`)
    console.log(`cover: ${cover.src}`)
}

function playSong() {
    musicContainer.classList.add('play')
    // playBtn.querySelector('i').innerText = '||'
    playBtn.innerText = '||'
    
    audio.play()
}
function pauseSong() {
    musicContainer.classList.remove('play')
    // playBtn.querySelector('i').innerText = '>'
    playBtn.innerText = '>'

    audio.pause()
}

function prevSong() {
    // decrease song index
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    // increase song index
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(eventObject) {
    const {duration, currentTime} = eventObject.srcElement
    const progressPercent = (currentTime / duration) * 100
    
    progress.style.width = `${progressPercent}%`

    // display durtime
    // progressDur = duration - currentTime
    // currtime.innerText = `${currentTime}`
    // totaldur.innerText = `${progressDur}`
}

function setProgress(eventObject) {
    const width = this.clientWidth
    const clickX = eventObject.offsetX
    const duration = audio.duration
    console.log(clickX) 

    audio.currentTime = (clickX / width) * duration
}

// event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    } else {
        playSong()
    }
})

// change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('ended', nextSong)

progressContainer.addEventListener('click', setProgress)


console.log(`song index: ${songIndex}`)