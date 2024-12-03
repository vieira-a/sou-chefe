const gridReceitas = document.getElementById("grid-receitas");
const listaIngredientes = document.getElementById("receita-individual-ingredientes");
const listaPreparo = document.getElementById("receita-individual-preparo");
const receitaIndividualGaleria = document.getElementById("receita-individual-galeria");

const obterReceitas = () => {
    const receitas = localStorage.getItem("receitas");
    return receitas ? JSON.parse(receitas) : [];
};

const carregarReceitasJSON = async () => {
    try {
        const receitasCarregadas = localStorage.getItem("receitas");
        if (!receitasCarregadas || JSON.parse(receitasCarregadas).length === 0) {
            const response = await fetch("../data/receitas.json");
            if (!response.ok) throw new Error("Erro ao carregar receitas.json");

            const receitas = await response.json();
            localStorage.setItem("receitas", JSON.stringify(receitas));
            return receitas;
        } else {
            return JSON.parse(receitasCarregadas);
        }
    } catch (erro) {
        console.error("Erro ao carregar receitas:", erro);
        return [];
    }
};

const carregarReceitas = async () => {
    const receitas = await carregarReceitasJSON();
    gridReceitas.innerHTML = "";

    receitas.forEach(receita => {
        const linkReceita = document.createElement('a');
        linkReceita.href = `cadastrado.html?id=${receita.id}`;
        const imgReceita = document.createElement('img');
        imgReceita.src = receita.imagem[0];
        imgReceita.alt = receita.nome;
        linkReceita.appendChild(imgReceita);
        gridReceitas.appendChild(linkReceita);
    });
};

const carregarReceitaIndividual = () => {
    const receitas = obterReceitas();
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const receita = receitas.find(receita => receita.id === id);

    if (receita) {
        receita.imagem.forEach(src => {
            const galeriaImg = document.createElement('img');
            galeriaImg.src = src;
            galeriaImg.alt = receita.nome;
            receitaIndividualGaleria.appendChild(galeriaImg);
        });

        receita.ingredientes.forEach(ingrediente => {
            const item = document.createElement('li');
            item.textContent = ingrediente;
            listaIngredientes.appendChild(item);
        });

        receita.preparo.forEach(preparo => {
            const item = document.createElement('li');
            item.textContent = preparo;
            listaPreparo.appendChild(item);
        });
    } else {
        console.error("Receita não encontrada!");
    }
};

window.onload = () => {
    if (gridReceitas) carregarReceitas();
    if (listaIngredientes && listaPreparo && receitaIndividualGaleria) carregarReceitaIndividual();
};
