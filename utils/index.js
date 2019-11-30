import config from '../config';

export function getConfig(ctx) {
    console.log('how to get environment here?', Object.keys(ctx));
    return config.production;
}

export function loginFromCookie(ctx) {
    console.log('get token from cookies and try to login on back-end', Object.keys(ctx));
    return false;
}

export function pushToGoogleAnalytics(url) {
    console.log('pushing to google analytics', url);
    return true;
}
