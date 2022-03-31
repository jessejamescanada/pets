import React from 'react'
import {Link} from 'react-router-dom'
import Slider from '../components/Slider'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        <Slider />

        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to='/category/dog'>
            <img src={rentCategoryImage} alt="dogs"
              className='exploreCategoryImg'
             />
             <p className="exploreCategoryName">Dogs</p>
          </Link>
          <Link to='/category/cat'>
            <img src={sellCategoryImage} alt="cats"
              className='exploreCategoryImg'
             />
             <p className="exploreCategoryName">Cats</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore