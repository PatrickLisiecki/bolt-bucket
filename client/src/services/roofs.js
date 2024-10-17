export const fetchRoofs = async () => {
    try {
        const response = await fetch("/api/roofs");
        const roofs = await response.json();
        return roofs;
    } catch (error) {
        console.error("Error fetching roofs:", error);
    }
};

export const fetchRoofById = async (id) => {
    try {
        const response = await fetch(`/api/roofs/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch roof");
        }
        const roof = await response.json();
        return roof;
    } catch (error) {
        console.error("Error fetching roof:", error);
        throw error;
    }
};
