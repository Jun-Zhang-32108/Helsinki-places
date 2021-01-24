import React from 'react';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { UserTable, LoadButton } from '../components';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pager: {},      // Used to keep track of pagination related information 
            pageOfItems: [] // For storing a list of place information
        };
    }

    componentDidMount() {
        this.loadPage();
    }

    componentDidUpdate() {
        this.loadPage();
    }

    loadPage() {
        // get page of items from api
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;
        if (page !== this.state.pager.currentPage) {
            trackPromise(
                fetch(`/api/items?page=${page}`, { method: 'GET' })
                    .then(response => response.json())
                    .then(({pager, pageOfItems}) => {
                        this.setState({ pager, pageOfItems });
                    }));
        }
    }

    render() {
        const { pager, pageOfItems } = this.state;
        return (
            <div className="card text-center m-3">
                <h3 className="card-header">Places in Helsinki</h3>
                <div>
                    {/* Reader the list of places information as a table */}
                    <div>
                    <UserTable users={pageOfItems} />        
                    </div>
                </div>
                <div className="card-footer pb-0 pt-3">
                    {pager.pages && pager.pages.length &&
                        <ul className="pagination">
                            <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                            </li>
                            <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link">Previous</Link>
                            </li>
                            {pager.pages.map(page =>
                                <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                    <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                                </li>
                            )}
                            <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link">Next</Link>
                            </li>
                            <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">Last</Link>
                            </li>
                        </ul>
                    }                    
                </div>
            </div>
        );
    }
}

export { HomePage };