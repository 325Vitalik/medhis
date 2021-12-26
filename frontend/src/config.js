const developmentConfig = {
    API_URL: 'http://localhost:8000'
};

const productionConfig = {};

const isDevelopment = process.env.NODE_ENV !== "production";

const config = isDevelopment ? developmentConfig : productionConfig;

export default config;
