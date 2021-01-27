//Libreria desarrollada por: Kevin Arangu
require('isomorphic-fetch');

//FOR API CONECTION
const url = "https://mi.intercomservicios.com/";//"https://172.16.127.130/";//"https://192.168.0.8/";//"http://45.185.148.5/"
const apiToken = "85ccde42-3fcc-431c-b8e4-e4cb0de056a8";

//CONSTANT (PATHS)
const pathClients = "crm/api/v1.0/clients"; //BORRAR "CRM" (PRUEBA)
const pathQuotes = "crm/api/v1.0/quotes";
const pathProducts = "api/v1.0/products";
const pathTickets = "api/v1.0/ticketing/tickets";
const pathUserIdent = "api/v1.0/clients?userIdent=";
const pathServicePlan = "api/v1.0/service-plans"
const pathVtigerValue = "api/v1.0/clients?customAttributeKey=idvtiger&customAttributeValue=";
const pathServices = "api/v1.0/clients/services";
const PatchDeleteClient = "api/v1.0/clients/";

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
const getClients = async (id=null) => { //Separar funciones ALL and ONE "ID"

    if(id === null){
        try {
            const response = await fetch(url+pathClients,get);
            return response.json();
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
const getQuotes = async (option = null, id = null) => { //OPTIONS: 1 - clientId    2 - quoteId   //Separar funciones Find-Client and FindId
    
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
const getProducts = async () => { //Agregar funcion busqueda por ID

    try{
        const response = await fetch(url+pathProducts, get)
        return response.json();
    } catch(error) {
        console.log("catch: \n" + error);
        return error;
    }
    
};
const getTickets = async () => { //Agregar busqueda por ID

    try{
        const response = await fetch(url+pathTickets, get);
        return response.json();
    } catch(error){
        console.log("catch: \n" + error);
        return error;
    }

};
const getUserIdent = async (id) => { //Si no lleva ID, hacer return de un error
    
    typeof(id) === "string" ? null : id = id.toString();

    try{
        const response = await fetch(url+pathUserIdent+id, get);
        return response.json();
    } catch(error){
        console.log("catch: \n" + error);
        return error;
    }

};
const getVtigerId = async (value) => { //Si no lleva ID, hacer return de un error

    typeof(value) === "string" ? null : value = value.toString();

    try{
        const response = await fetch(url+pathVtigerValue+value, get);
        return response.json();
    } catch(error){
        console.log("catch: \n" + error);
        return error;
    }

};
const getServicePlan = async () => { //Mejorar para ver los PeriodId

    try{
        const response = await fetch(url+pathServicePlan, get);
        return response.json();
    } catch(error){
        console.log("catch: \n" + error);
        return error;
    }

};
const getServices = async () => { //Agregar busqueda por ID

    try{
        const response = await fetch(url+pathServices, get);
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
        return response.status;
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
        return response.status;
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
        return response.status;
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

// EXPORTAMOS LOS MODULOS //
module.exports = { //ARREGLAR REDUNDANCIA EN LA EXPORTACION DE MODULOS
    getClients: getClients,
    getQuotes: getQuotes,
    getProducts: getProducts,
    getTickets: getTickets,
    getUserIdent: getUserIdent,
    getVtigerId: getVtigerId,
    getServicePlan: getServicePlan,
    getServices: getServices,
    createClient: createClient,
    createQuote: createQuote,
    createTicket: createTicket,
    createProduct: createProduct,
    addService: addService,
    updateClient: updateClient,
    addTag: addTag,
    removeTag: removeTag,
    deleteClient: deleteClient,
    
};