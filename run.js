const { createClient, getClients, deleteClient, getServicePlan, getProducts } = require('./unmsLibrary');
const unms = require('./unmsLibrary');

const mainProcess = async () => {
    
    let cliente = {
        userIdent: '25814979',
        previousIsp: "CANTV",
        isLead: true,
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
                customAttributeId: 18,
                value: '14',
            },
            {
                customAttributeId: 19,
                value: 'Agente1',
            }
        ],
    }
    let quote = {
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
    let product = {
        "name": "UTP cable",
        "invoiceLabel": "UTP cable",
        "price": 10,
        "unit": "m",
        "taxable": false
    }
    let service = {
        "servicePlanPeriodId": 97,
    }

    const userident = await unms.getServices(139);
    console.log(userident);

//Procedimiento Ticket

    // const tickets = await unms.getTickets(45);
    // console.log((tickets.code === 404) ? "Ticket no encontrado" : tickets);

// PROCEDIMIENTO PARA CREAR COTIZACION A UN CLIENTE

    // const getproduct = await unms.getProducts(27)
    // console.log(getproduct);

    // const getproduct2 = await unms.getProducts(13)
    // console.log(getproduct2);

    // const getproduct3 = await unms.getProducts(29)
    // console.log(getproduct3);

    // let quoteClient = {
    //     items: [
    //         {
    //             label: getproduct.invoiceLabel, 
    //             price: getproduct.price, 
    //             quantity:1
    //         },
    //         {
    //             label: getproduct2.invoiceLabel, 
    //             price: getproduct2.price, 
    //             quantity:1
    //         },
    //         {
    //             label: getproduct3.invoiceLabel, 
    //             price: getproduct3.price, 
    //             quantity:1
    //         },
    //     ],
    //     organizationCity: "BARQUISIMETO",
    //     organizationName: "Intercom Servicios",
    //     organizationRegistrationNumber: "J40561447-1",
    //     organizationZipCode: "3001",
    //     quoteTemplateId: 1000,
    // }
    // const clientQuote = await unms.createQuote(13925, quoteClient)
    // console.log(clientQuote);


    // const getproduct = await unms.getProducts()
    // console.log(getproduct);

    // const clientService = await unms.addService(13924, service)
    // console.log(clientService);

    // const getservice = await unms.getServicePlan()
    // console.log(getservice[0]);

    // const allclients = await unms.createClient(cliente);
    // console.log(allclients);

    // const products = await unms.getProducts(product);
    // console.log(products);

}; 
mainProcess();
