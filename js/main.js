import { receitas } from "../data/receitas.js";

const gridReceitas = document.getElementById("grid-receitas");
const listaIngredientes = document.getElementById("receita-individual-ingredientes")
const listaPreparo = document.getElementById("receita-individual-preparo")
const receitaIndividualGaleria = document.getElementById("receita-individual-galeria")


const carregarReceitas = () => {
    receitas.forEach(receita => {
        const linkReceita = document.createElement('a')
        linkReceita.href = `cadastrado.html?id=${receita.id}`
        const imgReceita = document.createElement('img');
        imgReceita.src = receita.imagem[0];
        imgReceita.alt = receita.nome;
        imgReceita.id = receita.id
        linkReceita.appendChild(imgReceita)
        gridReceitas.appendChild(linkReceita);
    });
};

const carregarReceitaInividual = () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"))

    const receita = receitas.find(receita => receita.id === id);  

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
}

window.onload = () => {
  if(gridReceitas) {
    carregarReceitas();
  } else if (listaIngredientes && listaPreparo && receitaIndividualGaleria) {
    carregarReceitaInividual()
  }
}
