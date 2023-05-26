const { nanoid } = require('nanoid');
const books = require('./books');

const postBookHandler = (request, h) => {
    const id = nanoid(16);

    const { name,
        year,
        number,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading } = request.payload;

    const finished = (readPage === pageCount);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        number,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading, insertedAt, updatedAt,
    };


    if (name == null) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;


    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;

};

/*const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books,
    },


});*/

const getAllBooksHandler = (request, h) => {

    const { reading, finished, name } = request.query;

    let queryBooks = books;

    if (reading !== undefined || finished !== undefined || name !== undefined) {

        queryBooks = queryBooks.filter((book) => {

            if (reading !== undefined) {

                let readingQuery = book.reading;
                return readingQuery;
            }

            if (finished !== undefined) {

                let finishedQuery = book.readPage === book.pageCount;
                return finishedQuery;

            }

            if (name !== undefined) {

                let nameQuery = book.name.toLowerCase().includes(name.toLowerCase());
                return nameQuery;
            }
        })

    };


    const qbresult = queryBooks.map((qb) => ({

        id: qb.id,

        name: qb.name,

        publisher: qb.publisher,

    }))

    const response = h.response({

        status: 'success',

        data: {

            books: qbresult

        }

    })

    response.code(200)

    return response;

};

const getBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((n) => n.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const putBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const { name,
        year,
        number,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading } = request.payload;

    const finished = (readPage === pageCount);
    const updatedAt = new Date().toISOString();

    if (name == null) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            number,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};


module.exports = {
    postBookHandler, getAllBooksHandler,
    getBookByIdHandler, putBookByIdHandler, deleteBookByIdHandler,
};