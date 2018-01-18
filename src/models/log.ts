import { Activity } from "./activity";

export interface Log {
    $key: string;
    activity: Activity;
    blockNumber: number;
}