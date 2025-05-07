import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[bvbTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  /** Текст */
  @Input('bvbTooltip') tooltipText = '';
  /** Задержка в мс */
  @Input() tooltipDelay = 300;
  /** Отступ от курсора в px */
  @Input() tooltipOffset = 10;

  private tooltipEl: HTMLElement | null = null;
  private showTimeout: any;

  constructor(private el: ElementRef, private render: Renderer2) {}
  /** Обрабатывает наведение мыши: запускает таймер для отображения tooltip.*/
  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    this.showTimeout = setTimeout(() => {
      this.createTooltip(event);
    }, this.tooltipDelay);
  }
  /** Обновляет позицию tooltip при движении мыши. */
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.updatePosition(event);
  }
  /** Удаляет tooltip при уходе курсора и очищает таймер. */
  @HostListener('mouseleave') onMouseLeave() {
    this.destroyTooltip();
    clearTimeout(this.showTimeout);
  }
  /**
   * Создаёт DOM-элемент tooltip и добавляет его в `document.body`.
   * Устанавливает начальные стили и позицию.
   */
  private createTooltip(event: MouseEvent) {
    if (this.tooltipEl || !this.tooltipText) return;

    const el = this.render.createElement('div');
    el.textContent = this.tooltipText;
    this.render.appendChild(document.body, el);
    this.tooltipEl = el;

    this.render.appendChild(document.body, this.tooltipEl);
    this.setStyles();
    this.updatePosition(event);

    requestAnimationFrame(() => {
      if (this.tooltipEl) {
        this.render.setStyle(this.tooltipEl, 'opacity', '1');
      }
    });
  }

  private setStyles() {
    if (!this.tooltipEl) return;

    const styles: Record<string, string> = {
      position: 'fixed',
      background: '#000',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      pointerEvents: 'none',
      zIndex: '1000',
      transition: 'opacity 0.2s',
      opacity: '0',
      maxWidth: '250px',
      wordWrap: 'break-word',
    };

    for (const [key, value] of Object.entries(styles)) {
      this.render.setStyle(this.tooltipEl, key, value);
    }
  }

  /** Обновляет позицию tooltip относительно курсора мыши. */
  private updatePosition(event: MouseEvent) {
    if (!this.tooltipEl) return;
    const x = event.clientX + this.tooltipOffset;
    const y = event.clientY + this.tooltipOffset;

    this.render.setStyle(this.tooltipEl, 'left', `${x}px`);
    this.render.setStyle(this.tooltipEl, 'top', `${y}px`);
  }
  /** Удаляет tooltip из DOM и сбрасывает переменные. */
  private destroyTooltip() {
    if (this.tooltipEl) {
      this.render.removeChild(document.body, this.tooltipEl);
      this.tooltipEl = null;
    }
  }
  ngOnDestroy(): void {
    this.destroyTooltip();
    clearTimeout(this.showTimeout);
  }
}
