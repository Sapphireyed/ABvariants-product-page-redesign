import { removeStyles } from "../utils/styles";
import { paginationListener } from "../paginationListener";

export function revertToDefault(id) {
  removeStyles(id)
  removeSidebarGallery()
}

function removeSidebarGallery() {
  const gallery = document.querySelector('.test-assignment-gallery');
  gallery.remove();
  stopPaginationObserver()
}

function stopPaginationObserver() {
  const mainSlider = document.querySelector('.product__image-slider .swiper-container');

  if (mainSlider && mainSlider.swiper) {
    mainSlider.swiper.off('slideChange', paginationListener);
  }
}
