import { NgModule } from '@angular/core';
import { DaySetComponent } from './day-set/day-set';
import { TimeBlockComponent } from './time-block/time-block';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [DaySetComponent,
    TimeBlockComponent],
	imports: [
		IonicPageModule.forChild(DaySetComponent), 
		IonicPageModule.forChild(TimeBlockComponent)
	],
	exports: [DaySetComponent,
    TimeBlockComponent]
})
export class ComponentsModule {}
