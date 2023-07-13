prediction1=" ";
prediction2=" ";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 900
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';
    })
}

console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MWFV9cLYE/model.json",modelloaded);

function modelloaded(){
    console.log("modeloaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speakdata1="The first prediction is " + prediction1;
    speakdata2="The second prediction is " + prediction2;
    var utterthis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterthis);
}

function check(){
    img=document.getElementById("capture_image");;
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128522";
        }
        if(results[0].label=="sad"){
            document.getElementById("update_emoji").innerHTML="&#128542";
        }
        if(results[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML="&#128544";
        }
        if(results[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522";
        }
        if(results[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128542";
        }
        if(results[1].label=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128544";
        }
    }
}