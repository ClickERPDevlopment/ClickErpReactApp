import { useQuery } from "@tanstack/react-query";
import { ReactQueryKey } from "@/utility/react-query-key";
import useAxiosInstance from "@/lib/axios-instance";
import { AxiosInstance } from "axios";

export interface PrintEmbDeliveryMasterType {
    ID: number;
    DELIVERY_DATE?: string;
    DELIVERY_SERIAL: number;
    DELIVERY_CHALLAN_NO?: string;
    SUPPLIER_ID: number;
    SUPPLIER?: string;
    WORKORDER_RECEIVE_ID: number;
    WORKORDER_RECEIVE_NO: string;
    CREATED_BY?: string;
    CREATED_DATE?: string;
    UPDATED_BY?: string;
    UPDATED_DATE?: string;
    REMARKS?: string;
    EMBELLISHMENT_TYPE?: string;
    RECEIVE_TYPE?: string;
    EMBELLISHMENT_CATEGORY?: string;
    EMBELLISHMENT_WO?: string;
    COMPANY_ID?: number;
    PrintEmbDeliveryDetails: PrintEmbDeliveryDetailsType[];
}

export interface PrintEmbDeliveryDetailsType {
    ID: number;
    MASTER_ID: number;
    BUYER_ID?: number;
    BUYER?: string;
    OS_BUYER_ID?: number;
    OS_BUYER?: string;
    STYLE_ID?: number;
    STYLE?: string;
    OS_STYLE_ID?: number;
    OS_STYLE?: string;
    PO_ID: number;
    PO_NO?: string;
    OS_PO_ID: number;
    OS_PO_NO?: string;
    COLOR_ID?: number;
    COLOR?: string;
    SIZE_ID?: number;
    SIZE?: string;
    WO_QTY?: number;
    RCV_QTY?: number;
    PRODUCTION_QTY?: number;
    DELIVERY_QTY?: number;
    DELIVERED_QTY?: number;
    PATRS?: string;
}

export function GetPrintEmbDelivery<T>(CompanyId: number) {
    const axios = useAxiosInstance();

    const toDate = new Date();
    const fromDate = new Date();

    fromDate.setDate(toDate.getDate() - 7);

    const getData = async (): Promise<T[]> =>
        (await axios.get(`/production/${CompanyId}/PrintEmbDelivery?fromDate=` + fromDate.toLocaleDateString("en-CA") + "&toDate=" + toDate.toLocaleDateString("en-CA"))).data;

    const query = useQuery({
        queryKey: ["PrintEmbDelivery"],
        queryFn: getData,
        staleTime: 0,
    });
    return query;
}


export function GetPrintEmbDeliveryById<T>(id: number, CompanyId: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get(`/production/${CompanyId}/PrintEmbDelivery/` + id)).data;

    const query = useQuery({
        queryKey: [ReactQueryKey.PrintEmbProduction, id],
        queryFn: getData,
    });

    return query;
}

export function NextDeliveryNumber<T>(CompanyId: number) {
    const axios = useAxiosInstance();

    const getData = async (): Promise<T> =>
        (await axios.get(`/production/${CompanyId}/PrintEmbDelivery/NextDeliveryNumber`)).data;

    const query = useQuery({
        queryKey: ["DeliveryNo"],
        queryFn: getData,
        staleTime: 0,
    });

    return query;
}

export async function Save(data: any, axios: AxiosInstance) {

    const response = await axios.post(`/production/${data.COMPANY_ID}/PrintEmbDelivery`, data);

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Update(data: any, axios: AxiosInstance) {
    const response = await axios.put(
        `/production/${data.COMPANY_ID}/PrintEmbDelivery/` + data.ID,
        data
    );

    if (!response) {
        throw new Error("This data already exist.");
    }

    return response.data;
}

export async function Delete(id: number, CompanyId: number, axios: AxiosInstance) {
    if (Number(id) <= 0) {
        throw new Error("Print Embroidery Delivery ID is not valid.");
    }

    await axios.delete(`production/${CompanyId}/PrintEmbDelivery/` + id);
}
