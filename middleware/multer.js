const multer = require('multer') // Lib para realizar o filtro e alicação de arquivos de maneira mais rápida.


module.exports = (multer({

    storage: multer.diskStorage({ // Propriedade "storage" define os parâmetros de onde o arquivo será armazenado.

        destination: (req, file, cb) => { // Destino do arquivo, indicado na linha 10. (cb significa Callback)

            cb(null, './uploads/files')

        },

        filename: (req, file, cb) => { // Definindo o nome do arquivo, neste caso utilizando o nome padrão com a data/hora do sistema.
            let now = new Date // Definindo o objeto para manipulação.


            // getDate trás o dia do mês, getMonth trás o mês do ano, adiciona-se 1 pois a contagem no JS começa como janeiro sendo mês 0, getFullYear trás o ano.
            // cb(null, (now.getDate()) + '_' + (now.getMonth() + 1) + '_' + (now.getFullYear()) + '-' + file.originalname)
            cb(null, file.originalname)


        }

    }),

    // fileFilter: (req, file, cb) => { // Filtro para tipos de arquivos diferentes, o que pode ou não ser anexado.

    //     // Formatos aceitos podem ser inseridos dentro do vetor, ao invés de fazer vários IF's.
    //     const isAccepted = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'text/plain'].find( formatoAceito => formatoAceito == file.mimetype );

    //     // O formato do arquivo bateu com algum aceito?
    //     if(isAccepted){
    //         // Executamos o callback com o segundo argumento true (validação aceita)
    //         return cb(null, true);
    //     }
            
    //     // Se o arquivo não bateu com nenhum aceito, executamos o callback com o segundo valor false (validação falhouo)
    //     return cb(null, false);

    // }
}))