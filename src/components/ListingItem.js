import React from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

function ListingItem({listing, id, onDelete}) {
  return (
    <li className="categoryListing">
        <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
            <img src={listing.imgUrls[0]} alt={listing.name} className='categoryListingImg'/>
            <div className="categoryListingDetails">
                <p className="categoryListingName">
                    {listing.name}
                    </p>
                    <p className="categoryListingName">
                        Age: {listing.age}
                    </p>
                    <p className="categoryListingName">
                        Breed: {listing.breed}
                    </p>
                
            </div>
        </Link>
        {onDelete && (
            <DeleteIcon className='removeIcon' fill='rgb(231, 76, 60)' onClick={() => onDelete(listing.id, listing.name)}/>
        )}
    </li>
  )
}

export default ListingItem