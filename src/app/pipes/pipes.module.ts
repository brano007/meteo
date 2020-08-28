import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudConditionPipe } from './cloud-condition/cloud-condition.pipe';
import { DateTimePipe } from './date-time/date-time.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CloudConditionPipe,
    DateTimePipe
  ],
  providers: [],
  exports: [
    CloudConditionPipe,
    DateTimePipe
  ],
})
export class FePipesModule {}