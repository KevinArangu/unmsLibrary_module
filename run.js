const { createClient } = require('./unmsLibrary');
const unms = require('./unmsLibrary');

const mainProcess = async ()=> {
    
    let cliente = {
        "previousIsp": "CANTV",
        "isLead": true,
        "clientType": 1,
        "firstName": "Victoria",
        "lastName": "Aranguren",
        "street1": "intercomunal cabudare",
        "street2": "las mercedes",
        "city": "cabudare",
        "zipCode": "3001",
        "fullAddress": "",
        "invoiceAddressSameAsContact": true,
        "note": "Esto es una nota",
        //"addressGpsLat": 37.3832548351597,
        //"addressGpsLon": -121.931131237113,
        "contacts": [{
            //"id": 25814979,
            "email": "victor@example.com",
            "phone": "",
            "name": "",
            "isBilling": false,
            "isContact": false
        }]
    }
    let quote ={
        adminNotes: null,
        clientCity: null,
        clientCompanyName: null,
        clientCompanyRegistrationNumber: null,
        clientCompanyTaxId: null,
        clientCountryId: 254,
        clientFirstName: "algo",
        clientLastName: "gimenez",
        clientStateId: null,
        clientStreet1: null,
        clientStreet2: null,
        clientZipCode: null,
        createdDate: "2020-10-08T12:29:01-0400",
        notes: null,
        items: [
            {
                label: "Antena",
                price: 50,
                productId: 6,
                quantity: 1,
                tax1Id: 2,
                tax2Id: null,
                tax3Id: null,
                unit: null,
            },
        ],
        number: "000000019", //CAMBIAR
        organizationBankAccountField1: null,
        organizationBankAccountField2: null,
        organizationBankAccountName: null,
        organizationCity: "BARQUISIMETO",
        organizationCountryId: 254,
        organizationName: "Intercom Servicios",
        organizationRegistrationNumber: "J40561447-1",
        organizationStateId: null,
        organizationStreet1: null,
        organizationStreet2: null,
        organizationTaxId: null,
        organizationZipCode: "3001",
        quoteTemplateId: 1000,
    }

    //unms.createClient(cliente);

    const status = await unms.createQuote(13595, quote);
    console.log(status);

}; 
mainProcess();
