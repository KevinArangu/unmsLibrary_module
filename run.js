const { createClient, getUsers, getVtiger, getCustomAttrb, getClients, deleteClient } = require('./unmsLibrary');
const unms = require('./unmsLibrary');

const mainProcess = async ()=> {
    
    let cliente = {
        userIdent: '25814978',
        previousIsp: "CANTV",
        isLead: false,
        clientType: 1,
        firstName: "Kevin",
        lastName: "Arangu",
        street1: "intercomunal cabudare",
        street2: "las mercedes",
        city: "cabudare",
        zipCode: "3001",
        fullAddress: "",
        invoiceAddressSameAsContact: true,
        note: "Esto es una nota",
        //"addressGpsLat": 37.3832548351597,
        //"addressGpsLon": -121.931131237113,
        contacts: [{
            email: "karangu@intercomservicios.com",
            phone: "04149513409",
            name: "Kevin Arangu",
            isBilling: false,
            isContact: false
        }],
        attributes: [
            {
                customAttributeId: 14,
                value: '14',
            },
            {
                customAttributeId: 15,
                value: 'Agente1',
            }
        ],
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
    let ticket = {
        subject: "The Internet is not working",
        clientId: 13561,
        emailFromAddress: null,
        emailFromName: null,
        assignedGroupId: null,
        assignedUserId: null,
        status: 0,
        public: true,
        assignedJobIds: [],
        activity: [
          {
            userId: 1002,
            public: true,
            comment: {
              body: "When I tried to turn on my PC, I see blue screen only.",
            }
          }
        ]
    }

    //const update = await unms.addTag(13768, 1);
    //console.log(update);
  
    const update = await unms.removeTag(13768, 1);
    console.log(update);

}; 
mainProcess();
