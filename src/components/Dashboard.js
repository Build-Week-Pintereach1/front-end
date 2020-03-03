import React from 'react'

export const Dashboard = (props) => {

    let signOut = () => {
        window.localStorage.removeItem('pintereachAuth');
        props.history.push('/');
        props.history.go();
    }


    return (
        <div>
            <button className='btn btn-primary' onClick={signOut}>Sign Out</button>
        </div>
    )
}
