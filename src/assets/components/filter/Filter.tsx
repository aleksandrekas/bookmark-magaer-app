import './filter.css'




export default function Filter(){
    return (
        <div className="filter">
            <h1>All bookmarks</h1>
            <button className="filterBtn">
                <img src="/images/icon-sort.svg" alt="sort" />
                sort by
            </button>
        </div>
    )
}