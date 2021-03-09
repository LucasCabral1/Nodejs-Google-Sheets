const planilha = require('google-spreadsheet')
const cred = require('./credenciais-do-arquivo.json')
const { promisify } = require('util')

const docId = '1wEY6HRLHDbJIbrOVhNyNTlCCdVylqtd0arfZbJnKdXI'
const doc = new planilha(docId)



const acessoPla = async() => {
    const doc = new planilha(docId)
    await promisify(doc.useServiceAccountAuth)(cred)
    const info = await promisify(doc.getInfo)() // retorna um objeto com todas as informações da tabela
    const worksheet = info.worksheets[0] 
    const row = await promisify(worksheet.getRows)({
        // parametros
        offset: 3,
        
    })
    //console.log(row)
    
    const infoWorksheet = row.forEach(row => {
        console.log(`Alunos: ${row._cokwr}, Faltas = ${row._cpzh4}, P1 = ${row._cre1l}, P2 = ${row._chk2m}, P3 = ${row._ciyn3}`)
        const P1 = row._cre1l
        const P1format = parseInt(P1)

        const P2 = row._chk2m
        const P2format = parseInt(P2)

        const P3 = row._ciyn3
        const P3format = parseInt(P3)

        const avg = (P1format + P2format + P3format)/3
        const absense = row._cpzh4
        const absenseFormat = parseInt(absense)
        console.log(`Media = ${avg}`)
        

        if(absenseFormat <= 15){
            if(avg > 70){
                console.log(`Situação: Aprovado`)
                console.log(`Nota para aprovação = 0`)

            } else if (avg >= 50 && avg <= 70){
                console.log(`Situação: Exame Final`)
                let x = 1
                console.log(`Nota para aprovação:${x = (avg + 100)/2}`)

            } else{
                console.log(`Situação: Reprovado`)
                console.log(`Nota para aprovação = 0`)
            }
        } else(
            console.log(`Reprovado por falta`)
        )
        console.log("-------------------------------------------------------------------------------")
    })    
    
    
    
}   
    
acessoPla()
