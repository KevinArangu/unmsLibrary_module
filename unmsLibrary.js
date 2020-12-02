//Libreria desarrollada por: Kevin Arangu
require('isomorphic-fetch');

//CONSTANTES 
const url = "https://mi.intercomservicios.com/";//"https://192.168.0.8/";
const pathClients = "crm/api/v1.0/clients";
const pathQuotes = "crm/api/v1.0/quotes";
const pathProducts = "crm/api/v1.0/products";
const pathTickets = "api/v1.0/ticketing/tickets";
const pathUsers = "nms/api/v2.1/users";
const pathSpeed = "nms/api/v2.1/speed-tests/start";
const pathUserIdent = "api/v1.0/clients?userIdent=";
const get = {
    method: 'GET', 
    headers: {
      'Content-Type':'application/json',
      'x-auth-token':'85ccde42-3fcc-431c-b8e4-e4cb0de056a8'
    }
};
const post = {
    method: 'POST',
    body: {},
    headers:{
        'Content-Type':'application/json',
        'x-auth-token':'85ccde42-3fcc-431c-b8e4-e4cb0de056a8'
    }
};
const patch = {
    method: 'PATCH',
    body: {},
    headers:{
        'Content-Type':'application/json',
        'x-auth-token':'a7c02df1-18c4-47ca-88ca-4e62203d7abe'
    }
};
const del = {
    method: 'DELETE',
    headers:{
        'Content-Type':'application/json',
        'x-auth-token':'85ccde42-3fcc-431c-b8e4-e4cb0de056a8'
    }
};

// FUNCIONES //

//GET
const getClients = async (id=null) => {
    if(id === null){
        try {
            const response = await fetch(url+pathClients,get);
            return response.json();
        } catch (error) {
            console.log(error);
        }   
    }
    else{
        try {
            const response = await fetch(url+pathClients+"/"+id,get);
            return response.json();
        } catch (error) {
            console.log(error)
        }
    }
};
const getQuotes = async (option = null, id = null) => { //OPTIONS: 1 - clientId    2 - quoteId
    switch(option){ 
        case null: {
            const response = await fetch(url+pathQuotes, get);
            return response.json();
            break;
        }
        case 1: {
            const response = await fetch(url+pathQuotes+"?clientId="+id, get);
            return response.json();
            break;
        }
        case 2: {
            const response = await fetch(url+pathQuotes+"/"+id, get);
            return response.json();
            break;
        }
        default: {
            console.log("Opcion no valida");
            break;
        }
    }
};
const getProducts = async () => {
    const response = await fetch(url+pathProducts, get)
    return response.json();
};
const getTickets = async () => {
    const response = await fetch(url+pathTickets, get);
    return response.json();
};
const getUsers = async () => {
    const response = await fetch(url+pathUsers, get);
    return response.json();
};
const getVtiger = async (id) => {
   const response = await fetch(url+pathUserIdent+id, get);
   console.log(url+pathUserIdent+id);
    return response.json();
};

//CREATE
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
        const response = await fetch(url+pathClients+"/"+id+"/quotes", post);
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

//PATCH
const patchClient = async (client) => {
    try {
        patch.body = JSON.stringify(client);
        const response = await fetch(url+pathClients, patch);
        post.body = {};
        return response.status;
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }
}

//DELETE
const deleteClient = async (id) => {

}

//OTHERS
const speedTest = async (body) => {
    try {
        post.body = JSON.stringify(body);
        const response = await fetch(url+pathSpeed, post);
        post.body = {};
        return response;
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }
}; //REVISAR****

// EXPORTAMOS LOS MODULOS //
module.exports = {
    getClients: getClients,
    getQuotes: getQuotes,
    getProducts: getProducts,
    getTickets: getTickets,
    getUsers: getUsers,
    getVtiger: getVtiger,
    createClient: createClient,
    createQuote: createQuote,
    createTicket: createTicket,
    speedTest: speedTest,
    patchClient: patchClient,
    deleteClient: deleteClient,

};