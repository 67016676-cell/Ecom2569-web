import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3)
    const [redireact, setRedireact] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount === 1) {
                    clearInterval(interval)
                    setRedireact(true)
                }
                return currentCount - 1
            })

        }, 1000)
        return () => clearInterval(interval)

    }, [])

    if(redireact){
        return <Navigate to={'/'}/>
    }

    return (
        <div>No Permission  , Redirect in {count} </div>
    )
}

export default LoadingToRedirect