export { }; //to resolve "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations" for declare global

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            BACK_HOST: string;
            BACK_PORT: string;
            RPI_HOST: string;
            RPI_PORT: string;
        }
    }
}
