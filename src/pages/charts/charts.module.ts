import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartsPage } from './charts';
import { IonicPage } from 'ionic-angular';
@IonicPage()

@NgModule({
  declarations: [
    ChartsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartsPage),
  ],
})
export class ChartsPageModule {}
