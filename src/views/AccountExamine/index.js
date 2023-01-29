import React from "react";
import { Route, Switch } from "react-router-dom";
import AccountExamine from "./sub-route/List";
import Detail from "./sub-route/detail";
const Examine = (props) => {
    return (
        <div>
            <Switch>
                    <Route
                        path='/examine/account/detail'
                        key='detail'
                        component={(props) => <Detail {...props} />}
                    />
                    <Route
                        path='/examine/account'
                        key='list'
                        component={(props) => <AccountExamine {...props} />}
                    />
                </Switch>
        </div>
    )
};

export default Examine;