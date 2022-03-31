import React from 'react'
import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'
import Spinner from '../components/Spinner'
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
import shareIcon from '../assets/svg/shareIcon.svg'
import { getAuth } from 'firebase/auth'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied ] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'pets', params.listingId)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()) {
                console.log(docSnap.data())
                setListing(docSnap.data())
                setLoading(false)
            }
        }
        fetchListing()
    }, [navigate, params.listingId])
    
    if(loading) {
        return <Spinner />
    }

  return (
    <main>
        <Swiper slidesPerView={1} pagination={{clickable:true}}>
            {listing.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                    <div style={{background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: 'cover'}} className="swiperSlideDiv"></div>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className="shareIconDiv" onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
                setShareLinkCopied(false)
            }, 2000);
        }}>
            <img src={shareIcon} alt="share" />
        </div>
        {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

        <div className="listingDetails">
            <p className="listingName">
                {listing.name} - {listing.breed}
            </p>
            <p className="listingType" style={{backgroundColor: listing.sex == 'male' ? '#5AB6FF' : '#FE95D8'}}>
                 {listing.sex}- {listing.age} years old
            </p>
        </div>
    </main>
  )
}

export default Listing