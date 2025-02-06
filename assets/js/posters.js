function toggleScrollDirection() {
    const track1 = document.getElementById('track1');
    const track2 = document.getElementById('track2');

    track1.style.animationPlayState = 'paused';
    track2.style.animationPlayState = 'paused';

    setTimeout(() => {
      if (track1.classList.contains('reverse')) {
        track1.classList.remove('reverse');
        track1.style.animation = 'scroll-left 30s linear infinite';
      } else {
        track1.classList.add('reverse');
        track1.style.animation = 'scroll-right 30s linear infinite';
      }

      if (track2.classList.contains('reverse')) {
        track2.classList.remove('reverse');
        track2.style.animation = 'scroll-left 30s linear infinite';
      } else {
        track2.classList.add('reverse');
        track2.style.animation = 'scroll-right 30s linear infinite';
      }

      track1.style.animationPlayState = 'running';
      track2.style.animationPlayState = 'running';
    }, 200); 
  }

  setInterval(toggleScrollDirection, 30000);