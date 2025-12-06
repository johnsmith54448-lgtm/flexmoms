// js/main.js - reads MOMFLEX_CONFIG and injects content into page
window.MOMFLEX_CONFIG = window.MOMFLEX_CONFIG || { cta: { affiliateUrl: '#' } };

(function(cfg) {
  function setText(selector, value) {
    var el = document.querySelector(selector);
    if(el) el.textContent = value;
  }
  function setHTML(selector, html) {
    var el = document.querySelector(selector);
    if(el) el.innerHTML = html;
  }
  function setAttr(selector, attr, value) {
    var el = document.querySelector(selector);
    if(el) el.setAttribute(attr, value);
  }
  function setSrc(selector, value) {
    var el = document.querySelector(selector);
    if(el) el && (el.src = value);
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Site / header
    setText('[data-field="brandName"]', cfg.site.brandName || '');
    setText('[data-field="tagline"]', cfg.site.tagline || '');
    setText('[data-field="year"]', cfg.site.year || (new Date()).getFullYear());

    // Logo
    if(cfg.assets && cfg.assets.logo) {
      var logoEl = document.querySelector('[data-field="logo"]');
      if(logoEl) logoEl.src = cfg.assets.logo;
    }

    // Hero
    setText('[data-field="headline"]', cfg.hero.headline || '');
    setText('[data-field="subheadline"]', cfg.hero.subheadline || '');
    var heroImg = document.querySelector('[data-field="heroImage"]');
    if(heroImg) {
      if(cfg.hero.imageMobile) heroImg.setAttribute('srcset', cfg.hero.imageMobile + ' 800w, ' + cfg.hero.image + ' 1200w');
      if(cfg.hero.image) heroImg.setAttribute('src', cfg.hero.image);
    }

    // Features list
    var featContainer = document.querySelector('[data-field="features"]');
    if(featContainer && Array.isArray(cfg.features)) {
      featContainer.innerHTML = cfg.features.map(function(f){ return '<div class="feature">'+f+'</div>'; }).join('');
    }

    // CTA text and link
    setText('[data-field="ctaText"]', cfg.cta.text || 'Get started');
    document.querySelectorAll('[data-field="ctaLink"]').forEach(function(a) {
      a.setAttribute('href', cfg.cta.affiliateUrl || '#');
    });

    // Testimonials
    var tWrap = document.querySelector('[data-field="testimonials"]');
    if(tWrap && Array.isArray(cfg.testimonials)){
      tWrap.innerHTML = cfg.testimonials.map(function(t){
        return '<article class="testimonial" role="listitem">' +
                 '<img src="'+t.image+'" alt="'+(t.name||'')+'" loading="lazy" decoding="async">' +
                 '<div style="font-style:italic">'+(t.text||'')+'</div>' +
                 '<div style="font-weight:700;margin-top:8px">'+(t.name||'')+'</div>' +
               '</article>';
      }).join('');
    }

    // Legal links
    if(cfg.legal){
      document.querySelectorAll('[data-field="termsLink"]').forEach(function(a){ a.setAttribute('href', cfg.legal.termsUrl || '#'); });
      document.querySelectorAll('[data-field="privacyLink"]').forEach(function(a){ a.setAttribute('href', cfg.legal.privacyUrl || '#'); });
    }

    // Analytics hook placeholder
    document.querySelectorAll('a.cta').forEach(function(a){ a.addEventListener('click', function(){ try{ console.log('CTA click'); }catch(e){} }); });
  });

})(window.MOMFLEX_CONFIG);
