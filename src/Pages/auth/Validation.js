
const Validation = (values) => {
    let errors = {}

    if(!values.name) {
        errors.name = "Name Required"
    }
    else if (values.name.length < 8 ) {
        errors.name = "Name must be more than 8 character"
    } 

    if(!values.password) {
        errors.name = "Password  Required"
    }
    else if (values.name.length < 8 ) {
        errors.name = "Password must be more than 8 character"
    } 
    return errors;
}

export default Validation;