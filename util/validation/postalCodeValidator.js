async function postalCodeValidator(input) {
    const postalCode = input.replace(/\D/g, "");

    if (postalCode.length !== 8) {
        return {passed: false, message: "Invalid postal code. Please enter exactly 8 digits."};
    }

    return  {passed: true, message: undefined};
}

export default postalCodeValidator;