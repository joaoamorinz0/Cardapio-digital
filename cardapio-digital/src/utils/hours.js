const toMinutes = (time) => {
  if (!time) return 0;
  const [hours, minutes = '0'] = String(time).split(':');
  return Number(hours) * 60 + Number(minutes);
};

const formatTime = (value) => {
  if (!value) return '00:00';
  const [hours, minutes = '00'] = String(value).split(':');
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const normalizeHours = (hours, date = new Date()) => {
  if (!Array.isArray(hours)) {
    if (hours && typeof hours === 'object' && hours.open && hours.close) {
      return [{ day: date.getDay(), open: hours.open, close: hours.close, closed: false }];
    }
    return [];
  }

  return hours;
};

export function getOpenStatus(hours, date = new Date()) {
  const normalized = normalizeHours(hours, date);
  const day = date.getDay();
  const now = date.getHours() * 60 + date.getMinutes();

  const currentSchedule = normalized.find((entry) => entry.day === day && !entry.closed && entry.open && entry.close);

  if (currentSchedule) {
    const openMinutes = toMinutes(currentSchedule.open);
    const closeMinutes = toMinutes(currentSchedule.close);
    const isOvernight = closeMinutes <= openMinutes;
    const isOpen = isOvernight ? now >= openMinutes || now < closeMinutes : now >= openMinutes && now < closeMinutes;

    if (isOpen) {
      return {
        isOpen: true,
        scheduleText: `${formatTime(currentSchedule.open)} às ${formatTime(currentSchedule.close)}`,
        nextOpenText: '',
      };
    }
  }

  const nextSchedule = normalized
    .filter((entry) => !entry.closed && entry.open && entry.close)
    .find((entry) => {
      const entryDay = entry.day;
      const difference = (entryDay - day + 7) % 7;
      return difference > 0 || (difference === 0 && now < toMinutes(entry.open));
    });

  const nextTime = nextSchedule ? formatTime(nextSchedule.open) : '';

  return {
    isOpen: false,
    scheduleText: 'Fechado',
    nextOpenText: nextTime ? `abre às ${nextTime}` : '',
  };
}

export function isStoreOpen(hours, date = new Date()) {
  return getOpenStatus(hours, date).isOpen;
}
