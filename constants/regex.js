module.exports = Object.freeze({
    //nameRegex: /^[a-zA-Z]+$/,
    nameRegex: /^[\w -]+( \w+)*$/,
    phoneRegex: /\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
    usernameRegex: /\S+/,
    passwordRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
});