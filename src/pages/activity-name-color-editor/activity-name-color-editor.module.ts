import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityNameColorEditorPage } from './activity-name-color-editor';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ActivityNameColorEditorPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityNameColorEditorPage),
    ComponentsModule
  ],
})
export class ActivityNameColorEditorPageModule {}
