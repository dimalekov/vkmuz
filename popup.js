// content.js
console.log("VK SK Extension loaded");

function addSKToTracks() {
  // More reliable selector using data-audio-id
  const tracks = document.querySelectorAll('div[data-audio-id]');

  tracks.forEach(track => {
    // Skip if we already added SK
    if (track.querySelector('.sk-label')) return;

    // Find the actions area (where buttons like play, add, more appear)
    const actions = track.querySelector(`
      .audio_row__actions,
      [class*="actions"],
      .vkuiButtonGroup,
      .vkit-ButtonGroup
    `);

    if (actions) {
      const skLabel = document.createElement('span');
      skLabel.textContent = ' SK ';
      skLabel.className = 'sk-label';
      skLabel.style.cssText = `
        color: #ff4d4d;
        font-weight: 700;
        font-size: 14px;
        margin-left: 6px;
        padding: 3px 7px;
        border: 2px solid #ff4d4d;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        background: rgba(0,0,0,0.6);
      `;

      actions.appendChild(skLabel);
    }
  });
}

// Run immediately
addSKToTracks();

// Watch for new tracks being loaded
const observer = new MutationObserver(addSKToTracks);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Extra safety for hover
document.addEventListener('mouseover', (e) => {
  if (e.target.closest('div[data-audio-id]')) {
    addSKToTracks();
  }
});
