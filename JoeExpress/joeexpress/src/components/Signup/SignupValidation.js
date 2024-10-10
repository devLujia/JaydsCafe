function Validation(values){    
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^.{8,}$/;
    const phone_pattern = /^09\d{9}$/;

    if (values.name === "") {
        error.name = "Please enter name";
    } else {
        error.name = "";
    }

    if (values.address === "") {
        error.address = "Please enter your address";
    } else {
        error.address = "";
    }

    if (values.email === "" || !email_pattern.test(values.email)) {
        error.email = "Please enter a valid email";
    } else {
        error.email = "";
    }

    if (!password_pattern.test(values.password)) {
        error.password = "Password must be at least 8 characters";
    } else {
        error.password = "";
    }

    if (values.pnum === "" || !phone_pattern.test(values.pnum)) {
        error.pnum = "Please enter a valid phone number (e.g., 09123456789)";
    } else {
        error.pnum = "";
    }

    return error;

}

export default Validation;