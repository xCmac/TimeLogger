import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityEditorPage } from './activity-editor';

@NgModule({
  declarations: [
    ActivityEditorPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityEditorPage),
  ],
})
export class ActivityEditorPageModule {}
