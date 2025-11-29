
let isButtonShaking = false;
const SHAKE_DISTANCE = "250px";
const submitButton = document.querySelector(".btn-custom");

function setError() {
    submitButton.classList.add("bg-danger");
    submitButton.style.cursor = "not-allowed";
    isButtonShaking = true;
}

function clearError() {
    submitButton.classList.remove("bg-danger");
    submitButton.style.marginLeft = "0px";
    submitButton.style.cursor = "pointer";
    isButtonShaking = false;
}

function toggleButtonPosition() {
    if (isButtonShaking) {
        if (submitButton.style.marginLeft === "0px" || submitButton.style.marginLeft === "") {
            submitButton.style.marginLeft = SHAKE_DISTANCE;
        } else {
            submitButton.style.marginLeft = "0px";
        }
    }
}

function validate(regex, input) {
    const errorMsg = input.nextElementSibling;
    const isValid = regex.test(input.value);

    if (isValid) {
        errorMsg.classList.add("invisible");
        clearError();
        input.style.borderColor = "";
        return true;
    } else {
        errorMsg.classList.remove("invisible");
        input.style.borderColor = "red";
        submitButton.classList.add("animate__animated", "animate__shakeX");
        setError();
        return false;
    }
}

function validtereEnterPssword(passwordInput, reenterPasswordInput) {
    if (reenterPasswordInput.value === passwordInput.value && passwordInput.value !== "") {
        reenterPasswordInput.nextElementSibling.classList.add("invisible");
        clearError();
        reenterPasswordInput.style.borderColor = "";
        return true;
    } else {
        reenterPasswordInput.nextElementSibling.classList.remove("invisible");
        reenterPasswordInput.nextElementSibling.style.color = "red";
        reenterPasswordInput.style.borderColor = "red";
        submitButton.classList.add("animate__animated", "animate__shakeX");
        setError();
        return false;
    }
}

export { validate, validtereEnterPssword, toggleButtonPosition, submitButton };
