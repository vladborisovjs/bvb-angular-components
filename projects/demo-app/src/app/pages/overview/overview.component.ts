import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItems } from '../../../shared/nav-items';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bvb-overview',
  imports: [RouterModule,],
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent {
  navItems = NavItems;
}
