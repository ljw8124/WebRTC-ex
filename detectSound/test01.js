
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
        
        /*
        interval를 사용하는 것보다 별개로 작동하는 requestAnimationFrame을 사용하는 것도 대안으로 가능.
        ex)
        const soundReqAni = requestAnimationFrame(반복할 함수명);
        
        clear 할때는 cancelAnimationFrame(함수명);
        */
        
        // 이 때 clear 는 clearInterval()
        meterRefresh = setInterval(() => {
            //soundmeter에서는 for를 너무 많이 돌아서 여기서 감지하는 것이 좋음
            console.warn(soundMeter.detectedVolume.toFixed(2));
            // detectedVolume 을 이용해서 값에 따라 말하고 있는지 체크가 가능하고,
            // <meter> 를 이용하여 음성 인식이 가능하게끔 개발이 가능함
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
   // 만약 meterRefresh 가 죽지 않는다면, start 할 때 meterRefresh 가 존재하는지 점검하고 clear 하는게 
}

document.getElementById('start').onclick = start;
document.getElementById('stop').onclick = stop;
