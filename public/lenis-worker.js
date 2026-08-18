// Lenis smooth scroll worker
let lastTime = 0;

self.onmessage = (e) => {
  const { type, time } = e.data;
  
  if (type === 'tick') {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    self.postMessage({
      type: 'tick',
      deltaTime,
      time,
    });
  }
};
