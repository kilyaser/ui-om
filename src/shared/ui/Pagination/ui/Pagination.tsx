
interface PaginationProps {
    className?: string;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
    const {
        onPageChange,
        totalPages,
        currentPage
    } = props;

    const handlePageChange = (page: number) => {
        if (page >= 0 && page < totalPages) {
            onPageChange(page);
        }
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={() => handlePageChange(index)}>
                            {index + 1}
                        </a>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;