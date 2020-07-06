document.addEventListener("DOMContentLoaded", (e) => {
    
    
    
    // CLOCK CODE
    let clockTimeout

    function currentTime() {
        let date = new Date()
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

    let userPicture
    // THIS IS JUST A TEST CODE I SETUP AFTER PROGRAMMING THE CLOCK. 
    const clickHandler = () => {
        document.addEventListener("click", (e) => {
            if (e.target.className === "webcam-button"){
                userPicture = webcam.snap();
                console.log(userPicture);
                const aTag = document.querySelector('#download-photo')
                console.log(aTag);
                
                aTag.href = userPicture;
            } else if (e.target.id === "stop-webcam") {
                webcam.stop()
            }
        })
    }

    

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
    
    clickHandler()

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


    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    const webcam = new Webcam(webcamElement, 'user', canvasElement);
    webcam.start()
        .then(result => {
            console.log("webcam started");
        })
        .catch(err => {
            console.log(err);
        });

    // let picture = webcam.snap();
    // document.querySelector('#download-photo').href = picture;
})