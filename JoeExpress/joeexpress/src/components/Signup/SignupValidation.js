function Validation(values){    
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^.{8,}$/

    if(values.name ===""){
        error.name = "Please enter name"
    } 
    else{
        error.name = ""
    }

    if(values.address ===""){
        error.address = "Please enter your address"
    } 
    else{
        error.address = ""
    }

    if(values.email ===""){
        error.email = "Please enter email"
    }
    else if (!email_pattern.test(values.email)){
        error.email = "Invalid Email"
    }
    else{
        error.email = ""
    }

    if (values.password===""){
        error.password = "Please enter password"
    }
    else if (!password_pattern.test(values.password)){
        error.password = "Invalid Password"
    }
    else{
        error.password = ""
    }

    return error;

}

export default Validation;