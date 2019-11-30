import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Router from 'next/router'

import Head from '../components/head'
import Nav from '../components/nav'

import { getConfig, loginFromCookie, pushToGoogleAnalytics } from '../utils';

const Home = (props) => {
    const { ANIMAL, ENV_NAME, USE_GOOGLE_ANALYTICS } = props.config;

    useEffect(() => {
        Router.events.on('routeChangeComplete', (url) => {
            if (USE_GOOGLE_ANALYTICS) pushToGoogleAnalytics(url);
        });
    }, []);

    return (
          <div>
            <Head title="Home" />
            <Nav />

            <div className="d--t w-max center">
                {props.err ? (
                    <>
                        {console.log(props.err)}
                        <div>Something went wrong (see console).</div>
                    </>
                ) : (
                    <>
                        <p className="m--1-b">{`I am ${ENV_NAME}, so I should display ${ANIMAL}.`}</p>
                        <p className="m--1-b">Or content from appropriate stage of my back-end.</p>

                        <img className="w-max center" src={props.image} />
                    </>
                )}
            </div>

            <style jsx>{`
              .d--t { display: table; }
              .center { margin-left: auto; margin-right: auto; }
              .w-max { max-width: 20em; }
              .ta--center { text-align: center; }
              .m--1-r { margin-right: 1em; }
              .m--1-b { margin-bottom: 1em; }
            `}</style>
          </div>
    );
}

Home.propTypes = {
    err: PropTypes.shape(),
    config: PropTypes.shape({
        API_URL: PropTypes.string.isRequired,
        ENV_NAME: PropTypes.string.isRequired,
        IS_LOGIN_REQUIRED: PropTypes.bool.isRequired,
        USE_GOOGLE_ANALYTICS: PropTypes.bool.isRequired,
    }).isRequired,
    image: PropTypes.string,
}

Home.getInitialProps = async (ctx) => {
    const props = {};

    props.config = getConfig(ctx);

    if (props.config.IS_LOGIN_REQUIRED) {
        const isLoggedIn = await loginFromCookie(ctx);
        if (!isLoggedIn && ctx.res) {
            ctx.res.writeHead(302, { Location: '/login' }).end();
        }
        if (!isLoggedIn && !ctx.res) {
            Router.push('/login');
        }
    }

    await fetch(props.config.API_URL)
        .then(res => res.json())
        .then(json => {
            props.image = json.file || json.url || json.image;
        })
        .catch(err => {
            props.err = err;
        })
    ;

    return props;
}

export default Home
