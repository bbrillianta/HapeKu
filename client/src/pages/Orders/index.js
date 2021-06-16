import React from 'react'
import {
    BrowserRouter as Router, 
    Link, 
    Route, 
    Switch , 
    useParams, 
    useRouteMatch
} from "react-router-dom";
import PaidItems from "./components/Paid";
import UnpaidItems from "./components/Unpaid";

const Orders = () => {

    let {path , url} = useRouteMatch();

    return (
        <div>
            <Router>
                <div style={styles.navOrders}>
                    <Link to={`${url}/unpaid`} style={{textDecoration: 'none' , color: '#000'}}>
                        <h2>Unpaid Transaction</h2>
                    </Link>
                    <Link to={`${url}/paid`} style={{textDecoration: 'none' , color: '#000'}}>
                        <h2>Paid Transaction</h2>
                    </Link>
                </div>
                <div className="content" style={styles.content}>
                    <Switch>
                        <Route exact path={path}>
                            <h3>Please Choose Navigation.</h3>
                        </Route>
                        <Route path={`${path}/:choose`}>
                            <Content />
                        </Route>
                    </Switch>       
                </div>
            </Router>
        </div>
    )
}

const Content = () => {
    let { choose } = useParams();
    return (
        <div>
            {
                choose == "paid" ? (
                    <PaidItems />
                ) : choose == "unpaid" ? (
                    <UnpaidItems />
                ) : (
                    <span>Choose</span>
                )
            }
        </div>
    )
}

const styles = {
    navOrders: {
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '30px 0px'
    },
    linkBorder: {
        borderBottom: '2px solid palevioletred',
        padding: '10px',
        boxSizing: 'border-box'
    },
    content: {
        padding: '10px',
        boxSizing: 'border-box'
    }
}

export default Orders
