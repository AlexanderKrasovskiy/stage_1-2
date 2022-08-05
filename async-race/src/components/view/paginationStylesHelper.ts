export const handlePaginationStyles = (
  count: number,
  page: number,
  prevPageBtn: HTMLElement,
  nextPageBtn: HTMLElement,
  maxOnPage: number,
) => {
  if (page === 1) {
    prevPageBtn.setAttribute('disabled', '');
    prevPageBtn.classList.remove('btn-primary');
  } else {
    prevPageBtn.removeAttribute('disabled');
    prevPageBtn.classList.add('btn-primary');
  }
  if (count <= maxOnPage || page * maxOnPage >= count) {
    nextPageBtn.setAttribute('disabled', '');
    nextPageBtn.classList.remove('btn-primary');
  } else {
    nextPageBtn.removeAttribute('disabled');
    nextPageBtn.classList.add('btn-primary');
  }
};
