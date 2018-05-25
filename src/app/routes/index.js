import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from "../components/home/home";
import { Info } from "../components/info/info";
const CONSTANTS = require("../meta/constants.json");

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path={CONSTANTS.router.path.app.info} component={Home} />
            <Route path={CONSTANTS.router.path.auth.signIn} component={Home} />
            <Route path={CONSTANTS.router.path.auth.signUp} component={Home} />
            <Route path={CONSTANTS.router.path.auth.reset} component={Home} />
            <Route path={CONSTANTS.router.path.member.following} component={Home} />
            <Route path={CONSTANTS.router.path.posts.list} component={Home} />
            <Route path={CONSTANTS.router.path.content.photo + '/:postSlug'} component={Home} />
            <Route path={CONSTANTS.router.path.member.profile.general} component={Home} />
            <Route path={CONSTANTS.router.path.member.profile.password} component={Home} />
            <Route path={CONSTANTS.router.path.member.profile.slug} component={Home} />
            <Route path={CONSTANTS.router.path.member.profile.email} component={Home} />
        </Switch>
    </BrowserRouter>
);