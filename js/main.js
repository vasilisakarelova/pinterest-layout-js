import $ from 'jquery';

const setColumns = (container, base) => {
  const items = [...document.querySelectorAll('[data-grid-item]')];
  let col = 0;
  let columnHeight = 0;
  let rowWidth = 0;

  let column = {};

  for (let i = 0; i < base; i++) {
    column[i] = {
      height: columnHeight,
    };
  }

  items.forEach((item) => {
    if (col === base) {
      col = 0;
      rowWidth = 0;
    }

    item.style.top = `${ column[col].height }px`;
    item.style.left = `${ rowWidth }px`;

    for (let prop in column[col]) {
      column[col][prop] += item.offsetHeight;
    }

    rowWidth += item.offsetWidth;
    col++;
  });
}

const getColumnCount = () => {
  const container = document.querySelector('[data-grid-container]');

  setColumns(container, ((width) => {
    switch (true) {
    case width < 768:
      return 1;

    case width < 1024:
      return 3;

    default:
      return 4;
    }
  })($(window).width()));
}

getColumnCount();
$(window).on('resize', () => getColumnCount());
$(window).on('orientationchange', () => getColumnCount());

[...document.querySelectorAll('[data-sub-menu]')].forEach((subMenu) => {
  subMenu.addEventListener('mouseover', (el) => {
    el.target.classList.add('is-shown');
  });

  subMenu.addEventListener('mouseleave', (el) => {
    el.target.classList.remove('is-shown');
  });
});
