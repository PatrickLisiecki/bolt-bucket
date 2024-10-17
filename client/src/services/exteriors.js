export const fetchExteriors = async () => {
    try {
        const response = await fetch("/api/exteriors");
        const exteriors = await response.json();
        return exteriors;
    } catch (error) {
        console.error("Error fetching exteriors:", error);
    }
};

export const fetchExteriorById = async (id) => {
    try {
        const response = await fetch(`/api/exteriors/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch exterior");
        }
        const exterior = await response.json();
        return exterior;
    } catch (error) {
        console.error("Error fetching exterior:", error);
        throw error;
    }
};
