/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
function SoundMeter(context)
{
    this.context = context;
    
    this.detectedVolume = 0.0;
    this.script = context.createScriptProcessor(2048, 1, 1);
    const thisObj = this;
    
    this.script.onaudioprocess = (evt) => {
        const input = evt.inputBuffer.getChannelData(0);
        
        let sum = 0.0;
        
        for(let i = 0; i < input.length; ++i) {
            sum += input[i] * input[i];
            if(Math.abs(input[i]) > 0.99) {
                console.error('Detect');
            }
        }
        thisObj.detectedVolume = Math.sqrt(sum / input.length);
    }
    
}

SoundMeter.prototype.connectToSource = function(stream, callback) {
    console.log('SoundMeter connecting');
    try {
        this.mic = this.context.createMediaStreamSource(stream);
        this.mic.connect(this.script);
        // necessary to make sample run, but should not be.
        this.script.connect(this.context.destination);
        if (typeof callback !== 'undefined') {
            callback(null);
        }
    } catch (e) {
        console.error(e);
        if (typeof callback !== 'undefined') {
            callback(e);
        }
    }
};

SoundMeter.prototype.stop = function() {
    console.log('SoundMeter stopping');
    this.mic.disconnect();
    this.script.disconnect();
};
