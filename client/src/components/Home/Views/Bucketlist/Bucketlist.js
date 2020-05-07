import React from 'react'
import PropTypes from 'prop-types'

import './Bucketlist.css'

class Bucketlist extends React.Component {
    constructor(props) {
        super(props)
    }

    removeFromList(index, activity) {
        this.props.actions.removeActivity(index, activity.bid, activity.activity)
    }

    onMarkAsDone(index, activity) {
        console.log(index)
        console.log(activity)
    }

    render() {
        return (
            <>
                <BucketlistView
                    bucketlist={this.props.bucketlist.activities}
                    onRemove={this.removeFromList.bind(this)}
                    onMarkAsDone={this.onMarkAsDone.bind(this)}
                />
            </>
        )
    }
}

Bucketlist.propTypes = {
    bucketlist: PropTypes.object.isRequired
}

const BucketlistView = ({bucketlist = [], onRemove, onMarkAsDone}) => {
    return (
        <div className="Bucketlist">
            {bucketlist.map((x,i) => <div  key={i}><BucketlistItem index={i} activity={x} onRemove={onRemove} onMarkAsDone={onMarkAsDone}/></div>)}
        </div>
    )
}

BucketlistView.propTypes = {
    bucketlist: PropTypes.array,
    onRemove: PropTypes.func.isRequired
}

const BucketlistItem = ({index, activity, onRemove, onMarkAsDone}) => {
    return (
        <div className="BucketlistItem">
            <span className="BucketlistItemTitle">
                {activity.activity}
            </span>
            <span className="BucketlistItemButtons">
                <button className="btn green" onClick={() => onMarkAsDone(index, activity)}>Mark as done</button>
                <button className="btn red" onClick={() => onRemove(index, activity)}>Remove</button>
            </span>
        </div>
    )
}

export default Bucketlist