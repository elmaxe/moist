import React from 'react'
import Bar from '../Bar/Bar'

const Home = (props) => {
    console.log(props)
    return (
        <div>
            {/* <Bar state={props.state.userData}/> */}
            <div style={{paddingTop: "50px"}}>
                HOME
            </div>
        </div>
    )
}

export default Home