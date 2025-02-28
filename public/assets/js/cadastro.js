document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Captura os dados do formulário
    const formData = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        data_nascimento: document.getElementById("data_nascimento").value,
        genero: document.getElementById("genero").value
    };

    // Envia os dados para o servidor via POST
    fetch("/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Exibe os dados retornados pelo servidor na tela
        document.getElementById("resultado").innerHTML = `
            <h3>Cadastro realizado com sucesso!</h3>
            <p><strong>Nome:</strong> ${data.nome}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Data de Nascimento:</strong>${data.data_nascimento}</p>
            <p><strong>Gênero:${data.genero}</strong></p>
        `;
    })
    .catch(error => console.error("Erro ao cadastrar:", error));
});
