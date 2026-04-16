function postalCodeValidator(input) {
    const postalCode = input.replace(/\D/g, "");
    return postalCode.length === 8;
}

export default postalCodeValidator;