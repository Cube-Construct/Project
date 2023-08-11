import React from 'react'
import ReactLoading from 'react-loading'

export const LoaderBar = ({loading}) => {

    return (
        <>
            {
                loading === true &&
                <div className="parentDisable">
                    <div className='loader'>
                        <ReactLoading type="cylon" color="#222E3C"
                            height={400} width={200} />
                    </div>
                </div>
            }
        </>
    )
}
