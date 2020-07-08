

document.addEventListener("DOMContentLoaded", (e) => {
    
    
    
    // CLOCK CODE
    let clockTimeout

    function currentTime() {
        let date = new Date() //create a new date for the current time/date
        let hour = date.getHours(); 
        let min = date.getMinutes();
        let sec = date.getSeconds();
   
        let clockObj = {
            hour: updateHour(hour),
            min: updateTime(min),
            sec: updateTime(sec),
            period: getPeriod(hour)
        }
        
        renderClock(clockObj)
    }

    const renderClock = clockObj => {
        
        const clock = document.getElementById("clock")
        console.log(clock);
        
        
        clock.innerText = clockObj.hour + " : " + clockObj.min + " : " + clockObj.sec + "  " + clockObj.period
        clockTimeout = setTimeout(() => {
            currentTime()
        }, 1000)
    }

    const updateTime = timeAttr => {
        if (timeAttr < 10) {
            return "0" + timeAttr
        }
        else {
            return timeAttr
        }
    }

    const updateHour = hour => {
        if (hour > 12) {
            return hour - 12
        } else {
            return updateTime(hour)
        }
    }

    const getPeriod = hour => {
        if (hour > 12) {
            return "PM"
        } else {
            return "AM"
        }
    }
    currentTime();

    
})

    // let userPicture
    // THIS IS JUST A TEST CODE I SETUP AFTER PROGRAMMING THE CLOCK. 
    // const clickHandler = () => {
    //     document.addEventListener("click", (e) => {
    //         const clock = document.getElementById("clock")
    //         if (!!clock) {
    //             window.clearTimeout(clockTimeout)
    //             clock.remove()
    //         } else {
    //             const main = document.querySelector("main")
    //             const clockDiv = document.createElement("div")
    //             clockDiv.id = "clock"
    //             main.append(clockDiv)
    //             currentTime()
    //         }
    //     })
    // }

     //     document.addEventListener("click", (e) => {
    //         if (e.target.className === "webcam-button"){
    //             userPicture = webcam.snap();
    //             console.log(userPicture);
    //             const aTag = document.querySelector('#download-photo')
    //             console.log(aTag);

    //             aTag.href = userPicture;
    //         } else if (e.target.id === "stop-webcam") {
    //             webcam.stop()
    //         }

    // logic for clock to remove and reappear 
    // const clock = document.getElementById("clock")
    // if (!!clock) {
    //     window.clearTimeout(clockTimeout)
    //     clock.remove()
    // } else {
    //     const main = document.querySelector("main")
    //     const clockDiv = document.createElement("div")
    //     clockDiv.id = "clock"
    //     main.append(clockDiv)
    //     currentTime()
    // }
    
    // clickHandler()

     // ////////////////////////////////////////////////////////////////////////////////////

    //  daily weather 
    const getWeather = () => {
        
        fetch("https://community-open-weather-map.p.rapidapi.com/weather?units=imperial&mode=json&q=New%20York%20City", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "24b2cda067msh2a4ec3174095422p16f831jsnaa780bc8bc02"
            }
        })
            .then(response => {
                response.json();
                console.log(response);
                
            })
            .then(json => {
                console.log(json);
                
            })
            .catch(err => {
                console.log(err);
            });
    }
    // ////////////////////////////////////////////////////////////////////////////////////
//    webcam


    // const webcamElement = document.getElementById('webcam');
    // const canvasElement = document.getElementById('canvas');
    // const webcam = new Webcam(webcamElement, 'user', canvasElement);
    // webcam.start()
    //     .then(result => {
    //         console.log("webcam started");
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    // let picture = webcam.snap();
    // document.querySelector('#download-photo').href = picture;



// sunrise animation
// "<body id="page-top">
//     <div class="wrapper">
//         <div class="round"><svg width="550" height="572" viewBox="0 0 550 572" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M549.132 120.978L396.651 292.621L537.723 473.873L327.33 381.808L198.623 571.94L221.074 343.397L0.455872 279.653L224.725 230.471L217.083 0.943176L333.237 199.089L549.132 120.978Z" fill="#FFEF5B" />
//         </svg>
//         </div>
//         <div class="wrapper-2">
//             <div class="img-area">
//                 <div class="img-area">
//                     <img class="bed" src="https://pixabay.com/get/54e8d04b435aa914f6da8c7dda35367b1c3bdeec5b567249_1280.png" alt="bed">
//         </div>
//                 </div>
//             </div>
//         </div>"