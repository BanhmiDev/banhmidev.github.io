document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.querySelector('img').src;
            openLightbox(imageSrc);
        });
    });

    function openLightbox(imageSrc) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <span class="close">&times;</span>
            <img class="lightbox-image" src="${imageSrc}" alt="Gallery Image">
        `;
        document.body.appendChild(lightbox);

        lightbox.querySelector('.close').addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });

        lightbox.addEventListener('click', function() {
            document.body.removeChild(lightbox);
        });
    }
});