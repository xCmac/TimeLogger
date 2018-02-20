import { Activity } from "./activity";

export interface Log {
    id?: string;
    userId: string;
    date: Date;
    activity: Activity;
    blockNumber: number;
}