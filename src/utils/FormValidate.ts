
import Languages from '@/commons/Languages';
import Validate from './Validate';


const validateEmoji = (username: string) => {
    return /!(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/.test(
        username
    );
};
const validateNumber = (username: string) => {
    const reg = /^([^0-9]*)$/;
    return reg.test(username);
};
const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validatePhone = (username: string) => {
    const reg = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return reg.test(username);
};
function userNameValidate (userName: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(userName)) {
        errMsg = Languages.errorMsg.userNameRequired;
    } else if (userName.length < 8) {
        errMsg = Languages.errorMsg.userNameLength;
    } else if (!validateEmoji(userName) && !validateNumber(userName)) {
        errMsg = Languages.errorMsg.userNameRegex;
    }
    return errMsg;
}
function emailValidate (email: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(email)) {
        errMsg = Languages.errorMsg.emailNull;
    } else if (!validateEmail(email)) {
        errMsg = Languages.errorMsg.emailRegex;
    }
    return errMsg;
}
function cardValidate (card: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(card)) {
        errMsg = Languages.errorMsg.cardNull;
    } else if (validateNumber(card)) {
        errMsg = Languages.errorMsg.cardRegex;
    } else if (card.length < 9 || card.length > 12) {
        errMsg = Languages.errorMsg.cardCheck;
    }
    return errMsg;
}

function passValidate (pwd: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(pwd)) {
        errMsg = Languages.errorMsg.pwdNull;
    } else if (pwd.length < 6) {
        errMsg = Languages.errorMsg.pwdCheck;
    }
    return errMsg;
}
function passConFirmValidate (pwd: string, conFirmPwd: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(conFirmPwd)) {
        errMsg = Languages.errorMsg.pwdNull;
    } else if (pwd !== conFirmPwd) {
        errMsg = Languages.errorMsg.conFirmPwd;
    }
    return errMsg;
}
function passConFirmPhone (phone: string) {
    let errMsg = '';
    if (Validate.isStringEmpty(phone)) {
        errMsg = Languages.errorMsg.phoneIsEmpty;
    } else if (!validatePhone(phone)) {
        errMsg = Languages.errorMsg.phoneRegex;
    } else if (phone.length < 10 || phone.length > 10) {
        errMsg = Languages.errorMsg.phoneCount;
    }
    return errMsg;
}
function inputValidate (value: any, errEmpty: string, errSyntax?: any) {
    let errMsg = '';
    if (Validate.isStringEmpty(value)) {
        errMsg = errEmpty;
    } else if (value.length > 15) {
        errMsg = errSyntax;
    }
    return errMsg;
}
function birthdayValidator (value: string) {
    let errMsg = '';
    const regexVar = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/; // add anchors; use literal
    const regexVarTest = regexVar.test(value); // pass the string, not the Date
    const userBirthDate = new Date(value.replace(regexVar, '$3-$2-$1')); // Use YYYY-MM-DD format
    const todayYear = new Date().getFullYear(); // Always use FullYear!!
    const cutOff19 = new Date(); // should be a Date
    cutOff19.setFullYear(todayYear - 18); // ...
    const cutOff95 = new Date();
    cutOff95.setFullYear(todayYear - 95);
    if (Validate.isStringEmpty(value)) {
        errMsg = Languages.errorMsg.birthdayEmpty;
    } else if (!regexVarTest) {
    // Test this before the other tests
        errMsg = Languages.errorMsg.birthdayNotNumber;
    } else if (userBirthDate > cutOff19) {
        errMsg = Languages.errorMsg.birthdayAge18;
    } else if (userBirthDate < cutOff95) {
        errMsg = Languages.errorMsg.birthdayAge95;
    } else {
        errMsg = '';
    }
    return errMsg;
}

function checkOldPwd (oldPass: string) {
    let err = '';
    const str = '12345678';
    if (Validate.isEmpty(oldPass) ) {
        err = Languages.errorMsg.errMsgEmpty;
    } else if (oldPass.length < 8 ) {
        err = Languages.errorMsg.errMsgLength;
    } else if (Validate.checkSpecialChar(oldPass)) {
        err = Languages.errorMsg.errMsgSpecialChar;
    }else if (oldPass !== oldPass.trim()) {
        err = Languages.errorMsg.errMsgSpaceChar;
    }else if (oldPass !== str) {
        err = Languages.errorMsg.errMsgOldPwdCompare;
    } 
    return err;
  
}

function checkNewPwd (newPass: string) {
    let err = '';
    if (Validate.isEmpty(newPass)) {
        err = Languages.errorMsg.errMsgEmpty;
    } else if (newPass.length < 8) {
        err = Languages.errorMsg.errMsgLength;
    }else if (Validate.checkSpaceChar(newPass)) {
        err = Languages.errorMsg.errMsgSpaceChar;
    } else if(!Validate.upperOneChar(newPass)) {
        err = Languages.errorMsg.errMsgUpperChar;
    }else if(Validate.checkSpecialChar(newPass)) {
        err = Languages.errorMsg.errMsgSpecialChar;
    }
    return err ;
  
}

function checkCurrentPwd (newPass: string, currentNewPwdChecked: string) {
    let err = '';
    if (Validate.isEmpty(currentNewPwdChecked)) {
        err = Languages.errorMsg.errMsgEmpty;
    } else if (currentNewPwdChecked.length < 8) {
        err = Languages.errorMsg.errMsgLength;
    } else if (Validate.checkSpaceChar(currentNewPwdChecked)) {
        err = Languages.errorMsg.errMsgSpaceChar;
    }else if (Validate.checkSpecialChar(currentNewPwdChecked)) {
        err = Languages.errorMsg.errMsgSpecialChar;
    }else if (!Validate.upperOneChar(currentNewPwdChecked)) {
        err = Languages.errorMsg.errMsgUpperChar;
    }else if (newPass !== currentNewPwdChecked) {
        err = Languages.errorMsg.errMsgCurrentPwdCompare;
    } 
    return err ;
  
}
export default {
    userNameValidate,
    emailValidate,
    cardValidate,
    passValidate,
    passConFirmValidate,
    passConFirmPhone,
    inputValidate,
    birthdayValidator,
    checkOldPwd,
    checkCurrentPwd,
    checkNewPwd
};
