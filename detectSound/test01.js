
const constraints = {
    video: false,
    audio: true
}

let meterRefresh = null;

function start()
{
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.audioContext = new AudioContext();
        
    } catch (e) {
        alert('Web Audio API not supported.');
    }
    
    navigator.mediaDevices.getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);
    
}

function handleSuccess(stream)
{
    // console.log('STREAM:', stream);
    
    window.stream = stream;
    
    const soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
    
    soundMeter.connectToSource(stream, function(e) {
        // handleError
        if (e) {
            alert(e);
            return;
        }
        
        meterRefresh = setInterval(() => {
            //soundmeter에서는 for를 너무 많이 돌아서 여기서 감지하는 것이 좋음
            console.warn(soundMeter.detectedVolume.toFixed(2));
        }, 200);
        
    });
    
    
}

function handleError(e)
{
    console.error('ERROR:', e.message, e.name);
}

function stop() {
    console.log('Stopping local stream');
    
    window.stream.getTracks().forEach(track => track.stop());
    window.soundMeter.stop();
    window.audioContext.close();
    clearInterval(meterRefresh);
   
}

document.getElementById('start').onclick = start;
document.getElementById('stop').onclick = stop;