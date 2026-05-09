// ========== SISTEMA DE SEÇÕES OCULTAS ==========

const overlay = document.getElementById('overlay');
const botoesMenu = document.querySelectorAll('.paicentro1 > div, .paibaixo2 > div');

// Mapeamento de classes/posição para IDs de seção
const mapeamentoSecoes = {
    'esquerda1': 'secaoOculta',          // Projetos
    'esquerda2': 'secaoContrato',        // Contratar
    'esquerda3': 'secaoCertificados',    // Certificados
    'esquerda4': 'secaoObjetivos',       // Objetivos
    'esquerda5': 'secaoMissao',          // Missão
    'baixo2filho': null // será determinado dinamicamente
};

// Array para rastrear qual foi clicado
let secaoAberta = null;

// Função para abrir seção
function abrirSecao(idSecao) {
    if (!idSecao) return;

    const secao = document.getElementById(idSecao);
    if (secao) {
        secao.classList.add('ativo');
        overlay.classList.add('ativo');
        secaoAberta = idSecao;
        document.body.style.overflow = 'hidden';
    }
}

// Função para fechar seção
function fecharSecao() {
    const secaoAtiva = document.querySelector('.secaoOculta.ativo');
    if (secaoAtiva) {
        secaoAtiva.classList.remove('ativo');
    }
    overlay.classList.remove('ativo');
    secaoAberta = null;
    document.body.style.overflow = 'auto';
}

// Configurar cliques nos botões do menu esquerdo (Projetos, Contrato, Certificados, etc)
const menuEsquerdo = document.querySelectorAll('.esquerda1, .esquerda2, .esquerda3, .esquerda4, .esquerda5');

menuEsquerdo.forEach((botao, indice) => {
    botao.style.cursor = 'pointer';
    botao.addEventListener('click', () => {
        const secaoIds = [
            'secaoOculta',           // 0 - Projetos
            'secaoContrato',         // 1 - Contratar
            'secaoCertificados',     // 2 - Certificados
            'secaoObjetivos',        // 3 - Objetivos
            'secaoMissao'            // 4 - Missão
        ];
        abrirSecao(secaoIds[indice]);
    });

    botao.addEventListener('mouseenter', () => {
        botao.style.transform = 'translateX(10px)';
        botao.style.borderColor = '#ffff00';
    });

    botao.addEventListener('mouseleave', () => {
        botao.style.transform = 'translateX(0)';
        botao.style.borderColor = 'transparent';
    });
});

// Configurar cliques nos botões do menu inferior (Soft Skills, Hard Skills, Hobbies, Lazer)
const menuInferior = document.querySelectorAll('.baixo2filho');

menuInferior.forEach((botao, indice) => {
    botao.style.cursor = 'pointer';
    botao.addEventListener('click', () => {
        const secaoIds = [
            'secaoSoftSkills',       // 0 - Soft Skills
            'secaoHardSkills',       // 1 - Hard Skills
            'secaoHobbies',          // 2 - Hobbies
            'secaoLazer'             // 3 - Lazer
        ];
        abrirSecao(secaoIds[indice]);
    });

    botao.addEventListener('mouseenter', () => {
        botao.style.transform = 'scale(1.08)';
    });

    botao.addEventListener('mouseleave', () => {
        botao.style.transform = 'scale(1)';
    });
});

// Botão "Contatar" - será configurado no sistema de contatos selecionáveis

// Fechar seção ao clicar em botões de fechar
const botoesFechar = document.querySelectorAll('.btnFechar');
botoesFechar.forEach(botao => {
    botao.addEventListener('click', fecharSecao);
});

// Fechar seção ao clicar no overlay
overlay.addEventListener('click', fecharSecao);

// Fechar seção ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fecharSecao();
    }
});

// ========== ENVIO DE FORMULÁRIO ==========

const formulario = document.querySelector('.formulario-contato form');
if (formulario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envio
        const inputs = formulario.querySelectorAll('input, textarea');
        const mensagem = formulario.querySelector('textarea').value;
        
        // Mostrar mensagem de sucesso
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Limpar formulário
        inputs.forEach(input => input.value = '');
        
        // Fechar seção após 1 segundo
        setTimeout(fecharSecao, 1000);
    });
}

// ========== EFEITOS DE HOVER NOS LINKS ==========

const linksBtn = document.querySelectorAll('.link-btn');
linksBtn.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.1)';
        link.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.8)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1)';
        link.style.boxShadow = 'none';
    });
});

// ========== ANIMAÇÃO DE ENTRADA DAS SEÇÕES ==========

const secoes = document.querySelectorAll('.secaoOculta');
secoes.forEach((secao, indice) => {
    secao.style.animationDelay = `${indice * 0.1}s`;
});

// ========== SCROLL SUAVE ==========

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ========== ANALYTICS SIMPLES ==========

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('esquerda1') || 
        e.target.classList.contains('esquerda2') || 
        e.target.classList.contains('esquerda3') ||
        e.target.classList.contains('esquerda4') ||
        e.target.classList.contains('esquerda5')) {
        console.log('Seção clicada:', e.target.querySelector('h1').innerText);
    }
});

// ========== INICIALIZAÇÃO ==========

console.log('✓ Sistema de portfólio ativado!');

// ========== SISTEMA DE CONTATOS SELECIONÁVEIS ==========

let contatoSelecionado = null;

// Esperar o DOM estar carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarContatos);
} else {
    inicializarContatos();
}

function inicializarContatos() {
    // Selecionar todos os contatos
    const contatos = document.querySelectorAll('.contato-item');
    const botaoContatar = document.getElementById('start');
    
    // Configurar listeners para cada contato
    contatos.forEach(contato => {
        contato.addEventListener('click', () => {
            // Remover seleção anterior
            contatos.forEach(c => c.classList.remove('selecionado'));
            
            // Adicionar seleção ao contato clicado
            contato.classList.add('selecionado');
            contatoSelecionado = contato.dataset.link;
            
            // Atualizar visual do botão
            if (botaoContatar) {
                botaoContatar.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
                botaoContatar.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.6)';
                botaoContatar.textContent = '📤 INICIAR';
            }
            
            // Feedback visual
            console.log('✓ Contato selecionado:', contato.dataset.contato, '-', contatoSelecionado);
        });
    });
    
    // Configurar o botão "Contatar"
    if (botaoContatar) {
        botaoContatar.addEventListener('click', (e) => {
            if (contatoSelecionado) {
                e.preventDefault();
                e.stopPropagation();
                
                // Adicionar efeito antes de redirecionar
                botaoContatar.style.transform = 'scale(0.95)';
                botaoContatar.style.boxShadow = '0 0 40px rgba(255, 255, 0, 1)';
                
                console.log('🚀 Redirecionando para:', contatoSelecionado);
                
                setTimeout(() => {
                    // Redirecionar para o contato selecionado
                    window.open(contatoSelecionado, '_blank');
                }, 300);
            } else {
                // Se nenhum contato foi selecionado, abrir a seção de contrato
                abrirSecao('secaoContrato');
            }
        });
        
        // Efeitos de hover no botão contatar
        botaoContatar.addEventListener('mouseenter', () => {
            if (contatoSelecionado) {
                botaoContatar.style.boxShadow = '0 0 40px rgba(255, 255, 0, 0.9)';
                botaoContatar.style.transform = 'scale(1.08)';
            } else {
                botaoContatar.style.transform = 'scale(1.05)';
                botaoContatar.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.6)';
            }
        });
        
        botaoContatar.addEventListener('mouseleave', () => {
            if (contatoSelecionado) {
                botaoContatar.style.transform = 'scale(1)';
                botaoContatar.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.6)';
            } else {
                botaoContatar.style.transform = 'scale(1)';
                botaoContatar.style.boxShadow = 'none';
            }
        });
    }
    
    // Mostrar mensagem inicial
    console.log('💡 Clique em um contato para selecioná-lo, depois clique em "ENVIAR"!');
    console.log('✓ Sistema de contatos selecionáveis ativado!');
}
