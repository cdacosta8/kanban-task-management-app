import { animate, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate('300ms ease-in', style({ transform: 'translateX(0%)' })),
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ transform: 'translateX(-100%)' })),
  ]),
]);
