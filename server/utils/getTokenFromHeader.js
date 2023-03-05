const getTokenFromHeader = (req) => {
    //Obtenemos el token que se genera en la cabaeza del navegador
    const headerObj = req.headers;
    const token = headerObj["authorization"].split(" ")[1];
    if(token !== undefined){
        return token; 
    }else{
        return {
            status: "failed",
            message: "Este no es el token que autorizado para el header"
        }
    }
}

module.exports = getTokenFromHeader;