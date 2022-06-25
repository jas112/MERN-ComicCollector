import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {collectComic} from '../features/comics/comicSlice'

function ComicForm() {

    const [formData, setFormData] = useState({
        title: '',
        issueNumber: '',
        publisher: '',
        yearOfPublication: '',
        writer: '',
        artist: ''
    })

    const {title, issueNumber, publisher, yearOfPublication, writer, artist} = formData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };
    
    const onSubmit = (e) => {
        e.preventDefault();

        const comicFormData = {
            title, 
            issueNumber, 
            publisher, 
            yearOfPublication, 
            writer, 
            artist
        }
     
        console.log(`${JSON.stringify(comicFormData)}`)

        dispatch(collectComic(comicFormData))

          setFormData({
            title: '',
            issueNumber: '',
            publisher: '',
            yearOfPublication: '',
            writer: '',
            artist: ''
        })
    
    };

  return (
    <>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Title</label>
                    <input 
                        type="text" 
                        name='title' 
                        id='title' 
                        value={title} 
                        placeholder='ex. Superman'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Issue Number</label>
                    <input 
                        type="number" 
                        name='issueNumber' 
                        id='issueNumber' 
                        value={issueNumber} 
                        placeholder='ex. 1'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Publisher</label>
                    <input 
                        type="text" 
                        name='publisher' 
                        id='publisher' 
                        value={publisher}
                        placeholder='ex. DC' 
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Publishing Yr.</label>
                    <input 
                        type="number" 
                        name='yearOfPublication' 
                        id='yearOfPublication' 
                        value={yearOfPublication} 
                        placeholder='ex. 1939'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Writer</label>
                    <input 
                        type="text" 
                        name='writer' 
                        id='writer' 
                        value={writer} 
                        placeholder='ex. Stan Lee'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Artist</label>
                    <input 
                        type="text" 
                        name='artist' 
                        id='artist' 
                        value={artist} 
                        placeholder='ex. Jack Kirby'
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <button type='submit' className="btn btn-block">Collect Comic</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default ComicForm