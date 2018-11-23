export default {
    returnPassportNumber: {
        value: '',
        visited: false,
        error: ''
    },
    returnBirthDate: {
        value: '',
        visited: false,
        error: ''
    },
    showReturnForm: 0,
    showPopup: 0,
    showLoader: 0,
    currentHint: '',
    currentStep: 0,
    priceInPounds: 15.4,
    totalPrice: 0,
    currency: {
        value: 'gbp',
        label: '£ - GBP'
    },
    currencies: [
        {
            value: 'gbp',
            label: '£ - GBP'
        },
        {
            value: 'usd',
            label: '$ - USD'
        },
        {
            value: 'eur',
            label: '€ - EUR'
        }
    ],

    valdationData: "",

    cardNumber: {
        value: '',
        error: '',
        visited: false
    },
    cardholderName: {
        value: '',
        error: '',
        visited: false
    },
    cardExpirationDate:{
        value: '',
        error: '',
        visited: false
    },
    cardCVV:{
        value: '',
        error: '',
        visited: false
    },
    cardpostCode: {
        value: '',
        error: '',
        visited: false
    },
    cardstreetAddress: {
        value: '',
        error: '',
        visited: false
    },
    paymentId: '',
    referenceNumber: '',


    /********THIS DATA FOR STEPSNAVIGATION COMPONENT**********/
    steps: [
        {
            stepName: 'Before You Begin',
            visited: false
        },
        {
            stepName: 'service details',
            visited: false
        },
        {
            stepName: 'personal details',
            visited: false
        },
        {
            stepName: 'your visit',
            visited: false
        },
        {
            stepName: 'payment',
            visited: false
        }
    ],

    /*************USER'S INPUT STEP 1************/
    groupSize: {
        value: '',
        error: '',
        visited: false
    },
    numberOfEntries: {
        value: '',
        error: '',
        visited: false
    },
    purpose: {
        value: '',
        error: '',
        visited: false
    },
    countryApplyIn: {
        value: '',
        error: '',
        visited: false
    },
    registration: {
        value: '',
        error: '',
        visited: false
    },
    delivery: {
        value: '',
        error: '',
        visited: false
    },

    /*************USER'S INPUT STEP 2************/
    visitors: [],
    email: {
        value: '',
        error: '',
        visited: false
    },
    phone: {
        value: '',
        error: '',
        visited: false
    },
    autoType: {
        value: '',
        error: '',
        visited: false
    },
    autoModel: {
        value: '',
        error: '',
        visited: false
    },
    autoColor: {
        value: '',
        error: '',
        visited: false
    },
    autoNumber: {
        value: '',
        error: '',
        visited: false
    },

    /*************USER'S INPUT STEP 3************/
    arrivalDate1: {
        value: '',
        error: '',
        visited: false
    },
    arrivalDate2: {
        value: '',
        error: '',
        visited: false
    },
    departureDate1: {
        value: '',
        error: '',
        visited: false
    },
    departureDate2: {
        value: '',
        error: '',
        visited: false
    },
    locations: [
        {
            city: {
                value: '',
                error: '',
                visited: false
            },
            hotel: {
                value: '',
                error: '',
                visited: false
            },
            OptionsHotels:
                [
                    {
                        value: '',
                        label: ''
                    }
                ]
        }
    ],
    userNeedsNewsletter: {
        value: '',
        error: '',
        visited: false
    },
    userNeedsJoinMailingList: {
        value: '',
        error: '',
        visited: false
    },

    /*************USER'S INPUT STEP 4************/
    userCompleteForm: {
        value: '',
        visited: false
    },
    userFirstName: {
        value: '',
        error: '',
        visited: false
    },
    userSurname: {
        value: '',
        error: '',
        visited: false
    },
    userHouseNumber: {
        value: '',
        error: '',
        visited: false
    },
    userPostcode: {
        value: '',
        error: '',
        visited: false
    },
    userCardType: {
        value: '',
        error: '',
        visited: false
    },
    userCardNumber: {
        value: '',
        error: '',
        visited: false
    },
    userExpiryDate: {
        value: '',
        error: '',
        visited: false
    },
    userCCV: {
        value: '',
        error: '',
        visited: false
    },
    completePayment: 0,

    /****ERRORS****/
    errors: [],

    /*******DATA FROM SERVER**********/
    OptionsGroupSize: [
        {
            value: '1',
            label: '1'
        },
        {
            value: '2',
            label: '2'
        }
    ],
    OptionsNumberOfEntries: [
        {
            value: '',
            label: ''
        }
    ],
    OptionsPurpose: [
        {
            value: '',
            label: ''
        }
    ],
    OptionsRegistration: [
        {
            value: '',
            label: ''
        }
    ],
    OptionsDelivery: [
        {
            value: '',
            label: ''
        }
    ],
    OptionsCities: [
        {
            value: '',
            label: ''
        }
    ],
    OptionsHotels: [
        {
            value: '',
            label: ''
        }
    ],
    OptionsAutoModels: [
        {
            value: '',
            label: ''
        }
    ],
    OptionsAutoColors: [
        {
            value: '',
            label: ''
        }
    ],
    OptionsCardType: [
        {
            value: 'Visa Debit',
            label: 'Visa Debit'
        },
        {
            value: 'Master Card',
            label: 'Master Card'
        }
    ],

    countryApplyInNotesText: '',
    countryApplyInFullName: ''
};
