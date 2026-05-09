// ========== HOVER NO PERFIL ==========

let fotoPerfil = document.getElementById("fotoperfil");
let perfilPai = document.getElementById("perfilpai");
let fotoSumir = document.getElementById("fotosumir");

fotoPerfil.style.cursor = 'pointer';

fotoPerfil.addEventListener('mouseenter', () => {
    perfilPai.classList.add('ativo');
    fotoSumir.classList.add('sumir');
});

fotoPerfil.addEventListener('mouseleave', () => {
    perfilPai.classList.remove('ativo');
    fotoSumir.classList.remove('sumir');
});

// ========== EFEITOS VISUAIS ADICIONAIS ==========

// Adicionar efeito de hover nas imagens de redes sociais
const redeSociaisImgs = document.querySelectorAll('.centro3filho img:not(.seta)');
redeSociaisImgs.forEach(img => {
    img.style.cursor = 'pointer';
    img.style.transition = 'all 0.3s ease';

    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.2) rotate(10deg)';
        img.style.filter = 'invert(1) drop-shadow(0 0 10px rgba(255, 255, 0, 0.8))';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) rotate(0deg)';
        img.style.filter = 'invert(1)';
    });
});

// ========== ANIMAÇÃO DO HEADER ==========

const header = document.getElementById('header');
let scrollTrigger = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50 && !scrollTrigger) {
        header.style.boxShadow = '0 4px 15px rgba(255, 255, 0, 0.2)';
        scrollTrigger = true;
    } else if (window.scrollY <= 50 && scrollTrigger) {
        header.style.boxShadow = 'none';
        scrollTrigger = false;
    }
});

// ========== LOG DE INICIALIZAÇÃO ==========

console.log('✓ Sistema de links e interações ativado!');
console.log('✓ Passe o mouse sobre a foto de perfil para ver mais informações.');