const multer = require('multer') // Lib para realizar o filtro e alicação de arquivos de maneira mais rápida.


module.exports = (multer({

    storage: multer.diskStorage({

        destination: (req, file, cb) => {

            cb(null, './uploads/files')

        },

        filename: (req, file, cb) => {

            cb(null, Date.now().toString() + '-' + file.originalname)

        }

    }),

    fileFilter: (req, file, cb) => {

        // Formatos aceitos podem ser inseridos dentro do vetor, ao invés de fazer vários IF's.
        const isAccepted = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'].find( formatoAceito => formatoAceito == file.mimetype );

        // O formato do arquivo bateu com algum aceito?
        if(isAccepted){
            // Executamos o callback com o segundo argumento true (validação aceita)
            return cb(null, true);
        }
            
        // Se o arquivo não bateu com nenhum aceito, executamos o callback com o segundo valor false (validação falhouo)
        return cb(null, false);

    }
}))