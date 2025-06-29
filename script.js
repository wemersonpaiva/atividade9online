let contatos = [];
let posicao = -1;
let editando = false;

carregaContatos();

// Função de login
function fazerLogin() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const mensagemErro = document.getElementById('mensagem-erro');

    if (usuario === 'admin' && senha === 'admin') {
        window.location.href = 'cadastro.html';
    } else {
        mensagemErro.style.display = 'block';
    }
}

// Atualiza a interface com o contato atual
function mostrarContatoAtual() {
    if (posicao >= 0 && posicao < contatos.length) {
        const contato = contatos[posicao];
        document.getElementById('nome').value = contato.nome || '';
        document.getElementById('sobrenome').value = contato.sobrenome || '';
        document.getElementById('endereco').value = contato.endereco || '';
        document.getElementById('telefone').value = contato.telefone || '';

        document.getElementById("posicaoElemento").textContent = `Elemento ${posicao + 1} de ${contatos.length}`
    } else {
        limpaForm();
    }
}

function mostrarContatoAtual() {
    if (posicao >= 0 && posicao < contatos.length) {
        const c = contatos[posicao];
        document.getElementById('nome').value = c.nome;
        document.getElementById('sobrenome').value = c.sobrenome;
        document.getElementById('endereco').value = c.endereco;
        document.getElementById('telefone').value = c.telefone;
        document.getElementById("posicaoElemento").textContent = `Elemento ${posicao + 1} de ${contatos.length}`;
    } else {
        limpaForm();
        document.getElementById("posicaoElemento").textContent = "Nenhum contato";
    }
}

function limpaForm() {
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('telefone').value = '';
}

function atualizaInterface() {
    const temContatos = contatos.length > 0;
    const ehPrimeiro = posicao <= 0;
    const ehUltimo = posicao >= contatos.length - 1;

    document.getElementById('primeiro').disabled = !temContatos || ehPrimeiro || editando;
    document.getElementById('anterior').disabled = !temContatos || ehPrimeiro || editando;
    document.getElementById('proximo').disabled = !temContatos || ehUltimo || editando;
    document.getElementById('ultimo').disabled = !temContatos || ehUltimo || editando;

    const bIncluir = document.getElementById('incluir');
    const bEditar = document.getElementById('editar');
    const bExcluir = document.getElementById('excluir');
    const bSalvar = document.getElementById('salvar');
    const bCancelar = document.getElementById('cancelar');

    bIncluir.disabled = editando;
    bEditar.disabled = !temContatos || editando;
    bExcluir.disabled = !temContatos || editando;
    bSalvar.disabled = !editando;
    bCancelar.disabled = !editando;

    if (!temContatos && !editando) {
        bIncluir.classList.add("sem-contatos");
    } else {
        bIncluir.classList.remove("sem-contatos");
    }

    controleForm(editando);
}

function controleForm(ativo) {
    ['nome', 'sobrenome', 'endereco', 'telefone'].forEach(id => {
        document.getElementById(id).disabled = !ativo;
    });
}

function navegarPara(i) {
    if (i >= 0 && i < contatos.length) {
        posicao = i;
        mostrarContatoAtual();
    }
    atualizaInterface();
}

function incluirContato() {
    editando = true;
    posicao = contatos.length;
    limpaForm();
    atualizaInterface();
}

function editarContato() {
    editando = true;
    atualizaInterface();
}

function salvarContato() {
    const nome = document.getElementById('nome').value.trim();
    if (!nome) return alert("Nome é obrigatório!");

    const novo = {
        nome,
        sobrenome: document.getElementById('sobrenome').value.trim(),
        endereco: document.getElementById('endereco').value.trim(),
        telefone: document.getElementById('telefone').value.trim()
    };

    if (posicao === contatos.length) {
        contatos.push(novo);
    } else {
        contatos[posicao] = novo;
    }

    localStorage.setItem('contatos', JSON.stringify(contatos));
    editando = false;
    mostrarContatoAtual();
    atualizaInterface();
}

function cancelarEdicao() {
    editando = false;
    if (posicao >= contatos.length) posicao = contatos.length - 1;
    mostrarContatoAtual();
    atualizaInterface();
}

function excluirContato() {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
        contatos.splice(posicao, 1);
        localStorage.setItem('contatos', JSON.stringify(contatos));

        if (contatos.length === 0) {
            posicao = -1;
        } else if (posicao >= contatos.length) {
            posicao = contatos.length - 1;
        }
        mostrarContatoAtual();
        atualizaInterface();
    }
}

function carregaContatos() {
    const salvo = localStorage.getItem('contatos');
    if (salvo) {
        contatos = JSON.parse(salvo);
        if (contatos.length > 0) {
            posicao = 0;
            mostrarContatoAtual();
        }
    }
    atualizaInterface();

}

function sair() {
    window.location.href = 'index.html';
}
