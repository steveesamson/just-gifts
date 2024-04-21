
const PHONE = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/i;
const EMAIL = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
const POSTAL_CODE = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;
const CCARD = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
const URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

// export const isEmail = (input) => input.match(EMAIL);
// export const isURL = (input) => input.match(URL);
// export const isPostalCode = (input) => input.match(POSTAL_CODE);


// Validators
String.prototype.isEmpty = function () {
    return this.trim().length === 0;
}

String.prototype.isEmail = function () {
    return this.trim().match(EMAIL);
}
String.prototype.isUrl = function () {
    return this.trim().match(URL);
}

String.prototype.isPostalCode = function () {
    return this.trim().match(POSTAL_CODE);
}

String.prototype.isPhone = function () {
    return this.trim().match(PHONE);
}
String.prototype.isCreditCard = function () {
    return this.trim().match(CCARD);
}