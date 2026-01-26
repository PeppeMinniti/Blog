/**
 * Lightbox System - Thumbnail Gallery
 * Gestisce l'apertura e chiusura di immagini e video in lightbox
 */

document.addEventListener('DOMContentLoaded', function() {
  // Crea l'elemento lightbox una volta sola
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.id = 'lightbox';

  // Crea il pulsante di chiusura
  const closeBtn = document.createElement('span');
  closeBtn.className = 'close-lightbox';
  closeBtn.innerHTML = '&times;';
  closeBtn.setAttribute('aria-label', 'Chiudi lightbox');

  // Crea un contenitore per il contenuto (immagine o video)
  const contentContainer = document.createElement('div');
  contentContainer.id = 'lightbox-container';

  // Aggiungi gli elementi al lightbox
  lightbox.appendChild(closeBtn);
  lightbox.appendChild(contentContainer);
  document.body.appendChild(lightbox);

  // Variabile per tracciare il tipo di media corrente
  let currentMediaElement = null;

  // Funzione per aprire il lightbox con immagine
  function openImageLightbox(imageSrc) {
    // Pulisci contenuto precedente
    contentContainer.innerHTML = '';

    // Crea nuova immagine
    const img = document.createElement('img');
    img.className = 'lightbox-content';
    img.src = imageSrc;

    contentContainer.appendChild(img);
    currentMediaElement = img;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Funzione per aprire il lightbox con video
  function openVideoLightbox(videoSrc) {
    // Pulisci contenuto precedente
    contentContainer.innerHTML = '';

    // Crea nuovo video
    const video = document.createElement('video');
    video.className = 'lightbox-video';
    video.controls = true;
    video.autoplay = true;

    // Aggiungi source
    const source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';

    video.appendChild(source);
    contentContainer.appendChild(video);
    currentMediaElement = video;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Funzione per chiudere il lightbox
  function closeLightbox() {
    // Se c'è un video, fermalo
    if (currentMediaElement && currentMediaElement.tagName === 'VIDEO') {
      currentMediaElement.pause();
      currentMediaElement.currentTime = 0;
    }

    lightbox.classList.remove('active');
    document.body.style.overflow = '';

    // Pulisci dopo animazione
    setTimeout(() => {
      contentContainer.innerHTML = '';
      currentMediaElement = null;
    }, 300);
  }

  // Event listener per thumbnail immagini
  const imageThumbnails = document.querySelectorAll('.project-thumbnail');
  imageThumbnails.forEach(function(thumbnail) {
    thumbnail.addEventListener('click', function() {
      openImageLightbox(this.src);
    });

    // Accessibilità: supporto tastiera
    thumbnail.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openImageLightbox(this.src);
      }
    });

    // Aggiungi attributi per accessibilità
    thumbnail.setAttribute('role', 'button');
    thumbnail.setAttribute('tabindex', '0');
    thumbnail.setAttribute('aria-label', 'Clicca per ingrandire l\'immagine');
  });

  // Event listener per thumbnail video (wrapper)
  const videoWrappers = document.querySelectorAll('.video-thumbnail-wrapper');
  videoWrappers.forEach(function(wrapper) {
    const videoElement = wrapper.querySelector('video');

    if (videoElement) {
      wrapper.addEventListener('click', function() {
        openVideoLightbox(videoElement.src);
      });

      // Accessibilità: supporto tastiera
      wrapper.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openVideoLightbox(videoElement.src);
        }
      });

      // Aggiungi attributi per accessibilità
      wrapper.setAttribute('role', 'button');
      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('aria-label', 'Clicca per riprodurre il video');
    }
  });

  // Chiudi lightbox cliccando sul pulsante X
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    closeLightbox();
  });

  // Chiudi lightbox cliccando sullo sfondo
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Chiudi lightbox con tasto ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Previeni chiusura quando si clicca sul video/immagine
  contentContainer.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // ============================================
  // FUNZIONI GLOBALI per pagine progetti
  // ============================================

  // Esponi funzioni globalmente per uso inline onclick
  window.openLightbox = function(imgElement) {
    // Accetta sia un elemento img che un URL stringa
    const imgSrc = typeof imgElement === 'string' ? imgElement : imgElement.src;
    openImageLightbox(imgSrc);
  };

  window.closeLightbox = function() {
    closeLightbox();
  };

  window.openVideoModal = function(videoSrc, posterSrc, title) {
    openVideoModalFull(videoSrc, posterSrc, title);
  };

  window.closeVideoModal = function() {
    closeVideoModalFull();
  };

  // ============================================
  // VIDEO MODAL SYSTEM - Per pagine progetto
  // ============================================

  // Crea il video modal se non esiste
  if (!document.getElementById('video-modal')) {
    const modalHTML = `
      <div id="video-modal" class="video-modal">
        <div class="video-modal-content">
          <span class="video-modal-close">&times;</span>
          <video id="modal-video" controls controlsList="nofullscreen">
            <source id="modal-video-source" src="" type="video/mp4">
          </video>
          <p class="video-modal-title" id="modal-video-title"></p>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Funzione per aprire il modal video
  function openVideoModalFull(videoSrc, posterSrc, title) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    const source = document.getElementById('modal-video-source');
    const titleEl = document.getElementById('modal-video-title');

    if (modal && video && source) {
      source.src = videoSrc;
      if (posterSrc) {
        video.poster = posterSrc;
      }
      video.load();

      if (titleEl && title) {
        titleEl.textContent = title;
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Funzione per chiudere il modal video
  function closeVideoModalFull() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');

    if (modal && video) {
      video.pause();
      video.currentTime = 0;
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Event listener per chiusura modal
  const videoModal = document.getElementById('video-modal');
  const videoModalClose = document.querySelector('.video-modal-close');

  if (videoModal) {
    // Chiudi cliccando sullo sfondo
    videoModal.addEventListener('click', function(e) {
      if (e.target === videoModal) {
        closeVideoModalFull();
      }
    });

    // Chiudi cliccando sulla X
    if (videoModalClose) {
      videoModalClose.addEventListener('click', function(e) {
        e.stopPropagation();
        closeVideoModalFull();
      });
    }

    // Previeni chiusura cliccando sul video
    const videoModalContent = document.querySelector('.video-modal-content');
    if (videoModalContent) {
      videoModalContent.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    // Chiudi con ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModalFull();
      }
    });
  }
});
