Webcam.set({
    width:359,
    height:304,
    image_format:"png",
    png_quality:90,
    });
    
    camera=document.getElementById("camera");
    Webcam.attach("#camera");
    
    function Click(){
        Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='Capture_image'src='"+data_uri+"'>"
        });
    }
    console.log("ml5 version= ",ml5.version);
    classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hD8c_v5eI/model.json",modelLoaded);
    
    function modelLoaded(){
        console.log("Model Has Loaded");
    }
    function say(){
        var synth=window.speechSynthesis;
        speak_data1="The 1st Prediction is "+prediction_1;
        speak_data2="The 2nd Prediction is "+prediction_2;
        var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
        utterThis.rate=0.7;
        synth.speak(utterThis);
        }
        function Verify()
        {
            img=document.getElementById("Capture_image");
            classifier.classify(img,gotResult);
        }
        function gotResult(error,results){
        if (error){
            console.error(error);   
        }
        else {
            console.log(results);
            prediction_1=results[0].label;
            prediction_2=results[1].label;
            document.getElementById("result_emotion_name1").innerHTML=prediction_1;
            document.getElementById("result_emotion_name2").innerHTML=prediction_2;
            say();
            if (prediction_1=="Victory"){
                document.getElementById("update_emoji1").innerHTML="&#9996";
            }
            if (prediction_1=="Thumbs Up"){
                document.getElementById("update_emoji1").innerHTML="&#128077";
            }
            if (prediction_1=="Awesome"){
                document.getElementById("update_emoji1").innerHTML="&#128076";
            }
            if (prediction_2=="Victory "){
                document.getElementById("update_emoji2").innerHTML="&#9996";
            }
            if (prediction_2=="Thumbs Up"){
                document.getElementById("update_emoji2").innerHTML="&#128077";
            }
            if (prediction_2=="Awesome"){
                document.getElementById("update_emoji2").innerHTML="&#128076";
            }
        }
        }