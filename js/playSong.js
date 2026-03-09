const audio = document.getElementById('attentionAudio');
const playButton = document.getElementById('playButton');

audio.volume = 0.1;

playButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = '⏸ Pause';
    } else {
        audio.pause();
        playButton.textContent = '▶ Play';
    }
});
    