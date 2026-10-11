const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export function isStoreOpen(hours, date = new Date()) {
  if (!Array.isArray(hours) || hours.length === 0) return false;

  const day = date.getDay();
  const now = date.getHours() * 60 + date.getMinutes();
  const today = hours.find((hour) => hour.day === day);

  if (today && !today.closed && today.open && today.close) {
    const opensAt = toMinutes(today.open);
    const closesAt = toMinutes(today.close);

    if (closesAt > opensAt && now >= opensAt && now < closesAt) return true;
    if (closesAt <= opensAt && now >= opensAt) return true;
  }

  const previousDay = (day + 6) % 7;
  const yesterday = hours.find((hour) => hour.day === previousDay);

  return Boolean(
    yesterday
      && !yesterday.closed
      && yesterday.open
      && yesterday.close
      && toMinutes(yesterday.close) <= toMinutes(yesterday.open)
      && now < toMinutes(yesterday.close),
  );
}
