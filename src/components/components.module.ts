import { NgModule } from '@angular/core';
import { DaySetComponent } from './day-set/day-set';
import { TimeBlockComponent } from './time-block/time-block';
import { IonicPageModule } from 'ionic-angular';
import { ColorPickerComponent } from './color-picker/color-picker';

@NgModule({
	declarations: [DaySetComponent,
    TimeBlockComponent,
    ColorPickerComponent],
	imports: [
		IonicPageModule.forChild(DaySetComponent), 
		IonicPageModule.forChild(TimeBlockComponent)
	],
	exports: [DaySetComponent,
    TimeBlockComponent,
    ColorPickerComponent]
})
export class ComponentsModule {}
