import { addStyles } from "../utils/styles";
import css from './variation.css'
import { waiter } from "../utils/utils";
import { paginationListener } from "../paginationListener";
export function applyVariant(){
  addStyles(css, 'test-1-styles');

  waiter('.product__image-slider .swiper-wrapper')
    .then(insertHiddenGallery)
    .then(hideSimilar)
    // Not doing this directly in css, because hiding this element before adding other changes may cause layout shift which I want to avoid by delaying hiding
    .then(showGallery)
    .catch(e => console.log('error while running variation: ', e))
}

function showGallery() {
  const sidebarGallery = document.querySelector('.test-gallery');
  sidebarGallery?.classList.remove('test-hidden');
}

function insertHiddenGallery() {
  const mainImage = document.querySelector('.product__image-slider'); // doesn't need error handling, we wait for selector

  const galleryHTML = '<div class="test-gallery test-hidden"></div>';
  mainImage.parentNode.insertAdjacentHTML('beforebegin', galleryHTML);

  addPicturesToGallery();
  addInteractions();
}

function addInteractions() {
  addSidebarImageClicks();
  addMainImageObserver();
}

function addMainImageObserver() {
  const mainSlider = document.querySelector('.product__image-slider .swiper-container');

  if (mainSlider && mainSlider.swiper) {
    mainSlider.swiper.on('slideChange', paginationListener);
  }  else {
    console.warn('Swiper not initialized or not found');
  }
}

function addSidebarImageClicks() {
  const sidebar = document.querySelector('.test-gallery');
  const pictures = Array.from(sidebar.querySelectorAll('img'));
  const pagination = document.querySelectorAll('.swiper-pagination span');

  pictures.forEach((picture, i) => {
    picture.addEventListener("click", () => {
      if (pagination[i]) pagination[i].click();
     });
  });
}

function addPicturesToGallery() {
  const allImagesString = getAllPictures();

  const sideGallery = document.querySelector('.test-gallery');
  sideGallery?.insertAdjacentHTML('afterbegin', allImagesString)
}

function getAllPictures() {
  const mainGallery = document.querySelector('.product__image-slider .swiper-wrapper');

  const images = mainGallery?.querySelectorAll('.swiper-slide');
  const imagesNum = images.length;

  let allImagesString = '';

  for (let i = 0 ;i < imagesNum; i++) {
    const image = images[i];
    const picture = image.querySelector('img')
    const dataSrc = picture.getAttribute('data-src')
    picture.src = dataSrc ? dataSrc : picture.src;

    if (picture.closest('.swiper-slide-active')) {
      picture.classList.add('test-active');
    }
    allImagesString += picture.outerHTML;
  }

  return allImagesString.replaceAll('lazy_load_image', '');
}

function hideSimilar() {
  const similarDiv = document.querySelector('.vertical-recommendations-container')?.parentNode;
   if (similarDiv) {
    similarDiv.classList.add('test-hidden')
  }
}
