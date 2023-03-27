const cursos = require('../Json/cursos.js')
const alunos = require('../Json/alunos.js')

const getCursos = function() {

    let jsonCursos = {}
        // let arrayCursos = []

    jsonCursos.cursos = cursos.cursos
        // console.log(jsonCursos.cursos.length);

    // cursos.cursos.forEach(curso => {

    //     arrayCursos.push({
    //             nome: curso.nome,
    //             sigla: curso.sigla,
    //             icone: curso.icone,
    //             carga: curso.carga
    //         })
    //         // console.log(jsonCursos);
    //     status = true

    // })
    // jsonCursos.cursos = arrayCursos

    return (jsonCursos.cursos).length != 0 ? jsonCursos : false
}

// console.log(getCursos());

const getAlunos = function() {
    let jsonAlunos = {}

    jsonAlunos.alunos = alunos.alunos

    return (jsonAlunos.alunos).length != 0 ? jsonAlunos : false
}

// console.log(getAlunos());

const getAlunoMatricula = function(matricula) {
    let jsonAlunos = {}
    let arrayAlunos = []

    alunos.alunos.forEach(aluno => {

        if (aluno.matricula == matricula)
            arrayAlunos.push(aluno)

    })
    jsonAlunos.aluno = arrayAlunos

    return jsonAlunos
}

// console.log(getAlunoMatricula("20151001001"));