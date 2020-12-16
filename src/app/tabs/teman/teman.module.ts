import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemanPageRoutingModule } from './teman-routing.module';

import { TemanPage } from './teman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemanPageRoutingModule
  ],
  declarations: [TemanPage]
})
export class TemanPageModule {}
