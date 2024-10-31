import './SearchBar.css';

/*
Gère la recherche du libellé
*/
export default function SearchBar({ searchTerm, onSearchChange}) {
    return (
        <form className="search-bar form">
            <div className="input-group">
                <div className="input-group-prepend">
                    <i className="input-group-text fa fa-search"></i>
                </div>
                <input
                    type="text"
                    className="form-control form-input no-hover"
                    placeholder="Rechercher sur le libellé"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </form>
    );
}