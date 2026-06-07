function $(id) { return document.getElementById(id); }

function qs(sel) { return document.querySelector(sel); }

function qsa(sel) { return document.querySelectorAll(sel); }

function show(el) { if (typeof el === 'string') el = $(el); if (el) el.style.display = ''; }

function hide(el) { if (typeof el === 'string') el = $(el); if (el) el.style.display = 'none'; }
