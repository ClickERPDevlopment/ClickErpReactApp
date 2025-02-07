import axios from "axios";


interface Result<T> {
    success: boolean;
    data?: T;
    error?: string;
}

const BASE_URL = "http://localhost:25635/api";


const getAllCompany = async <T>(): Promise<Result<T[]>> => {
    try {
        const response = await axios.get("/production/SwtGauge");
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
};

export default getAllCompany;
