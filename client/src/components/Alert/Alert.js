import React from 'react'
import './Alert.css'

class AlertController extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
    }

    clickOutside(e) {
        if(e.target.className === "AlertBackground") {
            console.log("RE")
            this.props.hideAlert()
        }
    }

    render() {
        return (
            <Alert {...this.props} show={this.props.show} clickOutside={this.clickOutside.bind(this)} />
        )
    }
}

const Alert = ({title, text, buttons = [<button className="btn green">RE</button>], show, clickOutside}) => {
    const showClass = show ? {} : {display: "none"}

    return (
        <div className="AlertBackground" onClick={(e) => clickOutside(e)} style={showClass}>
            <div className="AlertBox">
                <h1>{title}</h1>
                <div id="text">
                    {text}
                </div>
                <div id="buttons">
                    {buttons.map(button => <span>{button}</span>)}
                </div>
            </div>
        </div>
    )
}

export default AlertController