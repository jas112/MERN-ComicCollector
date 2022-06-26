import React from 'react'
import {useDispatch} from 'react-redux'
import {removeComic} from '../features/comics/comicSlice'

function ComicItem({comic}) {

    const dispatch =  useDispatch()
    
  return (
    <div className="comic">
        <div>
            {new Date(comic.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{comic.title} #{comic.issueNumber}</h2>
        <p>Year: {comic.yearOfPublication}</p>
        <p>Publisher: {comic.yearOfPublication}</p>
        <p>Writer: {comic.writer}</p>
        <p>Artist: {comic.artist}</p>
        <button onClick={() => dispatch(removeComic(comic._id))} className='close'>&#9762;</button>
    </div>
  )
}

export default ComicItem