function drawLineChart(canvasId, data, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;
  const pad = { t: 20, r: 20, b: 30, l: 40 };
  const cw = w - pad.l - pad.r;
  const ch = h - pad.t - pad.b;
  const max = Math.max(...data.values, 1);
  const stepX = cw / (data.values.length - 1 || 1);
  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(0,0,0,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + ch - (ch * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(w - pad.r, y);
    ctx.stroke();
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round((max * i) / 4), pad.l - 6, y + 3.5);
  }

  const points = data.values.map((v, i) => ({
    x: pad.l + i * stepX,
    y: pad.t + ch - (v / max) * ch
  }));

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cx, points[i - 1].y, cx, points[i].y, points[i].x, points[i].y);
  }
  ctx.strokeStyle = color || '#B30016';
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.stroke();

  const grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
  grad.addColorStop(0, (color || '#B30016') + '30');
  grad.addColorStop(1, (color || '#B30016') + '00');
  ctx.lineTo(points[points.length - 1].x, h - pad.b);
  ctx.lineTo(points[0].x, h - pad.b);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = color || '#B30016';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });
}

function drawBarChart(canvasId, data, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;
  const pad = { t: 20, r: 20, b: 30, l: 40 };
  const cw = w - pad.l - pad.r;
  const ch = h - pad.t - pad.b;
  const max = Math.max(...data.values, 1);
  const barW = cw / data.values.length * 0.6;
  const gap = cw / data.values.length;

  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(0,0,0,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + ch - (ch * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(w - pad.r, y);
    ctx.stroke();
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round((max * i) / 4), pad.l - 6, y + 3.5);
  }

  data.values.forEach((v, i) => {
    const x = pad.l + i * gap + (gap - barW) / 2;
    const bh = (v / max) * ch;
    const y = pad.t + ch - bh;
    const radius = 4;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + barW - radius, y);
    ctx.quadraticCurveTo(x + barW, y, x + barW, y + radius);
    ctx.lineTo(x + barW, pad.t + ch);
    ctx.lineTo(x, pad.t + ch);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fillStyle = (colors && colors[i]) || '#B30016';
    ctx.fill();
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '9px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(data.labels[i], x + barW / 2, h - pad.b + 18);
  });
}

function drawPieChart(canvasId, data, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;
  const cx = w * 0.35;
  const cy = h / 2;
  const r = Math.min(cx - 10, cy - 10);
  const total = data.values.reduce((a, b) => a + b, 0) || 1;

  ctx.clearRect(0, 0, w, h);

  let startAngle = -Math.PI / 2;
  data.values.forEach((v, i) => {
    const slice = (v / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + slice);
    ctx.closePath();
    ctx.fillStyle = (colors && colors[i]) || '#B30016';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
    startAngle += slice;
  });

  const legendX = w * 0.65;
  const legendGap = 22;
  const startY = cy - ((data.labels.length - 1) * legendGap) / 2;
  data.labels.forEach((label, i) => {
    const ly = startY + i * legendGap;
    ctx.fillStyle = (colors && colors[i]) || '#B30016';
    ctx.fillRect(legendX, ly - 4, 12, 12);
    ctx.fillStyle = '#111827';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'left';
    const pct = Math.round((data.values[i] / total) * 100);
    ctx.fillText(label + ' (' + pct + '%)', legendX + 20, ly + 4);
  });
}

function drawAreaChart(canvasId, data, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;
  const pad = { t: 20, r: 20, b: 30, l: 40 };
  const cw = w - pad.l - pad.r;
  const ch = h - pad.t - pad.b;
  const max = Math.max(...data.values, 1);
  const stepX = cw / (data.values.length - 1 || 1);

  ctx.clearRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(0,0,0,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + ch - (ch * i) / 4;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(w - pad.r, y);
    ctx.stroke();
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round((max * i) / 4), pad.l - 6, y + 3.5);
  }

  const points = data.values.map((v, i) => ({
    x: pad.l + i * stepX,
    y: pad.t + ch - (v / max) * ch
  }));

  const grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
  grad.addColorStop(0, (color || '#0EA5E9') + '60');
  grad.addColorStop(1, (color || '#0EA5E9') + '00');

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cx, points[i - 1].y, cx, points[i].y, points[i].x, points[i].y);
  }
  ctx.lineTo(points[points.length - 1].x, h - pad.b);
  ctx.lineTo(points[0].x, h - pad.b);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const cx = (points[i - 1].x + points[i].x) / 2;
    ctx.bezierCurveTo(cx, points[i - 1].y, cx, points[i].y, points[i].x, points[i].y);
  }
  ctx.strokeStyle = color || '#0EA5E9';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = color || '#0EA5E9';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });
}
