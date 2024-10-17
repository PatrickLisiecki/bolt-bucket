export const fetchInteriors = async () => {
    try {
        const response = await fetch("/api/interiors");
        const interiors = await response.json();
        return interiors;
    } catch (error) {
        console.error("Error fetching interiors:", error);
    }
};

export const fetchInteriorById = async (id) => {
    try {
        const response = await fetch(`/api/interiors/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch interior");
        }
        const interior = await response.json();
        return interior;
    } catch (error) {
        console.error("Error fetching interior:", error);
        throw error;
    }
};
