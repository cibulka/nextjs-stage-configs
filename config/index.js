export default {
    development: {
        API_URL: 'https://randomfox.ca/floof/',
        ENV_NAME: 'development',
        ANIMAL: 'fox',
        IS_LOGIN_REQUIRED: false,
        USE_GOOGLE_ANALYTICS: false,
    },
    staging: {
        API_URL: 'https://aws.random.cat/meow',
        ENV_NAME: 'staging',
        ANIMAL: 'cat',
        IS_LOGIN_REQUIRED: true,
        USE_GOOGLE_ANALYTICS: false,
    },
    production: {
        API_URL: 'https://random.dog/woof.json',
        ENV_NAME: 'production',
        ANIMAL: 'dog',
        IS_LOGIN_REQUIRED: false,
        USE_GOOGLE_ANALYTICS: true,
    }
};
