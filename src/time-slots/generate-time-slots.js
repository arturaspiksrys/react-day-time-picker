import {
  isToday,
  getHours,
  addHours,
  addMinutes,
  addDays,
  setHours
} from 'date-fns';

function generateTimeSlots(
  selectedDate,
  slotSizeMinutes,
  minSlotHour,
  maxSlotHour
) {
  const isTodayVar = isToday(selectedDate);

  let start = setHours(selectedDate, minSlotHour);
  if (isTodayVar) {
    const now = new Date();
    const offsetHours = getHours(now);
    // "Pad" the start time with the amount of hours of the current time, to
    // prevent rendering time slots of the past
    start = addHours(start, offsetHours);

    // The start positions might still be in the past in terms of minutes
    // So "pad" the start time with the slot size, to prevent rendering time
    // slots of the past
    while (start <= now) {
      start = addMinutes(start, slotSizeMinutes);
    }
  }

  const end = setHours(addDays(selectedDate, 1), maxSlotHour + 1);

  let slot = start;
  let timeSlots = [];
  while (slot < end) {
    timeSlots.push(slot);
    slot = addMinutes(slot, slotSizeMinutes);
  }

  return timeSlots;
}

export default generateTimeSlots;
