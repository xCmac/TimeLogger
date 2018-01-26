import { Activity } from "./activity";

export interface Log {
    id?: string;
    userId: string;
    date: string | Date;
    activity?: Activity;
    activityId?: string;
    blockNumber: number;
}