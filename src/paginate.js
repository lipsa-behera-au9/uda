import React from 'react';

const Paginate = (props) => {
  var cp = props.currentPage
  let getUsers = props.getUsers

  if (cp === 0) {
    return (
      <div className="card-pagination">
        <span className="page-no">Page 1 </span>
        <a onClick={() => getUsers("_start=10&_end=20", 1)}>
          <i className="fas fa-angle-double-right"></i>
        </a>
        {/* <button 
          type="button"
          onClick={() => props.getUsers("_start=10&_end=20", 1)}
        >
          <i className="fas fa-angle-double-right"></i>
        </button> */}
      </div>
    )
  } else if (cp < props.pageLimit - 1) {
    return (
      <div className="card-pagination">
        <a onClick={() => getUsers(`_start=${(cp-1) * 10}&_end=${cp * 10}`, -1)}>
          <i className="fas fa-angle-double-left"></i>
        </a>
        <span className="page-no"> Page { cp + 1 } </span>
        <a onClick={() => getUsers(`_start=${(cp+1) * 10}&_end=${(cp+2) * 10}`, 1)}>
          <i className="fas fa-angle-double-right"></i>
        </a>
      </div>
    )
  } else {
    return (
      <div className="card-pagination">
        <a onClick={() => getUsers(`_start=${(cp-1) * 10}&_end=${cp * 10}`, -1)}>
          <i className="fas fa-angle-double-left"></i>
        </a>
        <span className="page-no"> Page { cp + 1 } </span>
      </div>
    )
  }
}

export default Paginate;