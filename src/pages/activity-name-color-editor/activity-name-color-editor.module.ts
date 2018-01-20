import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityNameColorEditorPage } from './activity-name-color-editor';

@NgModule({
  declarations: [
    ActivityNameColorEditorPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityNameColorEditorPage),
  ],
})
export class ActivityNameColorEditorPageModule {}
