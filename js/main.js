// JavaScript is only used for two things that CSS cannot do:
// 1. the light/dark theme button (and remembering the choice)
// 2. fading the page out before moving to another page

// 1. Theme toggle
document.getElementById('theme').addEventListener('click', function () {
  var root = document.documentElement;
  var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// 2. Page leave transition
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('click', function (e) {
  var a = e.target.closest('a');
  if (!a || a.target || a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey) return;
  var href = a.getAttribute('href');
  if (!href || /^(https?:|mailto:|#)/.test(href) || a.href === location.href) return;
  e.preventDefault();
  document.body.classList.add('leaving');
  setTimeout(function () { location.href = a.href; }, reduce ? 0 : 220);
});
window.addEventListener('pageshow', function (e) {
  if (e.persisted) document.body.classList.remove('leaving');
});
