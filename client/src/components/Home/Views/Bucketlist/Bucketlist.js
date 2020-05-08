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
        // XOR:
        // 0 ^ 1 = 1
        // 1 ^ 1 = 0
        //Basically invert the state
        this.props.actions.markAsDone(index, activity.bid, activity.aid, activity.done ^ 1)
    }

    render() {
        return (
            <>
                <BucketlistView
                    bucketlist={this.props.bucketlist}
                    bucketlists={this.props.bucketlists}
                    onRemove={this.removeFromList.bind(this)}
                    onMarkAsDone={this.onMarkAsDone.bind(this)}
                />
            </>
        )
    }
}

Bucketlist.propTypes = {
    bucketlist: PropTypes.number.isRequired
}

const BucketlistView = ({bucketlist, bucketlists = [], onRemove, onMarkAsDone}) => {
    if (bucketlist !== -100) {
        return (
            <div className="Bucketlist">
                {bucketlists[bucketlist].activities.map((x,i) => <div key={i}><BucketlistItem index={i} activity={x} onRemove={onRemove} onMarkAsDone={onMarkAsDone}/></div>)}
            </div>
        )
    } else return <div className="Bucketlist"></div>
}

BucketlistView.propTypes = {
    bucketlist: PropTypes.number,
    bucketlists: PropTypes.array,
    onRemove: PropTypes.func.isRequired
}

const BucketlistItem = ({index, activity, onRemove, onMarkAsDone}) => {
    return (
        <div className="BucketlistItem">
            <div className="BucketlistItemTitle">
                {activity.done === 0 ? activity.activity : <s>{activity.activity}</s>}
            </div>
            <div className="BucketlistItemButtons">
                <span>
                <button className="btn green" onClick={() => onMarkAsDone(index, activity)}>{activity.done === 0 ? "Mark as done" : "Undo"}</button>
                </span>
                <span>
                <button id="remove" className="btn red" onClick={() => onRemove(index, activity)}>Remove</button>

                </span>
            </div>
        </div>
    )
}

export default Bucketlist