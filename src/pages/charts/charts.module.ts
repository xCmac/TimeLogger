import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartsPage } from './charts';
import { IonicPage } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';

@IonicPage()

@NgModule({
  declarations: [
    ChartsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartsPage),
    ChartsModule
  ],
})
export class ChartsPageModule {}
