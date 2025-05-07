import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TooltipDirective } from 'bvb-lib';

@Component({
  selector: 'bvb-tooltip-example',
  imports: [TooltipDirective],
  standalone: true,
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {}
