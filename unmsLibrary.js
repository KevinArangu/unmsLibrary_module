//Libreria desarrollada por: Kevin Arangu
require('isomorphic-fetch');
const dateformat = require('dateformat');

//FOR API CONECTION
const url = "https://mi.intercomservicios.com/";
const apiToken = "85ccde42-3fcc-431c-b8e4-e4cb0de056a8";

//CONSTANT (PATHS)
const pathClients = "api/v1.0/clients"; // busqueda por cliente UISP
const pathQuotes = "crm/api/v1.0/quotes"; // cotizaciones
const pathProducts = "api/v1.0/products"; // producto
const pathTickets = "api/v1.0/ticketing/tickets"; // ticket
const pathUserIdent = "api/v1.0/clients?userIdent="; // busqueda por cedula
const pathServicePlan = "api/v1.0/service-plans" // Planes UISP
const pathVtigerValue = "api/v1.0/clients?customAttributeKey=idvtiger&customAttributeValue="; // busqueda campo personalizado vtiger
const pathServices = "api/v1.0/clients/services";  // Servicios UISP
const PatchDeleteClient = "api/v1.0/clients/"; // Borrar Cliente
const pathInvoices = "crm/api/v1.0/invoices"; // Facturas
const pathPayments = "crm/api/v1.0/payments"; // Facturas

//METHODS
const get = {
    method: 'GET', 
    headers: {
        'Content-Type':'application/json',
        'x-auth-token': apiToken
    }
};
const post = {
    method: 'POST',
    body: {},
    headers: {
        'Content-Type':'application/json',
        'x-auth-token': apiToken
    }
};
const patch = {
    method: 'PATCH',
    body: {},
    headers: {
        'Content-Type':'application/json',
        'x-auth-token': apiToken
    }
};
const del = {
    method: 'DELETE',
    headers: {
        'Content-Type':'application/json',
        'x-auth-token': apiToken
    }
};

// FUNCTIONS //

//GET
const getClients = async (id=null) => {

    if(id === null){
        try {
            const response = await fetch(url+pathClients,get);
            const returnValue = await response.json();
            return returnValue;
        } catch (error) {
            console.log(error);
            return error;
        }   
    } else{
        try {
            const response = await fetch(url+pathClients+`/${id}`,get);
            return response.json();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

};
const getQuotes = async (option = null, id = null) => { //OPTIONS: 1 - clientId    2 - quoteId
    
    try{
        switch(option){ 
            case null: {
                const response = await fetch(url+pathQuotes, get);
                return response.json();
                break;
            }
            case 1: {
                const response = await fetch(url+pathQuotes+`?clientId=${id}`, get);
                return response.json();
                break;
            }
            case 2: {
                const response = await fetch(url+pathQuotes+`/${id}`, get);
                return response.json();
                break;
            }
            default: {
                return "not valid option";
                break;
            }
        }
    } catch(error) {
        console.log("catch: \n" + error);
        return error;
    }

};
const getInvoices = async (id=null) => {
    if(id === null){
        try {
            const response = await fetch(url+pathInvoices,get);
            return response.json();
        } catch (error) {
            console.log(error);
            return error;
        }   
    } else{
        try {
            const response = await fetch(url+pathInvoices+`?clientId=${id}`,get);
            return response.json();
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
const getInvoiceStatus = async (status=0) => {

    try {
        const response = await fetch(url+pathInvoices+`?statuses=%5B1%5D`,get); 
        return response.json();
    } catch (error) {
        console.log(error);
        return error;
    }

}

const getInvoiceGenerate = async (status=null, mydatefrom=Date.now(), mydateto=null, overdue=null) => {
    try {
        let myurl = url+pathInvoices+`?createdDateFrom=`+dateformat(mydatefrom, "yyyy-mm-dd");
        myurl+=(mydateto != null) ? `&createdDateTo=`+dateformat(mydateto,"yyyy-mm-dd") : "";
        myurl+=(overdue != null) ? `&overdue=1` : "";
        if (status != null) {
            const cant_status = Object.getOwnPropertyNames(status).length-1;
            if (cant_status > 1) {
                for(let pos = 0; pos < cant_status; pos++) {
                    myurl+=`&statuses[`+pos+`]=`+status[pos];
                }
            } else {
                myurl+=(status != -1) ? `&statuses[]=`+status : "";
            }
        } else {
            myurl+=(status != -1) ? `&statuses[]=`+status : "";
        }
        
        const response = await fetch(myurl,get);
        return response.json();
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getPaymentsGenerate = async (mydatefrom=Date.now(), mydateto=null, clientid=null) => {
    try {
        let myurl = url+pathPayments+`?createdDateFrom=`+dateformat(mydatefrom, "yyyy-mm-dd");
        myurl+=(mydateto != null) ? `&createdDateTo=`+dateformat(mydateto,"yyyy-mm-dd") : "";
        myurl+=(clientid != null && clientid != -1) ? `&clientId=`+clientid : "";
        const response = await fetch(myurl,get);
        return response.json();
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getPaymentsIndividualGenerate = async (paymentsId) => {
    try {
        let myurl = url+pathPayments+`/`+paymentsId;
        const response = await fetch(myurl,get);
        return response.json();
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getProducts = async (id = null) => {

    if(id === null){
        try{
            const response = await fetch(url+pathProducts, get)
            return response.json();
        } catch(error) {
            console.log("catch: \n" + error);
            return error;
        }  
    } else{
        try {
            const response = await fetch(url+pathProducts+`/${id}`,get);
            return response.json();
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    
};
const getTickets = async (id = null ) => { 

    if(id === null){
        try{
            const response = await fetch(url+pathTickets, get);
            return response.json();
        } catch(error){
            console.log("catch: \n" + error);
            return error;
        }
    } else{
        try {
            const response = await fetch(url+pathTickets+`/${id}`,get);
            return response.json();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

};
const getUserIdent = async (id=null) => { 
    
    if(id === null){
        try{
            console.log("please enter an id");
            return "please enter an id";
        } catch(error){
            console.log("catch: \n" + error);
            return error;
        }
    } else{
        typeof(id) === "string" ? null : id = id.toString();
        try{
            const response = await fetch(url+pathUserIdent+id, get);
            return response.json();
        } catch(error){
            console.log("catch: \n" + error);
            return error;
        }
    }

};
const getVtigerId = async (value=null) => {

    if(value === null){
        try{
            console.log("please enter an id");
            return "please enter an id";
        } catch(error){
            console.log("catch: \n" + error);
            return error;
        }
    } else{
        typeof(value) === "string" ? null : value = value.toString();
        try{
            const response = await fetch(url+pathVtigerValue+value, get);
            return response.json();
        } catch(error){
            console.log("catch: \n" + error);
            return error;
        }
    }


};
const getServicePlan = async (id = null) => {

    if(id === null){
        try{
            const response = await fetch(url+pathServicePlan, get);
            return response.json();
        } catch(error){
            console.log("catch: \n" + error);
            return error;
        }
    } else{
        try {
            const response = await fetch(url+pathServicePlan+`/${id}`,get);
            return response.json();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

};
const getServices = async (id = null) => { 

    if(id === null){
        try{
            const response = await fetch(url+pathServices, get);
            return response.json();
        } catch(error){
            console.log("catch: \n" + error);
            return error;
        }
    } else{
        try {
            const response = await fetch(url+pathServices+`/${id}`,get);
            return response.json();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

};
const getClientService = async (clientId = null) => { 

    if(clientId === null){
        try{
            console.log("please enter an id");
            return "please enter an id";
        } catch(error){
            console.log("catch: \n" + error);
            return error;
        }
    } else{
        try{
            const response = await fetch(url+pathServices+`?clientId=${clientId}`, get);
            return response.json();
        } catch(error){
            console.log("catch: \n" + error);
            return error;
        }
    }

};

const getDate = async (value=null) => {

    typeof(value) === "string" ? null : value = value.toString();
        try{
            const response = await fetch(url+pathVtigerValue+value, get);
            return response.json();
        } catch(error){
            console.log("catch: \n" + error);
            return error;
        }

};

//Agregar funcion para ver los logs de los clientes, para manejar fechas y cambios en el CRM

//POST
const createClient = async (client) => {

    try {
        post.body = JSON.stringify(client);
        const response = await fetch(url+pathClients, post);
        post.body = {};
        const responseBody = await response.json()

        return (response.status === 201) ? {
            status: response.status, 
            responseText: response.statusText, 
            unmsId: responseBody.id,
            userId: responseBody.userIdent
        } : {
            status: response.status, 
            responseText: response.statusText, 
        }
        

    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }

};
const createQuote = async (id, body) => { 

    try {
        post.body = JSON.stringify(body);
        const response = await fetch(url+pathClients+`/${id}/quotes`, post);
        post.body = {};
        const responseBody = response.json()
        return {
            status: response.status,
            responseText: response.statusText
        }
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }

};
const createTicket = async (body) => {

    try {
        post.body = JSON.stringify(body);
        const response = await fetch(url+pathTickets, post);
        post.body = {};
        return response.status;
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }

};
const createProduct = async (body) => {

    try {
        post.body = JSON.stringify(body);
        const response = await fetch(url+pathProducts, post);
        post.body = {};
        return response.status;
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }

};
const addService = async (clientId, body) => { //Corregir error que agrega mas de dos servicios al cliente CRM

    try {
        post.body = JSON.stringify(body);
        const response = await fetch(url+`api/v1.0/clients/${clientId}/services`, post);
        post.body = {};
        const responseBody = await response.json()

        return (response.status===201) ? {
                status: response.status, //RESPONSEBODY
                responseText: response.statusText, //RESPONSEBODY
                unmsId: responseBody.clientId,
                servicePlanPeriodId: responseBody.servicePlanPeriodId,
                servicePlanName: responseBody.name
            }
            : {
                status: response.status, //RESPONSEBODY
                responseText: response.statusText, //RESPONSEBODY
            } ;

    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }

};

//PATCH
const updateClient = async (id, client) => {

    try {
        patch.body = JSON.stringify(client);
        const response = await fetch(url+PatchDeleteClient+id, patch);
        post.body = {};
        return response.status;
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }

};
const addTag = async (idClient, tagId) => {

    try {
        const response = await fetch(url+`api/v1.0/clients/${idClient}/add-tag/${tagId}`, 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                    'x-auth-token': apiToken
                }
            }
        );
        return response.status;
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }

};
const removeTag = async (idClient, tagId) => {

    try {
        const response = await fetch(url+`api/v1.0/clients/${idClient}/remove-tag/${tagId}`, 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                    'x-auth-token': apiToken
                }
            }
        );
        return response.status;
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }

};

const updateInvoice = async(idInvoice, bodyjson) => {
    try {
        const myurl = url+`crm/api/v1.0/invoices/${idInvoice}`;
        const response = await fetch(myurl, 
        {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                'x-auth-token': apiToken
            },
            body: bodyjson
        }
    );
    return response.status;
    }
    catch (error) {
        console.log("catch: \n" + error);
        return error;
    }
}

//DELETE
const deleteClient = async (id) => {

    try {
        const response = await fetch(url+PatchDeleteClient+id, del);
        return response.status;
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }

};
// funciones Delete: quote, Ticket, Products, Service

//SMS PUBLIC FUNCTION
const getInfoSms = async () => {
    const filteredInvoices = await filterInvoices();
    const clientsInfo = await getPhoneNumber(filteredInvoices);
    return clientsInfo;
}
//PRIVATE FUNCTIONS
const filterInvoices = async (invoiceStatus=1) => {

    try {
        const allInvoices = await getInvoices();
        const filteredInvoices = allInvoices.filter((item) => {
            const invoice = (item.status === invoiceStatus)? true : false;
            return invoice;
        });
        return filteredInvoices;
    } catch (error) {
        console.log(error)
    }

}
const getPhoneNumber = (invoicesArray={}) => {
    
    try {
        const clientNumber = Promise.all( invoicesArray.map(async (item)=>{
            const client = await getClients(item.clientId);
            // return  client;
            return {
                idInvoice: item.id,
                clientId: item.clientId,
                total: item.total,
                amountPaid: item.amountPaid,
                amountToPay: item.amountToPay,
                status: item.status,
                createdDate: item.createdDate,
                dueDate: item.dueDate,
                phone: client.contacts[0].phone,
                firstName: client.firstName,
                lastName: client.lastName,
                attributes: client.attributes,
            }
        }) );
        return clientNumber;
        
    } catch (error) {
        console.log(error)
    }

}

// EXPORTAMOS LOS MODULOS //
module.exports = { //ARREGLAR REDUNDANCIA EN LA EXPORTACION DE MODULOS
    getClients, getQuotes, getProducts, getTickets, getUserIdent, getVtigerId, getServicePlan, getServices, getClientService,
    createClient, createQuote, createTicket, createProduct, addService, updateClient, addTag,
    removeTag, deleteClient, getInvoices, getInvoiceStatus, getInfoSms, 
    getInvoiceGenerate, updateInvoice, getPaymentsGenerate, getPaymentsIndividualGenerate
};