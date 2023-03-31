/*
 * Objetvo: Criar uma API para manipulação de dados dos Alunos e Cursos da Lion School
 * Autor: Cleiton
 * Data: 27/03/2023
 * Versão: 1.0
 */

/**
 * Express     - Dependência do node que permite a integração do protocolo HTTP com o código
 *        npm install express --save
 * 
 * Cors        - Gerenciador de permissões para o protocolo HTTP 
 *        npm install cors --save
 * 
 * Body-parser - É uma dependência que permite manipular dados enviados pelo body da requisição
 *        npm install body-parser --save
 */

//Import das dependências para criar API

//Responsável pelas requisições
const express = require('express')

//Responsável pelas permissões das requisições
const cors = require('cors')

//Responsável pela manipulação do body da requisição
const bodyParser = require('body-parser')
    // const { response } = require('express') Criado automaticamente pelo VScode, pode apagar se quiser

//Cria um objeto ck=om as informações da classe express
const app = express()

//Defie as permissões no header da API
app.use((request, response, next) => {
    //Permite gerenciar a origen das requisiçõe da API
    //* - significa que a API será pública
    //IP - se colocar o IP, a API smente responderá para aquela máquina
    response.header('Access-Control-Allow-Origin', '*')

    //Permite gerenciar quais verbos (métodos) poderão fazer requisições
    response.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS')

    //Ativa no cors das requisições as permissões estabelecidas
    app.use(cors())

    next()
})

const functions = require('./model/function/function.js')
const { getAlunoCurso, getAlunoStatus, getConclusao } = require('./model/function/function.js')

app.get('/v1/lion-school/cursos', cors(), async function(request, response, next) {

    let statusCode
    let listaCursos = {}

    let curso = functions.getCursos()

    if (curso) {
        statusCode = 200
        listaCursos = curso
    } else {
        statusCode = 404
    }


    response.status(statusCode)
    response.json(listaCursos)
})


app.get('/v1/lion-school/alunos', cors(), async function(request, response, next) {

    let curso = request.query.curso
    let status = request.query.status
    let conclusao = request.query.conclusao
    let statusCode
    let listaAlunos = {}




    if (curso === undefined && status === undefined && conclusao === undefined) {

        if (!isNaN(status) || !isNaN(curso) || status == '' || curso == '' || conclusao == '' || isNaN(conclusao)) {
            statusCode = 400
            listaAlunos.message = ("Não é possível processar a requisição pois o curso ou o status está incorreto")
            let aluno = functions.getAlunos()

            if (aluno) {
                statusCode = 200
                listaAlunos = aluno
            } else {
                statusCode = 404
            }
        }
    } else if (curso == undefined && status == undefined) {
        if (!isNaN(status) || !isNaN(curso) || status == '' || curso == '' || conclusao == '' || isNaN(conclusao)) {
            statusCode = 400
            listaAlunos.message = ("Não é possível processar a requisição pois o curso ou o status está incorreto")
            aluno = functions.getConclusao(conclusao, getAlunoCurso(curso))

            if (aluno) {
                statusCode = 200
                listaAlunos = aluno
            } else {
                statusCode = 404
            }
        }
    } else if (status == undefined && conclusao == undefined) {
        if (!isNaN(status) || !isNaN(curso) || status == '' || curso == '' || conclusao == '' || isNaN(conclusao)) {
            statusCode = 400
            listaAlunos.message = ("Não é possível processar a requisição pois o curso ou o status está incorreto")
            aluno = functions.getAlunoCurso(curso)

            if (aluno) {
                statusCode = 200
                listaAlunos = aluno
            } else {
                statusCode = 404
            }
        }
    } else if (curso == undefined && conclusao == undefined) {
        if (!isNaN(status) || !isNaN(curso) || status == '' || curso == '' || conclusao == '' || isNaN(conclusao)) {
            statusCode = 400
            listaAlunos.message = ("Não é possível processar a requisição pois o curso ou o status está incorreto")
            aluno = functions.getAlunoStatus(status)

            if (aluno) {
                statusCode = 200
                listaAlunos = aluno
            } else {
                statusCode = 404
            }
        }
    } else if (curso == undefined) {
        if (!isNaN(status) || !isNaN(curso) || status == '' || curso == '' || conclusao == '' || isNaN(conclusao)) {
            statusCode = 400
            listaAlunos.message = ("Não é possível processar a requisição pois o curso ou o status está incorreto")
            aluno = functions.getStatusConclusao(conclusao, getAlunoStatus(status))

            if (aluno) {
                statusCode = 200
                listaAlunos = aluno
            } else {
                statusCode = 404
            }
        }
    } else if (status == undefined) {
        if (!isNaN(status) || !isNaN(curso) || status == '' || curso == '' || conclusao == '' || isNaN(conclusao)) {
            statusCode = 400
            listaAlunos.message = ("Não é possível processar a requisição pois o curso ou o status está incorreto")
            aluno = functions.getConclusao(conclusao, getAlunoCurso(curso))

            if (aluno) {
                statusCode = 200
                listaAlunos = aluno
            } else {
                statusCode = 404
            }
        }
    } else {
        if (!isNaN(status) || !isNaN(curso) || status == '' || curso == '' || conclusao == '' || isNaN(conclusao)) {
            statusCode = 400
            listaAlunos.message = ("Não é possível processar a requisição pois o curso ou o status está incorreto")
            aluno = functions.getAlunoStatus(status, getAlunoCurso(curso))

            if (aluno) {
                statusCode = 200
                listaAlunos = aluno
            } else {
                statusCode = 404
            }
        }
    }



    response.status(statusCode)
    response.json(listaAlunos)
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function(request, response, next) {

    let nmrMatricula = request.params.matricula
    let statusCode
    let dadosAlunos = {}

    if (nmrMatricula == '' || nmrMatricula == undefined || isNaN(nmrMatricula)) {
        statusCode = 400
        dadosAlunos.message = ("Não é possível processar a requisição pois a matricula não foi informada ou não existe")
    } else {
        let alunos = functions.getAlunoMatricula(nmrMatricula)

        if (alunos) {
            statusCode = 200
            dadosAlunos = alunos
        } else {
            statusCode = 404
        }
    }

    response.status(statusCode)
    response.json(dadosAlunos)

})

app.listen(8080, function() {


    console.log('Servidor aguardando requisições na porta 8080');

})