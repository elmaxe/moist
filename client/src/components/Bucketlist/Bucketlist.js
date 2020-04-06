import React from 'react'
import PropTypes from 'prop-types'

class Bucketlist extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    removeFromList(index, activity) {
        console.log(activity)
        this.props.actions.removeActivity(index, activity.aid)
    }

    render() {
        const {bucketlist} = this.props
        return (
            <>
            <BucketlistView bucketlist={bucketlist} onRemove={this.removeFromList.bind(this)} />
            </>
            
        )
    }
}

Bucketlist.propTypes = {
    bucketlist: PropTypes.array.isRequired
}

const BucketlistView = ({bucketlist, onRemove}) => {
    return (
        <div>
            {bucketlist.map((x,i) => <div key={i}>{x.activity}<button onClick={() => onRemove(i, x)}>x</button></div>)}
        </div>
    )
}

BucketlistView.propTypes = {
    bucketlist: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default Bucketlist