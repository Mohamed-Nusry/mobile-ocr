/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

var span = document.getElementsByClassName("close")[0];

var modal = document.getElementById("myModal");

span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("convertedText").innerHTML =  '';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementById("convertedText").innerHTML =  '';
    }
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

document.getElementById("openCamera").addEventListener("click", function() {

    // var array = ['asa','asasasasasa','bbhbhdjvcdsbjh']

   
    

    modal.style.display = "block";

    navigator.camera.getPicture(onSuccess, onFail, { quality: 100, correctOrientation: true });

    function onSuccess(imageData) {
        document.getElementById("openCamera").innerHTML = 'Please Wait';
        textocr.recText(0, /*3,*/ imageData, onSuccess, onFail); // removed returnType (here 3) from version 2.0.0
        // for sourceType Use 0,1,2,3 or 4
        // for returnType Use 0,1,2 or 3 // 3 returns duplicates[see table]
        function onSuccess(recognizedText) {
                //var element = document.getElementById('pp');
                //element.innerHTML=recognizedText;
                //Use above two lines to show recognizedText in html
                document.getElementById("openCamera").innerHTML = 'Open Camera';
                // document.getElementById("convertedText").innerHTML = recognizedText;
                for (let index = 0; index < recognizedText.blocks.blocktext.length; index++) {
                    document.getElementById("convertedText").innerHTML =  document.getElementById("convertedText").innerHTML + " " + recognizedText.blocks.blocktext[index];
                    
                }
            
                console.log(recognizedText);
                // alert(recognizedText);
        }
        function onFail(message) {
                document.getElementById("openCamera").innerHTML = 'Open Camera';
                alert('Failed because: ' + message);
        }
    }
    function onFail(message) {
        document.getElementById("openCamera").innerHTML = 'Open Camera';
        alert('Failed because: ' + message);
    }
});
