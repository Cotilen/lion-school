const getStudentInformartions = () => {

    const fetchData = async() => {

        let aluno = localStorage.getItem('matricula')
        let url = `https://integracao-escola.onrender.com/v1/lion-school/alunos/${aluno}`
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    var largura = window.innerWidth;

    function atualizarPagina() {
        // recarregar a página
        location.reload();
    }

    // executar a função atualizarPagina toda vez que a largura da tela mudar
    window.addEventListener('resize', atualizarPagina);


    const ctx = document.getElementById("myChart");


    // if (largura < 400) {
    //     ctx.style.height = '300px'
    //     ctx.style.width = '350px'
    // } else if (largura <= 650) {
    //     ctx.style.height = '300px'
    //     ctx.style.width = '500px'
    // }

    const updateChart = async() => {
        const data = await fetchData();

        const disciplineName = data.aluno[0].Disciplinas.map((index) => {
            return index.nome
        })
        const disciplineAverage = data.aluno[0].Disciplinas.map((index) => {
            return index.media
        })

        let arrayColors = [];
        disciplineAverage.forEach((mediaMateria) => {
            if (mediaMateria >= 0 && mediaMateria < 50) {
                arrayColors.push("rgba(193, 16, 16, 1)");
            } else if (mediaMateria >= 50 && mediaMateria < 80) {
                arrayColors.push("rgba(229, 182, 87, 1)");
            } else if (mediaMateria >= 80 && mediaMateria <= 100) {
                arrayColors.push("rgba(51, 71, 176, 1)");
            }
        });

        let arrayDiscipline = []

        disciplineName.forEach(element => {

            let discipline = element.split(' ').map(word => word.charAt(0) + word.charAt(1)).join('')

            arrayDiscipline.push(element.split(' ').map(word => word.charAt(0) + word.charAt(1)).join(''))
        });

        const myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: arrayDiscipline,
                datasets: [{
                    label: `Media de Notas`,
                    data: disciplineAverage,
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: arrayColors,
                }, ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

    }

    const studentsInfo = async() => {
        let aluno = await fetchData()
        const container = document.getElementById("container");

        let studentProfile = document.getElementById('container-aluno-unico')

        let card = document.createElement('div')
        card.classList.add('card-aluno-unico')

        let img = document.createElement('img')
        img.classList.add('img-aluno-unico')
        img.src = aluno.aluno[0].Foto

        let nome = document.createElement('p')
        nome.classList.add('nome')
        nome.textContent = aluno.aluno[0].Aluno

        card.append(img, nome)
        studentProfile.append(card)
        container.replaceChildren(studentProfile, ctx);
    };

    studentsInfo();
    updateChart();
};
getStudentInformartions();