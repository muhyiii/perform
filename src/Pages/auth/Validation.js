
const Validation = (values) => {
    let errors = {}

    if(!values.username) {
        errors.username = "Name Required"
    }
    

    if(!values.password) {
        errors.password = "Password  Required"
    }
    else if (values.password.length < 8 ) {
        errors.password = "Password must be more than 8 character"
    } 
    return errors;
}

export default Validation;