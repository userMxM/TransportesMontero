$(document).ready(function() {
    
    console.log('jQuery cargado - Transportes Montero');
    
    // ============================================================
    // NAVBAR CON EFECTO AL HACER SCROLL
    // ============================================================
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('navbar-scrolled');
        } else {
            $('#header').removeClass('navbar-scrolled');
        }
    });
    
    
    // ============================================================
    // SMOOTH SCROLL PARA ENLACES INTERNOS
    // ============================================================
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this).attr('href');
        
        if($(target).length && target !== '#') {
            e.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800, 'swing');
        }
    });
    
    
    // ============================================================
    // EFECTOS HOVER EN CARDS DE SERVICIOS
    // ============================================================
    $('.services .card').hover(
        function() {
            $(this).addClass('card-hover-effect');
            $(this).find('.card-img img').css({
                'transform': 'scale(1.1)',
                'transition': 'transform 0.4s ease'
            });
        },
        function() {
            $(this).removeClass('card-hover-effect');
            $(this).find('.card-img img').css({
                'transform': 'scale(1)',
                'transition': 'transform 0.4s ease'
            });
        }
    );
    
    
    // ============================================================
    // BOTÓN SCROLL TOP
    // ============================================================
    const $scrollTop = $('#scroll-top');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $scrollTop.fadeIn(400);
        } else {
            $scrollTop.fadeOut(400);
        }
    });
    
    $scrollTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800, 'swing');
        return false;
    });
    
    
    // ============================================================
    // ANIMACIÓN DE ESTADÍSTICAS
    // ============================================================
    function checkStatsVisibility() {
        const $statsItems = $('.stats-item');
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        $statsItems.each(function() {
            const $this = $(this);
            const elementTop = $this.offset().top;
            
            if (scrollTop + windowHeight > elementTop + 100 && !$this.hasClass('animated')) {
                $this.addClass('animated');
                $this.css({
                    'animation': 'bounceIn 0.6s ease-out',
                    'animation-fill-mode': 'both'
                });
            }
        });
    }
    
    checkStatsVisibility();
    $(window).on('scroll', checkStatsVisibility);
    
    
    // ============================================================
    // EFECTO PARALLAX EN HERO
    // ============================================================
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero-bg').css({
            'transform': 'translateY(' + (scrolled * 0.3) + 'px)',
            'opacity': 1 - (scrolled * 0.001)
        });
    });
    
    
    // ============================================================
    // INDICADOR DE SECCIÓN ACTIVA
    // ============================================================
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('.navmenu a').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));
            
            if (refElement.length && refElement.position()) {
                if (refElement.position().top <= scrollPos && 
                    refElement.position().top + refElement.height() > scrollPos) {
                    $('.navmenu a').removeClass('active');
                    currLink.addClass('active');
                }
            }
        });
    });
    
    
    // ============================================================
    // HOVER EN BOTONES
    // ============================================================
    $('.btn, .btn-getstarted').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-2px) scale(1.02)',
                'box-shadow': '0 8px 15px rgba(0,0,0,0.2)',
                'transition': 'all 0.3s ease'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0) scale(1)',
                'box-shadow': 'none',
                'transition': 'all 0.3s ease'
            });
        }
    );
    
    
    // ============================================================
    // LAZY LOADING DE IMÁGENES
    // ============================================================
    $('img').each(function() {
        const $img = $(this);
        $img.css('opacity', '0');
        
        $img.on('load', function() {
            $(this).animate({ opacity: 1 }, 500);
        });
        
        if (this.complete) {
            $img.animate({ opacity: 1 }, 500);
        }
    });
    
    
    // ============================================================
    // HOVER EN ICONOS SOCIALES
    // ============================================================
    $('.social-links a').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-3px) scale(1.1)',
                'transition': 'all 0.3s ease'
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0) scale(1)',
                'transition': 'all 0.3s ease'
            });
        }
    );
    
});