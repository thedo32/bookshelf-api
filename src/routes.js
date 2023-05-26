const { postBookHandler, getAllBooksHandler, getBookByIdHandler, 
    getReadBooksHandler, putBookByIdHandler, deleteBookByIdHandler, } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: postBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
        
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: putBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;