import './itemsHolder.css';
import LinkItem from '../linkItem/LinkItem';
import Filter from '../filter/Filter';

export default function itemsHolder(){
    return(
        <div className="itemHolder">
            <Filter />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />
            <LinkItem />


        </div>
    )
}


