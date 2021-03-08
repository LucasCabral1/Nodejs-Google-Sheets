const planilha = require('google-spreadsheet')
const cred = require('./credenciais-do-arquivo.json')
const { promisify } = require('util')

const docId = '1wEY6HRLHDbJIbrOVhNyNTlCCdVylqtd0arfZbJnKdXI'
const doc = new planilha(docId)



const acessoPla = async() => {
    const doc = new planilha(docId)
    await promisify(doc.useServiceAccountAuth)(cred)
    const info = await promisify(doc.getInfo)() // retorna um objeto com todas as informações da tabela
    const pagina = info.worksheets[0] 
    const linhas = await promisify(pagina.getRows)({
        // parametros
        offset: 3,
        
    })
    //console.log(linhas)
    
    const informacoesPla = linhas.forEach(row => {
        console.log(`Alunos: ${row._cokwr}, Faltas = ${row._cpzh4}, P1 = ${row._cre1l}, P2 = ${row._chk2m}, P3 = ${row._ciyn3}`)
        console.log("-------------------------------------------------------------------------------")
    })    
    
    const getSituacao = await promisify(pagina.getCells)({
        'min-row': 4,
        'max-row': 23,
        'min-col': 7,
        'max-col': 7,
    })

    const notaAprov = await promisify(pagina.getCells)({
        'min-row': 4,
        'max-row': 23,
        'min-col': 8,
        'max-col': 8,
    })

    for(const celula of getSituacao){
        console.log(`${celula.row}, ${celula.col}: ${celula.value}`)
    }
    
    
}
acessoPla()
