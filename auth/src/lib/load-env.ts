type EnvironmentValues = {
    [key: string]: string;
};

export default function loadEnv(envs: string[]): EnvironmentValues {
    let values: EnvironmentValues = {};
    envs.forEach((envName) => {
        if (!process.env[envName]) throw new Error(`ENV NOT FOUND ${envName}`);
        values[envName] = process.env[envName]!;
    });
    return values;
}
