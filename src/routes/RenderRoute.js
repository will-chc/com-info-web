import React from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
const RenderRoute = (props) => {
    const { routes, redirect } = props;
    return (
        <Switch>
            {redirect && (
                <Route
                    path={redirect.to}
                    component={() => {
                        return <Redirect to={redirect.jump} />
                    }}
                />
            )}
            {routes &&
                routes.map(route => {
                    console.log('route11', route);
                    if (route) {
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