// Sign In Variables
var signIn = document.getElementById("signIn")
var signInEmail = document.getElementById("signInEmail")
var signInPassWord = document.getElementById("signInPassWord")
var signInLink = document.getElementById("signInLink")
var signInBtn = document.getElementById("signInBtn")
var signInMsg = document.getElementById("signInMsg")

// Sign UP Variables
var signUp = document.getElementById("signUp")
var signUpName = document.getElementById("signUpName")
var signUpEmail = document.getElementById("signUpEmail")
var signUpPassWord = document.getElementById("signUpPassWord")
var signUpBtn = document.getElementById("signUpBtn")
var signUpMsg = document.getElementById("signUpMsg")
var signUpLink = document.getElementById("signUpLink")

// Welcome Variables
var welcome = document.getElementById("welcome")
var welcomMsg = document.getElementById("welcomMsg")

// Users' Variables
var users = []
if(localStorage.getItem("users") != null){
    users = JSON.parse(localStorage.getItem("users"))
}
var user = {}
if(localStorage.getItem("user") != null){
    user = JSON.parse(localStorage.getItem("user"))
}

// Login Statues Variable
var isLogeddin = false
if(localStorage.getItem("userStatus") != null){
    isLogeddin = JSON.parse(localStorage.getItem("userStatus"))
}
// login check
if(isLogeddin){
    welcomeDisplay()
}else{
    signInDisplay()
}


// Logout Variables
var logoutBtn = document.getElementById("logoutBtn")


function addUser(){
    user = {
        name : signUpName.value , 
        email : signUpEmail.value , 
        password : signUpPassWord.value
    }
    if((isNotExist())&&(signUpInputsValidation())){
        users.push(user)
        localStorage.setItem("users" , JSON.stringify(users))
        clearInputs()
        signUpMsg.style.color = "#17A2B8"
        signUpMsg.innerHTML = "Success"
    }
}
function isNotExist(){
    var emailNotExist = true
    for(var i = 0 ; i<users.length ;i++ ){
        if(user.email == users[i].email){
            emailNotExist = false
            signUpMsg.style.color = "#DC3545"
            signUpMsg.innerHTML = "This email is already exist"
            break
        }
    }
    return emailNotExist
}
function signUpInputsValidation(){
    var name = true
    var email = true
    var password = true
    if(signUpName.value == ""){
        name = false
        signUpMsg.style.color = "#DC3545"
        signUpMsg.innerHTML = "name is required"
    }else if(signUpEmail.value == ""){
        email = false
        signUpMsg.style.color = "#DC3545"
        signUpMsg.innerHTML = "email is required"
    }else if(signUpPassWord.value == ""){
        password = false
        signUpMsg.style.color = "#DC3545"
        signUpMsg.innerHTML = "password is required"
    }
    return (name && email && password)
}
function signInInputsValidation(){
    var email = true
    var password = true
    if(signInEmail.value == ""){
        email = false
        signInMsg.style.color = "#DC3545"
        signInMsg.innerHTML = "email is required"
    }else if(signInPassWord.value == ""){
        password = false
        signInMsg.style.color = "#DC3545"
        signInMsg.innerHTML = "password is required"
    }
    return (email && password)
}
function clearInputs(){
    signUpName.value = ""
    signUpEmail.value = ""
    signUpPassWord.value = ""
}
function clearSigninInputs(){
    signInEmail.value = ""
    signInPassWord.value = ""
}
function signInValidation(){
    var isUser = false
    var isCorrectData = false
    if(signInInputsValidation()){
        if(localStorage.getItem("users") == null){
            signInMsg.style.color = "#DC3545"
            signInMsg.innerHTML = "Incorrect email or password. if you not a user Please sign up first"
        }

        for (var i = 0 ; i<users.length ; i++){
            if(users[i].email.toLowerCase() == signInEmail.value.toLowerCase()){
                isUser = true
                if(users[i].password == signInPassWord.value){
                    isCorrectData = true
                    user = users[i]
                    localStorage.setItem("user" , JSON.stringify(user))
                }else{
                    signInMsg.style.color = "#DC3545"
                    signInMsg.innerHTML = "This is a wrong password"
                }
                break
            }
        }
        if(isUser == false){
            signInMsg.style.color = "#DC3545"
            signInMsg.innerHTML = "This Email is a wrong Email"
        }
    }
    if (isUser && isCorrectData){
        isLogeddin = true
        localStorage.setItem("userStatus" , JSON.stringify(isLogeddin))
        welcomeDisplay()
    }
}
function welcomeDisplay(){
    signIn.style.display = "none"
    signUp.style.display = "none"
    welcome.style.display = "flex"
    welcomMsg.innerHTML = `Welcome ${user.name}`
}
function signInDisplay(){
    signIn.style.display = "block"
    signUp.style.display = "none"
    welcome.style.display = "none"
    clearSigninInputs()
    signInMsg.innerHTML = ""
}
function signUpDisplay(){
    signUp.style.display = "block"
    signIn.style.display = "none"
    welcome.style.display = "none"
}

function logout(){
    isLogeddin = false
    localStorage.setItem("userStatus" , JSON.stringify(isLogeddin))
    user = {}
    localStorage.setItem("user",JSON.stringify(user))
    signInDisplay()
}
signUpBtn.addEventListener("click" , addUser)
signInLink.addEventListener("click" , signInDisplay)
signInBtn.addEventListener("click" , signInValidation)
signUpLink.addEventListener("click" , signUpDisplay)
logoutBtn.addEventListener("click" , logout )

signInEmail.addEventListener("keydown" , function(e){
    if(e.key == "Enter"){
        signInValidation()
    }
})
signInPassWord.addEventListener("keydown" , function(e){
    if(e.key == "Enter"){
        signInValidation()
    }
})
signUpName.addEventListener("keydown" , function(e){
    if(e.key == "Enter"){
        addUser()
    }
})

signUpEmail.addEventListener("keydown" , function(e){
    if(e.key == "Enter"){
        addUser()
    }
})
signUpPassWord.addEventListener("keydown" , function(e){
    if(e.key == "Enter"){
        addUser()
    }
})

