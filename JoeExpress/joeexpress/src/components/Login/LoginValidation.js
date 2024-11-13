function Validation(values){    
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^.{8,}$/

    if(values.email ===""){
        error.email = "Please enter email"
    }
    else if (!email_pattern.test(values.email)){
        error.email = "Invalid Email"
    }
    else{
        error.email = ""
    }

    if (values.password === ""){
        error.password = "Invalid Password"
    }
    else if (!password_pattern.test(values.password)){
        error.password = "Password didn't match"
    }

    else{
        error.password = ""
    }

    return error;

}

export default Validation;