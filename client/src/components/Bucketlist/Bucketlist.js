import React from 'react'
import PropTypes from 'prop-types'

import './Bucketlist.css'

class Bucketlist extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)

        this.state = {
            bucketlist: this.props.bucketlist
        }
    }

    removeFromList(index, activity) {
        this.props.actions.removeActivity(index, activity.bid, activity.activity)
    }

    // componentWillReceiveProps() {
    //     this.setState({bucketlist: this.props.bucketlist})
    // }

    render() {
        // const {bucketlist} = this.props
        console.log("RERENDER")
        return (
            <>
            <BucketlistView bucketlist={this.props.bucketlist.activities} onRemove={this.removeFromList.bind(this)} />
            </>
        )
    }
}

Bucketlist.propTypes = {
    bucketlist: PropTypes.array.isRequired
}

const BucketlistView = ({bucketlist = [], onRemove}) => {
    return (
        <div className="Bucketlist">
            {bucketlist.map((x,i) => <div  key={i}><BucketlistItem index={i} activity={x} onRemove={onRemove}/></div>)}
        </div>
    )
}

BucketlistView.propTypes = {
    bucketlist: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
}

const BucketlistItem = ({index, activity, onRemove, onDone}) => {
    return (
        <div className="BucketlistItem">
            <span className="BucketlistItemTitle">
                {activity.activity}
            </span>
            <span className="BucketlistItemButtons">
                <button className="btn green" >Mark as done</button>
                <button className="btn red" onClick={() => onRemove(index, activity)}>Remove</button>
            </span>
        </div>
    )
}

export default Bucketlist