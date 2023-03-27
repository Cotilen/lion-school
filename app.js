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

app.get('/v1/lion-school/cursos', cors(), async function(request, response, next) {

    //Chama a função que retorna os cursos
    let listaDeCursos = functions.getCursos()

    //Tratamento para validar se a função realizou o processamento
    if (listaDeCursos) {
        //Retorna o Json e o Status code
        response.json(listaDeCursos)
        response.status(200)
    } else
        response.status(500)
})