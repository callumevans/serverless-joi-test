const { expect } = require('chai');
const getQuotesHandler = require('../src/handlers/quotes');
const requests = require('./request-builder');

const callback = (err, res) => { error = err; response = res };
let error = null;
let response = null;

const callHandler = (body) => {
    getQuotesHandler.handler({ body }, null, callback);
};

afterEach(function() {
    if (this.currentTest.state === 'failed') {
        console.error('Error:', error);
        console.error('Response:', response);
    }
});

describe('calling get-quotes', () => {
    describe('without purchase or remortgage data', () => {
        beforeEach(() => {
            callHandler(requests.baseRequest());
        });

        it('should return a 400', () => {
            expect(response.statusCode).to.equal(400);
        });
    });

    describe('with both purchase and remortgage data', () => {
        beforeEach(() => {
            const req = requests.baseRequest();
            req.purchase = requests.purchaseData();
            req.remortgage = requests.remortgageData();

            callHandler(req);
        });

        it('should return a 400', () => {
            expect(response.statusCode).to.equal(400);
        });
    });

    describe('remortgage request validation', () => {
        describe('with fully populated remortgage request', () => {
            beforeEach(() => {
                callHandler(requests.remortgageRequest());
            });

            it('should return a 200', () => {
                expect(response.statusCode).to.equal(200);
            });
        });

        describe('without additional borrowing', () => {
            beforeEach(() => {
                const req = requests.remortgageRequest();
                req.remortgage.additionalBorrowing = null;

                callHandler(req);
            });

            it('should return a 400', () => {
                expect(response.statusCode).to.equal(400);
            });
        });

        describe('without balance', () => {
            beforeEach(() => {
                const req = requests.remortgageRequest();
                req.remortgage.balance = null;

                callHandler(req);
            });

            it('should return a 400', () => {
                expect(response.statusCode).to.equal(400);
            });
        });

        describe('without monthly payment', () => {
            beforeEach(() => {
                const req = requests.remortgageRequest();
                req.remortgage.monthlyPayment = null;

                callHandler(req);
            });

            it('should return a 400', () => {
                expect(response.statusCode).to.equal(400);
            });
        });

        describe('without years remaining', () => {
            beforeEach(() => {
                const req = requests.remortgageRequest();
                req.remortgage.yearsRemaining = null;

                callHandler(req);
            });

            it('should return a 400', () => {
                expect(response.statusCode).to.equal(400);
            });
        });
    });

    describe('purchase request validation', () => {
        describe('with fully populated purchase request', () => {
            beforeEach(() => {
                callHandler(requests.purchaseRequest());
            });

            it('should return a 200', () => {
                expect(response.statusCode).to.equal(200);
            });
        });

        describe('without purchase price', () => {
            beforeEach(() => {
                const req = requests.purchaseRequest();
                req.purchase.purchasePrice = null;

                callHandler(req);
            });

            it('should return a 400', () => {
                expect(response.statusCode).to.equal(400);
            });
        });
    });

    describe('base request validation', () => {
        describe('applicants', () => {
            describe('with no applicants', () => {
                beforeEach(() => {
                    const req = requests.remortgageRequest();
                    req.applicants = [];

                    callHandler(req);
                });

                it('should return a 400', () => {
                    expect(response.statusCode).to.equal(400);
                });
            });

            describe('with 1 applicant', () => {
                beforeEach(() => {
                    const req = requests.remortgageRequest();
                    req.applicants = [
                        requests.applicant()
                    ];

                    callHandler(req);
                });

                it('should return a 200', () => {
                    expect(response.statusCode).to.equal(200);
                });
            });

            describe('applicant details', () => {
                describe('without first name', () => {
                    beforeEach(() => {
                        const req = requests.remortgageRequest();

                        const applicant = requests.applicant();
                        applicant.firstName = null;

                        req.applicants = [
                            applicant
                        ];

                        callHandler(req);
                    });

                    it('should return a 400', () => {
                        expect(response.statusCode).to.equal(400);
                    });
                });

                describe('without last name', () => {
                    beforeEach(() => {
                        const req = requests.remortgageRequest();

                        const applicant = requests.applicant();
                        applicant.lastName = null;

                        req.applicants = [
                            applicant
                        ];

                        callHandler(req);
                    });

                    it('should return a 400', () => {
                        expect(response.statusCode).to.equal(400);
                    });
                });
            });

            describe('with 2 applicants', () => {
                beforeEach(() => {
                    const req = requests.remortgageRequest();

                    req.applicants = [
                        requests.applicant(),
                        requests.applicant(),
                    ];

                    callHandler(req);
                });

                it('should return a 200', () => {
                    expect(response.statusCode).to.equal(200);
                });
            });

            describe('with 3 applicants', () => {
                beforeEach(() => {
                    const req = requests.remortgageRequest();

                    req.applicants = [
                        requests.applicant(),
                        requests.applicant(),
                        requests.applicant(),
                    ];

                    callHandler(req);
                });

                it('should return a 400', () => {
                    expect(response.statusCode).to.equal(400);
                });
            });
        });

        describe('without term', () => {
            beforeEach(() => {
                const req = requests.remortgageRequest();
                req.term = null;

                callHandler(req);
            });

            it('should return a 400', () => {
                expect(response.statusCode).to.equal(400);
            });
        });
    });
});
