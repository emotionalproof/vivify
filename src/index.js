// localhost command 
// npm install -g http-server
// http-server

// page loads at cover
document.addEventListener("DOMContentLoaded", (e) => {
    let mainStyleSheet = document.querySelector("#main-style")
    
    
// EVENT HANDLERS
    const clickHandler = () => {
        document.addEventListener("click", (e) => {
            if (e.target.id === "cover-container"){
               renderSignIn()
            } else if (e.target.textContent === "Click Here to Register"){
                renderRegister()
            } else if (e.target.id === "set-alarm-link"){
                e.preventDefault()
                renderSetAlarm()
            } else if (e.target.id === "home-link") {
                e.preventDefault()
                renderClockDiv()
            } else if (e.target.id === "sleep-stats") {
                renderSleepStats()
            } else if (e.target.className === "nav-link button"){
                e.preventDefault()
                addGameScript()
                renderGame()
            }
        })
    } 

    const submitHandler = () => {
        document.addEventListener("submit", (e) => {
            if (e.target.className === "form-signin") {
                e.preventDefault()
                const form = e.target
                const username = form.username.value
                const password = form.password.value
                getUser(username, password)

            } else if (e.target.className === "form-register form-signin") {
                e.preventDefault()
                const form = e.target
                const firstName = form.firstName.value
                const lastName = form.lastName.value
                const username = form.username.value
                const password = form.password.value
                const confirmPassword = form.confirmPassword.value

                newUserObj = {
                    first_name: firstName,
                    last_name: lastName,
                    username: username,
                    password: password,
                    confirm_password: confirmPassword
                }
                verifyRegistrationUsername(newUserObj)

            } else if (e.target.className === "set-wake-up-time-form") {
                e.preventDefault()
                const form = e.target
                
                

                
            }

        })
    }


// SIGN-IN

    // after clicking the cover screen, user will be taken to sign-in page
    const renderSignIn = () => {
        const div = document.querySelector("div")
        div.remove()
        const body = document.querySelector("body")
        body.className = "text-center"
        const form = document.createElement("form")
        form.className ='form-signin'
        form.innerHTML = `
            <img class="mb-4" src="../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
                <h1 id="clock"></h1>
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputUsername" class="sr-only">Username</label>
                <input name="username" type="username" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
                <label for="inputPassword" class="sr-only">Password</label>
                <input name="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required><br>
              
                <button id="signInButton" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p class="register-link mt-5 mb-3 text-muted">Click Here to Register</p><br>
                <p class="mt-5 mb-3 text-muted">&copy; 2020 Vivify</p>
        `
        body.prepend(form)
        mainStyleSheet.href = "./css/signin.css"
    
    }

    const getUser = (username, password)=> {
        fetch(`http://localhost:3000/api/v1/users/${username}`)
        .then(resp => resp.json())
        .then(userObj => {
           if (password === userObj.password){
               signInSuccess(userObj)
           } else {
               signInFail("the password you provided is incorrect.")
           }            
        })
        .catch(error => {
            signInFail("the username you provided cannot be found.")
        })
    }

    const signInSuccess = (userObj) => {
        const username = userObj.username
        setCookie("username", username)
        renderDashboard(userObj)
    }

    const signInFail = (error) => {
        const form = document.querySelector("form")
        const signInButton = document.querySelector("button#signInButton")
        const divAlert = createFailModal(error)
        
        form.insertBefore(divAlert, signInButton)
        form.password.value = ""
    }

    const createFailModal = (error) => {
        div = document.createElement("div")
        
        div.className = "alert alert-primary alert-dismissible fade show" 
        div.role = "alert"
        div.innerHTML = `
                Sorry, ${error} Please try again.<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                `
        return div
    }

//COOKIES
    const setCookie = (cookieName, cookieValue) => {
        let d = new Date();
        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    // const getCookie = (cookieName) => {
    //     let name = cookieName + "=";
    //     let ca = document.cookie.split(';');
    //     for (let i = 0; i < ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }

    // const checkCookie = () => {
    //     const username = getCookie("username")
    //     console.log(username);
        
    //     if (username != "") {
    //         alert("Welcome again " + username);
    //     } else {
    //         username = prompt("Please enter your name:", "");
    //         if (username != "" && username != null) {
    //             setCookie("username", username, 365);
    //         }
    //     }
    // }


// REGISTRATION
    const renderRegister = () => {
        const form = document.querySelector('form')
        const body = document.querySelector("body")
        form.remove()
        const h1 = document.createElement("h1")
        h1.id = "clock"
        const newForm = document.createElement("form")
        newForm.className = "form-register form-signin"
        newForm.innerHTML = `
                        <img class="mb-4" src="../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
                            <h1 class="h3 mb-3 font-weight-normal">Vivify Sign-up</h1>
                            <label for="firstName" class="sr-only">First Name</label>
                            <input name="firstName" type="text" id="inputFirstName" class="form-control" placeholder="First Name" required autofocus><br>
                            <label for="lastName" class="sr-only">Last Name</label>
                            <input name="lastName" type="text" id="inputLastName" class="form-control" placeholder="Last Name" required autofocus><br>
                            <label for="username" class="sr-only">Username</label>
                            <input name="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus><br><br>
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input name="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required autofocus><br>
                            <label for="inputConfirmPassword" class="sr-only">Confirm Password</label>
                            <input name="confirmPassword" type="password" id="inputConfirmPassword" class="form-control" placeholder="Confirm Password" required><br>
                            <button id="registerButton" class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                            <p class="mt-5 mb-3 text-muted">&copy; 2020 Vivify</p>
                                `
        body.prepend(newForm)
        body.prepend(h1)
    }

    // this function will check if the given username has already been registered.
    // if newUserObj.name comes back true, then the username is already in use
    // if it comes back false, the username is free for new registration
    const verifyRegistrationUsername = newUserObj => {
        fetch(`http://localhost:3000/api/v1/users/${newUserObj.username}`)
        .then(resp => resp.json())
        .then(userObj => {
            if (userObj.username) {
                registrationFail("this username is already taken.")
            } else {
                verifyRegistrationPassword(newUserObj)
            }
        })
        .catch(error => {
            verifyRegistrationPassword(newUserObj)
        })
    }

    const registrationFail = (error) => {
        const form = document.querySelector("form")

        const registerButton = document.querySelector("button#registerButton")
        const divAlert = createFailModal(error)

        form.insertBefore(divAlert, registerButton)
        clearFormPasswordFields()
    }

    clearFormPasswordFields = () => {
        const form = document.querySelector("form")
        if (form.confirmPassword.value) {
            form.confirmPassword.value = ""
            form.password.value = ""
        } else {
            form.password.value = ""
        }
    }

    const verifyRegistrationPassword = newUserObj => {
        if (newUserObj.password !== newUserObj.confirm_password) {
            registrationFail("the password and confirmation password do not match.")
        } else {
            postNewUser(newUserObj)
        }
    }

    const postNewUser = newUserObj => {
        return fetch("http://localhost:3000/api/v1/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newUserObj)
        })
        .then(resp => resp.json())
        .then(postedUserObj => {
            renderDashboard(postedUserObj);
        })
    }
    
  
    const currentTime = () => {
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

    const updateTime = timeAttr => {
        if (timeAttr < 10) {
            return "0" + timeAttr
        }
        else {
            return timeAttr
        }
    }

    const updateHour = hour => {
        if (hour >= 13) {
            return hour - 12
        } else if (hour < 1){
            return hour + 12
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

    let clockTimeout

    const renderClock = clockObj => {
        let clock = document.getElementById("clock")
        clock.textContent = clockObj.hour + " : " + clockObj.min + " : " + clockObj.sec + "  " + clockObj.period
        clockTimeout = setTimeout(() => {
            currentTime()
        }, 1000)
    }

    const renderDashboard = userObj => {
        currentTime()
        const style = document.querySelector("style")
        style.innerHTML = `
                    .bd-placeholder-img {
                        font-size: 1.125rem;
                        text-anchor: middle;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;
                    }

                    @media (min-width: 768px) {
                        .bd-placeholder-img-lg {
                        font-size: 3.5rem;
                    }
                }
                        `
        mainStyleSheet.href = "./css/navbar-top-fixed.css"
        const form = document.querySelector("form")
        form.remove()
        const body = document.querySelector("body")
        body.id = userObj.id
        body.innerHTML = `
                    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a class="navbar-brand" href="#">Vivify</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active nav-clock-link">
                                <a id="home-link" class="nav-link" href="#" tabindex="-1" aria-disabled="true">Clock<span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item nav-set-alarm-link">
                                <a id="set-alarm-link" class="nav-link" href="#" tabindex="-1" aria-disabled="true">Set Alarm</a>
                            </li>
                            <li class="nav-item nav-sleep-stats-link">
                                <a id="sleep-stats" class="nav-link" href="#" tabindex="-1" aria-disabled="true">Sleep Stats</a>
                            </li>
                            <li class="test-button">
                                <button id="game" class="nav-link button" href="#" tabindex="-1" aria-disabled="true">Game Test</button>
                            </li>
                        </ul>
                    </div>
                    </nav>

                    <main>
                        <div class="main">
                            <h1 id="clock">Clock</h1>
                           
                        </div>
                    </main>
                     <script src="./src/index.js"></script>
                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                    <script>window.jQuery || document.write(<script src="../assets/js/vendor/jquery.slim.min.js"><\/script></script>
                    <script src="./vendor/bootstrap/js/bootstrap.bundle.js"></script>
                        `
        console.log(userObj);
    }

    const renderSetAlarm = () => {
        // const clockH1 = document.querySelector("h1#clock")
        // clockH1.remove()
        window.clearTimeout(clockTimeout)
        const time = new Date

        const div = document.querySelector("div.main")
        div.id = "form-div"
        div.innerHTML = `
                <form class="set-wake-up-time-form">
                    <label for="alarm">Alarm (date and time):</label>
                    <input type="datetime-local" id="alarm" name="alarm" min="2017-06-01T08:30" max="2017-06-30T16:30>
                    <input type="submit" value="Submit">
                </form>
                `
        // moment.utc(1234567890000).local()
    }
    
    const renderClockDiv = () => {
        const div = document.querySelector("div.main")
        div.innerHTML = `<h1 id="clock">Clock</h1>`
        div.id = "clock-div"
        currentTime()
    }

    const renderSleepStats = () => {
        const div = document.querySelector("div.main")
        div.id = "sleep-stats"
        console.log("sleep stats");
        
    }

    const addGameScript = () => {
        const script = document.createElement("script")
        script.src ="./js/game_script.js"
       
    }

    const renderGame = () => {
        const div = document.querySelector("div.main")
        div.innerHTML = 
                            `
                    <div class="container text-center">
                ​
                    <div class="row">
                    <div class="col-md-6 mx-auto">
                        <p class="lead">Type The Given Word Within
                        <span class="text-success" id="seconds">5</span> Seconds:</p>
                        <h2 class="display-2 mb-5" id="current-word">hello</h2>
                        <input type="text" class="form-control form-control-lg" placeholder="Start typing..." id="word-input" autofocus>
                        <input type="submit" name="submit" value="OK" class="submit" autofocus>
                        <h4 class="mt-3" id="message"></h4>
                ​
                        <div class="row mt-5">
                        <div class="col-md-6">
                            <h3>Time Left:
                            <span id="time">0</span>
                            </h3>
                        </div>
                        <div class="col-md-6">
                            <h3>Score:
                                <span id="score">0</span>
                            </h3>
                        </div>
                        </div>
                       
                        <div class="row mt-5">
                        <div class="col-md-12">
                            <div class="card card-body bg-secondary text-white">
                            <h5>Instructions</h5>
                            <p>Type 2 words in the given amount of seconds to dismiss alarm. <br>
                                Good luck!</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        `
        
        init()
    }
    


    // currentTime();
    clickHandler()
    submitHandler()
    // checkCookie()
})





        
