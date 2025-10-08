// @ desc   this class is tesponsible about  operation errors (errors that i can predict )

class apiError extends Error {
    constructor(massage , statusCode){
        super(massage);
        this.statusCode =statusCode;
        this.status =  `${ statusCode}`.startsWith(4) ?  `fail` : `error`
        this.isOperational = true;
     }
}
module.exports = apiError;