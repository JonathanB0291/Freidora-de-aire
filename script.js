// ============================================
// LANDING PAGE - FREIDORA DE AIRE INTELIGENTE
// Script para animaciones e interacciones
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Landing page cargada correctamente');

    // ============================================
    // ANIMACIONES AL HACER SCROLL (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer para animaciones fadeIn y slideUp
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay escalonado para efecto cascada
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                // Dejar de observar después de animar
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar animaciones a elementos específicos
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .review-card, .winner-point, .faq-item, .specs-table-wrapper'
    );
    
    animatedElements.forEach(el => {
        // Estado inicial para animación
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observar elemento
        animationObserver.observe(el);
    });

    // ============================================
    // FAQ - ACORDEÓN DE PREGUNTAS FRECUENTES
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los demás items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle del item actual
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // TRACKING DE CLICKS EN BOTONES CTA
    // ============================================
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonId = this.id || 'cta-button';
            
            // Log para analytics (puedes integrar Google Analytics aquí)
            console.log(`🔗 CTA clicked - Button ID: ${buttonId}`);
            
            // Ejemplo de tracking con Google Analytics (descomentar si lo usas):
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'click', {
            //         'event_category': 'CTA',
            //         'event_label': buttonId,
            //         'value': 1
            //     });
            // }
            
            // Si el enlace es #, prevenir navegación y mostrar notificación
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showNotification('Por favor, agrega tu enlace de afiliado de Amazon en el atributo href del botón.', 'info');
            }
        });
    });

    // ============================================
    // SISTEMA DE NOTIFICACIONES
    // ============================================
    function showNotification(message, type = 'info') {
        // Remover notificación existente si hay
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Cerrar">&times;</button>
            </div>
        `;

        // Estilos inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'info' ? '#00C47E' : '#ff4444'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Botón de cerrar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            margin-left: 15px;
            line-height: 1;
            padding: 0;
            width: 24px;
            height: 24px;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // ============================================
    // EFECTO PARALLAX SUAVE EN HERO
    // ============================================
    let ticking = false;
    const hero = document.querySelector('.hero');
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        if (hero && scrollY > 0 && scrollY < 500) {
            const opacity = Math.max(0.8, 1 - (scrollY / 500));
            hero.style.opacity = opacity;
        } else if (hero && scrollY === 0) {
            hero.style.opacity = '1';
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ============================================
    // MEJORAS DE ACCESIBILIDAD
    // ============================================
    // Navegación por teclado mejorada
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #00C47E';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // ============================================
    // LAZY LOADING PARA IMÁGENES (si se implementa)
    // ============================================
    if ('loading' in HTMLImageElement.prototype) {
        // Navegadores modernos soportan lazy loading nativo
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback para navegadores antiguos
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // ANIMACIONES CSS ADICIONALES (inyectar estilos)
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-message {
            flex: 1;
            font-size: 14px;
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // SMOOTH SCROLL MEJORADO
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // CONTADOR DE SCROLL (opcional - para analytics)
    // ============================================
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Log de progreso de scroll (útil para analytics)
            if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
                console.log(`📊 Scroll progress: ${maxScroll}%`);
                // Aquí puedes enviar eventos a Google Analytics
            }
        }
    });

    console.log('✨ Todas las funcionalidades inicializadas correctamente');
});

// ============================================
// UTILIDADES ADICIONALES
// ============================================

/**
 * Función para detectar si el usuario está en móvil
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Función para formatear precios (si se necesita en el futuro)
 */
function formatPrice(price) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

