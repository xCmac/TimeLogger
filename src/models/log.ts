import { Activity } from "./activity";
import { Observable } from 'rxjs/Observable';

export interface Log {
    id?: string;
    userId: string;
    date: string | Date;
    activity?: Observable<Activity>;
    activityId?: string;
    blockNumber: number;
}