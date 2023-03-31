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

        return (jsonAlunos.aluno).length != 0 ? jsonAlunos : false
    }
    // console.log(getAlunoMatricula("20151001001"));

const getAlunoCurso = function(curso) {

        let jsonAlunosCurso = {}
        let arrayAlunos = []

        alunos.alunos.forEach(aluno => {


            if (aluno.curso[0].sigla == curso)
                arrayAlunos.push(aluno)

        });

        jsonAlunosCurso.alunos = arrayAlunos

        return (jsonAlunosCurso.alunos).length != 0 ? jsonAlunosCurso : false
    }
    // console.log(getAlunoCurso("RDS"));

const getAlunoStatus = function(status, curso) {

        let jsonAlunos = {}
        let arrayAlunos = []
        let arrayAlunosFiltrado = []
        let jsonAlunosFiltro = []

        if (curso == undefined) {
            jsonAlunosFiltro.alunos = alunos.alunos

            jsonAlunosFiltro.alunos.forEach(alunosFiltrado => {

                if (alunosFiltrado.status == status)
                    arrayAlunos.push(alunosFiltrado)

            });
        } else {
            arrayAlunosFiltrado.push(curso)

            curso.alunos.forEach(alunosFiltrado => {
                if (alunosFiltrado.status == status)
                    arrayAlunos.push(alunosFiltrado)
            })
        }

        jsonAlunos.alunos = arrayAlunos

        return (jsonAlunos.alunos).length != 0 ? jsonAlunos : false
    }
    // console.log(getAlunoStatus('Finalizado', getAlunoCurso('RDS')));

const getConclusao = function(ano, curso) {

        let jsonAlunos = {}
        let arrayAlunos = []
        let jsonAlunosFiltro = []

        if (curso == undefined) {

            jsonAlunosFiltro.alunos = alunos.alunos

            jsonAlunosFiltro.alunos.forEach(alunosFiltrado => {

                alunosFiltrado.curso.forEach(alunosFiltradoCurso => {

                    if (alunosFiltradoCurso.conclusao == ano)
                        arrayAlunos.push(alunosFiltrado)
                });
            })
        } else {
            jsonAlunosFiltro.filtroAlunos = curso

            jsonAlunosFiltro.filtroAlunos.alunos.forEach(alunosFiltrado => {

                alunosFiltrado.curso.forEach(alunosFiltradoCurso => {


                    if (alunosFiltradoCurso.conclusao == ano)
                        arrayAlunos.push(alunosFiltrado)
                });
            })
        }

        jsonAlunos.alunos = arrayAlunos
        return (jsonAlunos.alunos).length != 0 ? jsonAlunos : false
    }
    // console.log(getConclusao(20228, getAlunoCurso('RDS')));

const getStatusConclusao = function(ano, status) {

        let jsonAlunos = {}
        let arrayAlunos = []
        let jsonAlunosFiltro = []

        if (status == undefined) {

            jsonAlunosFiltro.alunos = alunos.alunos

            jsonAlunosFiltro.alunos.forEach(alunosFiltrado => {

                alunosFiltrado.curso.forEach(alunosFiltradoCurso => {

                    if (alunosFiltradoCurso.conclusao == ano)
                        arrayAlunos.push(alunosFiltrado)
                });
            })
        } else {
            jsonAlunosFiltro.filtroAlunos = status

            jsonAlunosFiltro.filtroAlunos.alunos.forEach(alunosFiltrado => {

                alunosFiltrado.curso.forEach(alunosFiltradoCurso => {


                    if (alunosFiltradoCurso.conclusao == ano)
                        arrayAlunos.push(alunosFiltrado)
                });
            })
        }

        jsonAlunos.alunos = arrayAlunos
        return (jsonAlunos.alunos).length != 0 ? jsonAlunos : false
    }
    // console.log(getStatusConclusao(2021, getAlunoStatus('Finalizado')))

const getDisciplinas = function(matricula) {

    jsonAlunos = {}
    arrayAlunos = []

    alunos.alunos.forEach(alunosFiltrado => {

        if (alunosFiltrado.matricula == matricula) {

            alunosFiltrado.curso.map(curso => {

                // console.log(curso.disciplinas);

                arrayAlunos.push({
                    Aluno: alunosFiltrado.nome,
                    Foto: alunosFiltrado.foto,
                    Matricula: alunosFiltrado.matricula,
                    Curso: curso.nome,
                    Disciplinas: curso.disciplinas
                })
            })
        }
    });

    jsonAlunos.alunos = arrayAlunos

    return (jsonAlunos.alunos).length != 0 ? jsonAlunos : false
}

// console.log(getDisciplinas("20151001001"));



module.exports = {
    getCursos,
    getAlunos,
    getAlunoMatricula,
    getAlunoCurso,
    getAlunoStatus,
    getConclusao,
    getStatusConclusao,
    getDisciplinas
}