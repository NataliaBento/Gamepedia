const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static('public'));

// Servir a página de cadastro
app.get('/cadastro', function (req, res) {
    res.sendFile(path.join(__dirname, 'formuláriocadastro.html'));
});

// Processar os dados do formulário e retornar JSON
app.post('/cadastrar', function (req, res) {
    const dataOriginal = req.body.data_nascimento

    const dataFormatada = new Date(dataOriginal).toLocaleDateString('pt-br')
    // Envia os dados do usuário como JSON
    const data = res.json({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha, 
        data_nascimento: dataFormatada,
        genero: req.body.genero
    });    
});

if ('Notification' in window && 'serviceWorker' in navigator) {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Permissão de notificação concedida!');
        }
    });
}



app.listen(8087, function () {
    console.log('Servidor rodando na porta 8087 🚀');
});
