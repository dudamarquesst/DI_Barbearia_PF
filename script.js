document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DO FORMULÁRIO DE AGENDAMENTO ---
    const formAgendamento = document.getElementById('formAgendamento');
    const statusAgendamentoDiv = document.getElementById('agendamento-status');
    const agendamentoModal = document.getElementById('agendamentoModal');

    formAgendamento.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (formAgendamento.checkValidity() === false) {
            formAgendamento.classList.add('was-validated');
            statusAgendamentoDiv.classList.add('d-none');
            return;
        }

        formAgendamento.classList.add('was-validated');
        statusAgendamentoDiv.classList.remove('d-none');
        statusAgendamentoDiv.classList.remove('text-red', 'text-success');
        statusAgendamentoDiv.innerHTML = '<i class="fas fa-spinner fa-spin me-2 text-red"></i> Processando agendamento...';
        
        // Simulação de Agendamento
        const servico = formAgendamento.servicoSelect.options[formAgendamento.servicoSelect.selectedIndex].text;
        const data = formAgendamento.dataInput.value;
        const horaValue = formAgendamento.horaSelect.value;
        const horaFormatada = `${horaValue.substring(0, 2)}:${horaValue.substring(2, 4)}`;

        setTimeout(() => {
            statusAgendamentoDiv.classList.add('text-success');
            statusAgendamentoDiv.innerHTML = `
                <i class="fas fa-check-circle me-2"></i> Agendamento confirmado!
                <p class="small mt-1 mb-0">Serviço: ${servico}<br>Data: ${data} às ${horaFormatada}</p>
            `;
            document.querySelector('#formAgendamento button[type="submit"]').disabled = true;
        }, 2000); 
    });

    // Resetar o formulário de agendamento ao fechar
    agendamentoModal.addEventListener('hidden.bs.modal', function () {
        formAgendamento.classList.remove('was-validated');
        statusAgendamentoDiv.classList.add('d-none');
        statusAgendamentoDiv.innerHTML = '';
        document.querySelector('#formAgendamento button[type="submit"]').disabled = false;
        formAgendamento.reset();
    });

    // --- LÓGICA DO FORMULÁRIO DE LOGIN ---
    const formLogin = document.getElementById('formLogin');
    
    formLogin.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (formLogin.checkValidity() === false) {
            formLogin.classList.add('was-validated');
            return;
        }

        // Simulação de Login
        const btnLogin = document.querySelector('#formLogin button[type="submit"]');
        const originalText = btnLogin.innerHTML;
        
        btnLogin.disabled = true;
        btnLogin.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Entrando...';
        
        setTimeout(() => {
            // Sucesso Simulado:
            alert('Login bem-sucedido! Redirecionando...'); 
            
            // Fecha o modal após simulação
            const loginModalElement = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModalElement.hide();
            
            // Reseta o botão
            btnLogin.disabled = false;
            btnLogin.innerHTML = originalText;
            formLogin.classList.remove('was-validated');

        }, 1500); 
    });

    // --- LÓGICA DO FORMULÁRIO DE CADASTRO ---
    const formCadastro = document.getElementById('formCadastro');
    const statusCadastroDiv = document.getElementById('cadastro-status');

    formCadastro.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (formCadastro.checkValidity() === false) {
            formCadastro.classList.add('was-validated');
            statusCadastroDiv.classList.add('d-none');
            return;
        }

        // Simulação de Cadastro
        const btnCadastro = document.querySelector('#formCadastro button[type="submit"]');
        
        btnCadastro.disabled = true;
        statusCadastroDiv.classList.remove('d-none');
        statusCadastroDiv.classList.remove('text-red', 'text-success');
        statusCadastroDiv.innerHTML = '<i class="fas fa-spinner fa-spin me-2 text-red"></i> Cadastrando usuário...';

        setTimeout(() => {
            // Sucesso Simulado:
            statusCadastroDiv.classList.add('text-success');
            statusCadastroDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i> Cadastro realizado com sucesso! Você será redirecionado para o login.';

            formCadastro.reset();
            formCadastro.classList.remove('was-validated');
            
            // Simula o redirecionamento para o login após 3 segundos
            setTimeout(() => {
                const cadastroModalElement = bootstrap.Modal.getInstance(document.getElementById('cadastroModal'));
                cadastroModalElement.hide();
                // Abrir o modal de login
                const loginModalElement = new bootstrap.Modal(document.getElementById('loginModal'));
                loginModalElement.show();
            }, 3000);
            
            btnCadastro.disabled = false;
            
        }, 2000); 
    });

    // Opcional: Resetar o status do cadastro ao fechar o modal
    const cadastroModal = document.getElementById('cadastroModal');
    cadastroModal.addEventListener('hidden.bs.modal', function () {
        formCadastro.classList.remove('was-validated');
        statusCadastroDiv.classList.add('d-none');
        statusCadastroDiv.innerHTML = '';
        formCadastro.reset();
        document.querySelector('#formCadastro button[type="submit"]').disabled = false;
    });
});