import React from 'react'
import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {collectComic, reset} from '../features/comics/comicSlice'

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

    const distpatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {

        e.preventDefault();

        distpatch(collectComic({formData}))
        setFormData()

    }

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
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Issue Number</label>
                    <input 
                        type="Number" 
                        name='issueNumber' 
                        id='issueNumber' 
                        value={issueNumber} 
                        placeholder='ex. 1'
                        onChange={(e) => setText(e.target.value)}
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
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Publishing Yr.</label>
                    <input 
                        type="Number" 
                        name='yearOfPublication' 
                        id='yearOfPublication' 
                        value={yearOfPublication} 
                        placeholder='ex. 1939'
                        onChange={(e) => setText(e.target.value)}
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
                        onChange={(e) => setText(e.target.value)}
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
                        onChange={(e) => setText(e.target.value)}
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