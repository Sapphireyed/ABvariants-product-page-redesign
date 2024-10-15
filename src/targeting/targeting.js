import { initContent } from '../index'
;
const rules = [
  isUrlTargeted,
  isDesktop
]

initTargeting();

function initTargeting() {
  if (rules.every(rule => rule())) {
    initContent();
    console.log('Targeting conditions met, campaign running');
  } else {
    console.log('Targeting conditions not met');
  }
}

function isDesktop() {
  return window.innerWidth > 780;
}

function isUrlTargeted() {
  return window.location.href === "URL" // URL of original website for which the experiment was prepared, now hidden for confidentiality reasons
}
