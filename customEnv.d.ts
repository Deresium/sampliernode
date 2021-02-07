declare namespace NodeJS{
    interface ProcessEnv {
        PORT: string;
        URL_WEBSITE: string;
        DNS_NAME: string;
        PG_USER: string;
        PG_PASSWORD: string;
        PG_URL: string;
        JWT_SECRET: string;
        JWT_SECRET_2: string;
        SENDGRID_API_KEY: string;
        AWS_KEY_ID: string;
        AWS_KEY_SECRET: string;
        AWS_BUCKET_NAME: string;
    }
}