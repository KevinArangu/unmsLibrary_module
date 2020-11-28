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
const pathCustomId = "api/v1.0/custom-attributes/";
const pathCustom = "api/v1.0/custom-attributes?attributeType=client"
const get = {
    method: 'GET', 
    headers: {
      'Content-Type':'application/json',
      'x-auth-token':'a7c02df1-18c4-47ca-88ca-4e62203d7abe'
    }
};
const post = {
    method: 'POST',
    body: {},
    headers:{
        'Content-Type':'application/json',
        'x-auth-token':'a7c02df1-18c4-47ca-88ca-4e62203d7abe'
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
    const array = [];
    const clients = await getClients();
    clients.forEach(element => {
        element.attributes.forEach(item => {
            if(item.customAttributeId === 14 && item.value === id){
                array.push(item);
            }
        });
    });
    return array;
};
const getCustomAttrb = async () => {
    const response = await fetch(url+pathCustom, get);
    return response.json();
}

//CREATE
const createClient = async (client) => {
    try {
        post.body = JSON.stringify(client);
        const response = await fetch(url+pathClients, post);
        post.body = {};
        return response.status + " " + response.statusText;
    } catch (error) {
        console.log("catch: \n" + error);
        return response.status + " " + response.statusText;
    }
};
const createQuote = async (id, body) => {
    try {
        post.body = JSON.stringify(body);
        const response = await fetch(url+pathClients+"/"+id+"/quotes", post);
        post.body = {};
        return response.status + " " + response.statusText;
    } catch (error) {
        console.log("catch: \n" + error);
        return response.status + " " + response.statusText;
    }
};
const createTicket = async (body) => {
    try {
        post.body = JSON.stringify(body);
        const response = await fetch(url+pathTickets, post);
        post.body = {};
        return response.status + " " + response.statusText;
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }
};

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
    getCustomAttrb:getCustomAttrb,
    createClient: createClient,
    createQuote: createQuote,
    createTicket: createTicket,
    speedTest: speedTest,

};