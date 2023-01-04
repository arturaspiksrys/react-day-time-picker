import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import generateTimeSlots from './generate-time-slots';

import { List, ListItem } from './List';

function Root({
  pickedDay,
  slotSizeMinutes,
  validator,
  pickTime,
  minSlotHour,
  maxSlotHour
}) {
  const timeSlots = generateTimeSlots(
    pickedDay,
    slotSizeMinutes,
    minSlotHour,
    maxSlotHour
  );

  return (
    <List>
      {timeSlots.map(slot => {
        const isValid = validator ? validator(slot) : true;
        return (
          <ListItem
            key={slot}
            isValid={isValid}
            onClick={() => isValid && pickTime(slot)}
          >
            {format(slot, 'HH:mm')}
          </ListItem>
        );
      })}
    </List>
  );
}

Root.propTypes = {
  pickedDay: PropTypes.instanceOf(Date),
  slotSizeMinutes: PropTypes.number.isRequired,
  minSlotHour: PropTypes.number.isRequired,
  maxSlotHour: PropTypes.number.isRequired,
  validator: PropTypes.func,
  pickTime: PropTypes.func.isRequired
};

export default Root;
