export const fetchWheels = async () => {
    try {
        const response = await fetch("/api/wheels");
        const wheels = await response.json();
        return wheels;
    } catch (error) {
        console.error("Error fetching wheels:", error);
    }
};

export const fetchWheelsById = async (id) => {
    try {
        const response = await fetch(`/api/wheels/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch wheels");
        }
        const wheels = await response.json();
        return wheels;
    } catch (error) {
        console.error("Error fetching wheels:", error);
        throw error;
    }
};
