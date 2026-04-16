async function nameValidator(input) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    if (!regex.test(input)) return {passed: false, message: "You must give a valid name."};
    return {passed: true, message: undefined};
}

export default nameValidator;