import React from 'react'
import {Link} from 'react-router-dom'
import Slider from '../components/Slider'
import dogImage from '../assets/jpg/dogs.png'
import catImage from '../assets/jpg/cats.png'
import bunnyImage from '../assets/jpg/bunny.jpg'

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
            <img src={dogImage} alt="dogs"
              className='exploreCategoryImg'
             />
             <p className="exploreCategoryName">Dogs</p>
          </Link>
          <Link to='/category/cat'>
            <img src={catImage} alt="cats"
              className='exploreCategoryImg'
             />
             <p className="exploreCategoryName">Cats</p>
          </Link>
          <Link to='/category/other'>
            <img src={bunnyImage} alt="others"
              className='exploreCategoryImg'
             />
             <p className="exploreCategoryName">Other</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore