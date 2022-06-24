import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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
        }

        dispatch(getUserComics())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading){
        return <Spinner />
    }


  return (
    <>
    
        <section className='heading'>
            <h1> Welcome {user && user.firstName + ' ' + user.lastName}</h1>
            <p>ComicCollector Dashboard</p>
        </section>
    
    </>

  )
}

export default Dashboard