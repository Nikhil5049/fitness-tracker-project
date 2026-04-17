export const fmtDate = (str) => {
  if (!str) return '—';
  return new Date(str).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const typeIcon = {
  RUNNING: '🏃',
  WALKING: '🚶',
  CYCLING: '🚴',
  SWIMMING: '🏊',
  WEIGHT_TRAINING: '🏋️',
  YOGA: '🧘',
  HIIT: '⚡',
  CARDIO: '❤️',
  STRETCHING: '🤸',
  OTHER: '💪',
};

export const ACTIVITY_TYPES = Object.keys(typeIcon);

export const getDayGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};
