import './windows.css';




export default function Unarchive(){
    return(
        <div className="overlay">
            <div className="windowContainer">
                <h2>Unarchive bookmark</h2>
                <p>Move this bookmark back to your active list?</p>
                <div className="buttons">
                    <button id="cancel" className='windowBtn'>Cancel</button>
                    <button id="archive" className='windowBtn'>Unarchive</button>
                </div>
                <button className="closeBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="#051513" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M15 5 5 15M5 5l10 10"/></svg>
                </button>
            </div>
        </div>
    )
}