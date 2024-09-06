// script.js
let selectedBlock = null;
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
let zIndex = 1;

document.querySelectorAll('.draggable').forEach(block => {
    block.addEventListener('mousedown', onMouseDown);
    block.addEventListener('touchstart', onTouchStart, { passive: false });
});

function onMouseDown(e) {
    if (selectedBlock) return;
    selectedBlock = e.target;
    selectedBlock.classList.add('dragging');

    pos3 = e.clientX;
    pos4 = e.clientY;

    selectedBlock.style.zIndex = ++zIndex;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onTouchStart(e) {
    if (selectedBlock) return;
    selectedBlock = e.target;
    selectedBlock.classList.add('dragging');

    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;

    selectedBlock.style.zIndex = ++zIndex;

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
}

function onMouseMove(e) {
    if (!selectedBlock) return;

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    selectedBlock.style.top = (selectedBlock.offsetTop - pos2) + 'px';
    selectedBlock.style.left = (selectedBlock.offsetLeft - pos1) + 'px';
}

function onTouchMove(e) {
    if (!selectedBlock) return;

    pos1 = pos3 - e.touches[0].clientX;
    pos2 = pos4 - e.touches[0].clientY;
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;

    selectedBlock.style.top = (selectedBlock.offsetTop - pos2) + 'px';
    selectedBlock.style.left = (selectedBlock.offsetLeft - pos1) + 'px';
    e.preventDefault();
}

function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    selectedBlock.classList.remove('dragging');
    selectedBlock = null;
}

function onTouchEnd() {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
    selectedBlock.classList.remove('dragging');
    selectedBlock = null;
}

document.getElementById('reset').addEventListener('click', () => {
    document.querySelectorAll('.draggable').forEach(block => {
        block.style.left = block.getAttribute('data-initial-left');
        block.style.top = block.getAttribute('data-initial-top');
    });
});
document.querySelectorAll('.draggable').forEach(block => {
    block.style.left = block.getAttribute('data-initial-left');
    block.style.top = block.getAttribute('data-initial-top');
});
