export const fetchCars = async () => {
    try {
        const response = await fetch("/api/cars");
        const cars = await response.json();
        return cars;
    } catch (error) {
        console.error("Error fetching cars:", error);
    }
};

export const fetchCarById = async (id) => {
    try {
        const response = await fetch(`/api/cars/${id}`);
        const car = await response.json();
        return car;
    } catch (error) {
        console.error(`Error fetching car with id ${id}:`, error);
    }
};

export const createCar = async (carData) => {
    try {
        const response = await fetch("/api/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carData),
        });
        const newCar = await response.json();
        return newCar;
    } catch (error) {
        console.error("Error creating car:", error);
    }
};

export const updateCar = async (id, carData) => {
    try {
        const response = await fetch(`/api/cars/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carData),
        });
        const updatedCar = await response.json();
        return updatedCar;
    } catch (error) {
        console.error(`Error updating car with id ${id}:`, error);
    }
};

export const deleteCar = async (id) => {
    try {
        await fetch(`/api/cars/${id}`, {
            method: "DELETE",
        });
        console.log(`Car with id ${id} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting car with id ${id}:`, error);
    }
};
