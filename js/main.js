import { receitas } from "../data/receitas.js";

const gridReceitas = document.getElementById("grid-receitas");

const carregarReceitas = () => {
    receitas.forEach(receita => {
        const imgReceita = document.createElement('img');
        imgReceita.src = receita.imagem;
        imgReceita.alt = receita.nome;

        gridReceitas.appendChild(imgReceita);
    });
};

window.onload = carregarReceitas;
