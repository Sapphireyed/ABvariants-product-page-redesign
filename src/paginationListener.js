export function paginationListener() {
  const mainSlider = document.querySelector('.product__image-slider .swiper-container');
  const activeIndex = mainSlider.swiper.activeIndex;
  updateSidebarActiveImage(activeIndex);
}

function updateSidebarActiveImage(activeIndex) {
  const sidebar = document.querySelector('.test-gallery');
  const pictures = Array.from(sidebar.querySelectorAll('img'));

  pictures.forEach(picture => picture.classList.remove('test-active'));

  const activePicture = pictures[activeIndex];
  if (activePicture) {
    activePicture.classList.add('test-active');
  }
}
