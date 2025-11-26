// ========================================
// BITNET - JavaScript Principal
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MENU MOBILE HAMBÚRGUER
    // ========================================
    
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
    
    // ========================================
    // DROPDOWN DE SERVIÇOS
    // ========================================
    
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Fechar outros dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
                
                // Toggle atual
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // ========================================
    // CARROSSEL DO HERO
    // ========================================
    
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentSlide = 0;
    let autoplayInterval;
    
    function showSlide(index) {
        // Remover active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Adicionar active ao slide atual
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Troca a cada 5 segundos
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Event listeners dos controles
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });
    }
    
    // Event listeners dos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopAutoplay();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoplay();
        });
    });
    

    


    // ========================================
    // SMOOTH SCROLL
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se estiver aberto
                    if (nav && nav.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        nav.classList.remove('active');
                        body.style.overflow = '';
                    }
                }
            }
        });
    });
    
    // ========================================
    // ANIMAÇÕES ON SCROLL
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.advantage-card, .service-card, .contact-item');
    animatedElements.forEach(el => observer.observe(el));
    
    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // ACESSIBILIDADE - NAVEGAÇÃO POR TECLADO
    // ========================================
    
    // ESC para fechar dropdowns e menu mobile
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Fechar dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Fechar menu mobile
            if (nav && nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });
    
    // Tab navigation para dropdowns
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    if (dropdown.classList.contains('active')) {
                        const firstLink = menu.querySelector('a');
                        if (firstLink) {
                            setTimeout(() => firstLink.focus(), 100);
                        }
                    }
                }
            });
        }
    });
    
    // ========================================
    // WHATSAPP BUTTON
    // ========================================
    
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Adicionar número de WhatsApp (substituir pelo número real)
        const whatsappNumber = '5585992312744'; // Atualizar com número real
        const whatsappMessage = encodeURIComponent('Olá! Gostaria de mais informações sobre os serviços da Bitnet.');
        
        whatsappButton.addEventListener('click', function() {
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        });
    }
    
    // ========================================
    // LAZY LOADING DE IMAGENS
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========================================
    // PREVENÇÃO DE CLIQUE DUPLO EM BOTÕES
    // ========================================
    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
    
    // ========================================
    // ARIA LABELS DINÂMICOS
    // ========================================
    
    // Atualizar aria-expanded nos dropdowns
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-haspopup', 'true');
            
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class') {
                        const isActive = dropdown.classList.contains('active');
                        toggle.setAttribute('aria-expanded', isActive.toString());
                    }
                });
            });
            
            observer.observe(dropdown, { attributes: true });
        }
    });
    
    // ========================================
    // CONSOLE LOG
    // ========================================
    
    console.log('%c🌐 Grupo Bitnet', 'color: #00D4FF; font-size: 20px; font-weight: bold;');
    console.log('%cMais que Internet, é Tecnologia', 'color: #9CA3AF; font-size: 14px;');

    // ========================================
    // VERIFICAR SE FORMULÁRIO FOI ENVIADO COM SUCESSO
    // ========================================
    
    // Verificar parâmetro na URL para exibir mensagem de sucesso
    const urlParams = new URLSearchParams(window.location.search);
    const enviado = urlParams.get('enviado');
    
    if (enviado === 'sucesso') {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'block';
            
            // Remover parâmetro da URL sem recarregar a página
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
            
            // Ocultar mensagem após 8 segundos
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    successMessage.style.opacity = '1';
                }, 300);
            }, 8000);
        }
    }
    
    // ========================================
    // VALIDAÇÃO ADICIONAL DO FORMULÁRIO
    // ========================================
    
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            // Validação básica antes do envio
            const nome = this.nome.value.trim();
            const telefone = this.telefone.value.trim();
            const email = this.replyto.value.trim();
            const empresa = this.empresa.value.trim();
            const servico = this.servico.value;
            
            if (!nome || !telefone || !email || !empresa || !servico) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
                return false;
            }
            
            // Validação simples de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Por favor, insira um e-mail válido.');
                return false;
            }
            
            // Desabilitar botão de envio para evitar duplo clique
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
            }
            
            // O formulário será enviado normalmente para o formmail da KingHost
            return true;
        });
    }
    
});

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}