function remortgageRequest() {
    return {
        remortgage: remortgageData(),
        ...baseRequest(),
    };
}

function purchaseRequest() {
    return {
        purchase: purchaseData(),
        ...baseRequest(),
    };
}

function remortgageData() {
    return {
        additionalBorrowing: 100000,
        balance: 20000,
        monthlyPayment: 500,
        yearsRemaining: 5,
    }
}

function purchaseData() {
    return {
        purchasePrice: 150000,
    }
}

function baseRequest() {
    return {
        applicants: [
            applicant(),
            applicant(),
        ],
        term: 10,
    };
}

function applicant() {
    return {
        firstName: 'Test',
        lastName: 'Applicant',
    };
}

module.exports = {
    remortgageRequest, purchaseRequest, baseRequest, remortgageData, purchaseData, applicant,
};
