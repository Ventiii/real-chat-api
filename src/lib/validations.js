
export const validateRegistrationData = (username, email, password) => {

    const errors = {};

    if (username.trim() === '') errors.username = 'Username field is required!';
    if (email.trim() === '') errors.email = 'Email field is required!';
    else {
        const validEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

        if (!email.match(validEmail)) errors.email = 'Email must be a valid email address! Example: email@address.com';
    }

    if (password === '') errors.password = 'Password field must not be empty!';
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

export const validateLoginData = (username, password) => {

    const errors = {};

    if (username.trim() === '') errors.username = 'Username is required!';
    if (password.trim() === '') errors.password = "Password field is required!";

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};