export const getEnvironments = () => {
    return JSON.parse(JSON.stringify(import.meta.env))
}