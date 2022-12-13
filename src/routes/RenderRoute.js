import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
const RenderRoute = (props) => {
    const { routes } = props;
    return (
        <Switch>
            {
                routes && routes.map(route => {
                    if (route.redirect) {
                        return (
                            <Route
                                path={route.path}
                                key={route.key}
                                children={(props) => {
                                    return (<>
                                        <Redirect to={route.redirect.jump} />
                                        <route.component route={route} {...props} />
                                    </>)
                                }}>
                            </Route>
                        )
                    } else {
                        return (
                            <Route
                                path={route.path}
                                key={route.key}
                                children={(props) => {
                                    return <route.component route={route} {...props} />
                                }}
                            />
                        )
                    }
                })

            }
        </Switch>
    )
}
export default RenderRoute;
