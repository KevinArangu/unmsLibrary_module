//Libreria desarrollada por: Kevin Arangu
require('isomorphic-fetch');

//FOR API CONECTION
const url = "https://mi.intercomservicios.com/";//"https://192.168.0.8/";
const apiToken = "85ccde42-3fcc-431c-b8e4-e4cb0de056a8";

//CONSTANT (PATHS)
const pathClients = "crm/api/v1.0/clients";
const pathQuotes = "crm/api/v1.0/quotes";
const pathProducts = "crm/api/v1.0/products";
const pathTickets = "api/v1.0/ticketing/tickets";
const pathUserIdent = "api/v1.0/clients?userIdent=";
const pathServicePlan = "api/v1.0/service-plans"
const pathVtigerValue = "api/v1.0/clients?customAttributeKey=idvtiger&customAttributeValue=";
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
const getUserIdent = async (id) => {
   const response = await fetch(url+pathUserIdent+id, get);
    return response.json();
};
const getVtigerId = async (value) => {
    const response = await fetch(url+pathVtigerValue+value, get);
    return response.json();
};
const getServicePlan = async () => {
    const response = await fetch(url+pathServicePlan, get);
    return response.json();
}

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
}
const addTag = async (idClient, tagId) => {
    try {
        const response = await fetch(url+"api/v1.0/clients/"+idClient+"/add-tag/"+tagId, 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                    'x-auth-token': apiToken
                }
            }
        );
        return response;
    } catch (error) {
        console.log("catch: \n" + error);
        return error;
    }
}
const removeTag = async (idClient, tagId) => {
    try {
        const response = await fetch(url+"api/v1.0/clients/"+idClient+"/remove-tag/"+tagId, 
            {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json',
                    'x-auth-token': apiToken
                }
            }
        );
        return response;
    } catch (error) {
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
}

// EXPORTAMOS LOS MODULOS //
module.exports = {
    getClients: getClients,
    getQuotes: getQuotes,
    getProducts: getProducts,
    getTickets: getTickets,
    getUserIdent: getUserIdent,
    getVtigerId: getVtigerId,
    getServicePlan: getServicePlan,
    createClient: createClient,
    createQuote: createQuote,
    createTicket: createTicket,
    updateClient: updateClient,
    addTag: addTag,
    removeTag: removeTag,
    deleteClient: deleteClient,
    
};