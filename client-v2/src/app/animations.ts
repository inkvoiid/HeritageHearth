import {
  animate,
  group,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const itemAnimation = trigger('itemAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('300ms', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate('300ms', style({ opacity: 0, transform: 'translateY(20px)' })),
  ]),
]);

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('60ms', animate('600ms ease-out', style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
    // query(':leave', [animate('600ms ease-in', style({ opacity: 0 }))], {
    //   optional: true,
    // }),
  ]),
]);

export const fader = trigger('fader', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('60ms', animate('600ms ease-out', style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
    //   query(':leave', [animate('600ms ease-in', style({ opacity: 0 }))], {
    //     optional: true,
    //   }),
  ]),
]);
