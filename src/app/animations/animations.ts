import {
  animation,
  animate,
  style,
  keyframes
} from '@angular/animations';

export const fadeInAnimation = animation([
  style({ opacity: '0' }),
  animate('{{duration}} ease-out')
], {
  params: {
    duration: '0.5s'
  }
});

export const fadeOutAnimation = animation([
  animate('{{duration}} ease-in', style({ opacity: '0' }))
], {
  params: {
    duration: '0.5s'
  }
});

export const deleteAnimation = animation([
  animate('{{duration}} ease-in', keyframes([
    style({ offset: 0.3, backgroundColor: 'rgba(240, 20, 20, 0.1)' }),
    style({ offset: 1, transform: 'translateX(-100%)', opacity: 0 })
  ]))
], {
  params: {
    duration: '0.5s'
  }
});
