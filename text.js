function format(command, value = null) {
  document.execCommand(command, false, value);
}

// Update color function to apply color only to selection, then reset typing color
function changeColor(color) {
  format('foreColor', color);

  // After applying color, reset typing color so new text is default color
  document.execCommand('styleWithCSS', false, false);
}
// Update toolbar buttons to show which is active
function updateActiveButtons() {
  const cmds = ['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
  cmds.forEach(cmd => {
    const button = document.querySelector(`button[onclick="format('${cmd}')"]`);
    if (document.queryCommandState(cmd)) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// When user changes text selection or cursor, update buttons
document.addEventListener('selectionchange', updateActiveButtons);

// Also update after clicking toolbar buttons (wait a bit for command to apply)
document.querySelectorAll('.toolbar button').forEach(btn => {
  btn.addEventListener('click', () => setTimeout(updateActiveButtons, 10));
});
