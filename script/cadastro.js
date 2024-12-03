const formReceita = document.getElementById("form-receita");
const nomeInput = document.getElementById("nome-prato");  
const ingredientesInput = document.getElementById("ingredientes");
const preparoInput = document.getElementById("modo-preparo"); 
const imagemInput = document.getElementById("imagem");

const obterReceitas = () => {
    const receitas = localStorage.getItem("receitas");
    return receitas ? JSON.parse(receitas) : [];
};

const salvarReceitas = (receitas) => {
    localStorage.setItem("receitas", JSON.stringify(receitas));
    console.log("Receitas salvas no localStorage:", receitas);
};

const adicionarReceita = (novaReceita) => {
    const receitas = obterReceitas(); 
    receitas.push(novaReceita);
    salvarReceitas(receitas);
    console.log(localStorage.getItem("receitas"))
};

formReceita.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = nomeInput.value;
    const ingredientes = ingredientesInput.value.split(",").map(item => item.trim());
    const preparo = preparoInput.value.split(",").map(item => item.trim());
    const imagemArquivo = imagemInput.files[0];

    if (!imagemArquivo) {
        alert("Por favor, selecione uma imagem para a receita.");
        return;
    }

    const formData = new FormData();
    formData.append("imagem", imagemArquivo);

    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Erro ao enviar a imagem.");

        const { caminho } = await response.json();

        const novaReceita = {
            id: Date.now(),
            nome,
            ingredientes,
            preparo,
            imagem: [caminho],
        };

        adicionarReceita(novaReceita);
        alert("Receita cadastrada com sucesso!");
        formReceita.reset();
    } catch (erro) {
        console.error("Erro ao cadastrar receita:", erro);
    }
});
