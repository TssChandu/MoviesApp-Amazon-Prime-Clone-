import './index.css'
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md'

const Pagination = ({onClickPage, active, data}) => {
  const pageNumbers = []
  for (let i = 1; i <= data; i += 1) {
    pageNumbers.push(i)
  }

  const onPageFirst = () => {
    onClickPage(1)
  }

  const onPageBack = () => {
    if (parseInt(active) > 1) {
      onClickPage(parseInt(active) - 1)
    }
  }

  const onPageNext = () => {
    if (parseInt(active) < data) {
      onClickPage(parseInt(active) + 1)
    }
  }

  const onPageLast = () => {
    onClickPage(data)
  }

  const pageClick = e => {
    onClickPage(e.target.textContent)
  }

  return (
    <div>
      <center className="pagination-container">
        <button type="button" className="icon" onClick={onPageFirst}>
          <MdFirstPage size={25} />
        </button>
        <button type="button" className="icon" onClick={onPageBack}>
          <MdNavigateBefore size={25} />
        </button>
        {pageNumbers.map(page => (
          <button
            type="button"
            key={page}
            className={`pageButton ${
              parseInt(active) === page ? 'active' : ''
            }`}
            onClick={pageClick}
          >
            {page}
          </button>
        ))}
        <button type="button" className="icon" onClick={onPageNext}>
          <MdNavigateNext size={25} />
        </button>
        <button type="button" className="icon" onClick={onPageLast}>
          <MdLastPage size={25} />
        </button>
      </center>
    </div>
  )
}

export default Pagination
