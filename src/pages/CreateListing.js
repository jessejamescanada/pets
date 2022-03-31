import React from 'react'
import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {db} from '../firebase.config'
import {v4 as uuidv4} from 'uuid'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify';

function CreateListing() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: 'dog',
        name: '',
        age: 1,
        sex: 'female',
        breed: '',
        images: {},
    })

    const {type, name, age, sex, breed, images} = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if(isMounted){
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setFormData({...formData, userRef: user.uid})
                }else{
                    navigate('/sign-in')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(images.length > 6) {
            setLoading(false)
            toast.error('Max 6 images')
            return
        }
        // store images in firebase
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

                const storageRef = ref(storage, 'images/' + fileName)

                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on('state_changed', 
                    (snapshot) => {
                        
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        }
                    }, 
                    (error) => {
                        reject(error)
                    }, 
                    () => {
                        
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                        });
                    }
                );
            })
        }

        const imgUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false)
            toast.error('Images not uploaded')
            return
        })

        const formDataCopy = {
            ...formData,
            imgUrls,
            timestamp: serverTimestamp()
        }
        delete formDataCopy.images

        const docRef = await addDoc(collection(db, 'pets'), formDataCopy)

        setLoading(false)
        toast.success('Your pet has been added!')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }
    const onMutate = e => {
        // files
        if(e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }

        if(!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }))
        }
    }

    if(loading) {
        return <Spinner />
    }

  return (
    <div className='profile'>
        <header>
            <p className="pageHeader">Create a post for your pet!</p>
        </header>
        <main>
            <form onSubmit={onSubmit}>
                <label className="formLabel">Cat / Dog</label>
                <div className="formButtons">
                    <button type="button" className={type === 'dog' ? 'formButtonActive' : 'formButton' } 
                    id='type'
                    value='dog'
                    onClick={onMutate}
                    >
                        Dog
                    </button>
                    <button type="button" className={type === 'cat' ? 'formButtonActive' : 'formButton' } 
                    id='type'
                    value='cat'
                    onClick={onMutate}
                    >
                        Cat
                    </button>
                </div>
                <label className="formLabel">Name</label>
                <input type="text"
                className='formInputName'
                id='name'
                value={name}
                onChange={onMutate}
                maxLength = '24'
                minLength='2'
                required
                />
                <div>
                <label className="formLabel">Age</label>
                <input type="number"
                className='formInputSmall'
                id='age'
                value={age}
                onChange={onMutate}
                min='0'
                max='40'
                required
                />
                </div>
                <label className="formLabel">Breed</label>
                <input type="text"
                className='formInputName'
                id='breed'
                value={breed}
                onChange={onMutate}
                maxLength = '40'
                minLength='2'
                required
                />
                <label className="formLabel">Sex</label>
                <div className="formButtons">
                <button type="button" className={sex === 'male' ? 'formButtonActive' : 'formButton' } 
                    id='sex'
                    value='male'
                    onClick={onMutate}
                    >
                        Male
                    </button>
                    <button type="button" className={sex === 'female' ? 'formButtonActive' : 'formButton' } 
                    id='sex'
                    value='female'
                    onClick={onMutate}
                    >
                        Female
                    </button>
                </div>
            
                <label className="formLabel">Images</label>
                <input type="file"
                className='formInputFile'
                id='images'
                onChange={onMutate}
                max='6'
                accept='.jpg,.png,.jpeg'
                multiple
                required
                />
        <button className="primaryButton createListingButton"
            type='submit'>
                Upload Your Pet
        </button>
        </form>

        </main>
    </div>
  )
}

export default CreateListing