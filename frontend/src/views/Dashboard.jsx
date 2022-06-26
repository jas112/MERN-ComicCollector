import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import ComicForm from '../components/ComicForm'
import ComicItem from '../components/ComicItem'
import Spinner from '../components/Spinner'
import {getUserComics, reset} from '../features/comics/comicSlice'

function Dashboard() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const {comics, isLoading, isError, message} = useSelector((state) => state.comics)

    useEffect(() => {

        if(isError){
            console.log(message);
        }

        if(!user){
            navigate('/login')
        }else{
            return
        }

        dispatch(getUserComics())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading){
        return <Spinner/>
    }

  return (
    <div>
        <section className='heading'>
            <h1> Welcome {user && user.firstName + ' ' + user.lastName}</h1>
            <p>ComicCollector Dashboard</p>
        </section>
        <ComicForm/>
        <section className='content'>

            {comics.length > 0 ? (
                <div className="comics">
                    {comics.map((comic) => (
                        <ComicItem key={comic._id} comic={comic} />
                    ))}
                </div>
            ) : (<h3> You have not collected any comics.</h3>)}
            
        </section>
    </div>
  )
}

export default Dashboard