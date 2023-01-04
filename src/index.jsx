import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { ThemeProvider } from 'styled-components';

import {
  PopupWrapper,
  Popup,
  PopupHeader,
  PopupHeaderLine,
  PopupClose,
  DateTimeLabel
} from './Popup';
import { DayIcon, ClockIcon, FailedIcon } from './Icons';
import { Failed } from './Feedback';

import Calendar from './calendar';
import TimeSlots from './time-slots';

import { preventPastDays } from './validators';

function DayTimePicker({
  timeSlotValidator,
  timeSlotSizeMinutes,
  isLoading,
  isDone,
  err,
  onConfirm,
  goBackText,
  locale,
  minSlotHour,
  maxSlotHour,
  theme
}) {
  const [pickedDay, setPickedDay] = useState(null);
  const [pickedTime, setPickedTime] = useState(null);
  const [showPickTime, setShowPickTime] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePickDay = day => {
    setPickedDay(day);
    setShowPickTime(true);
  };

  const handlePickTime = time => {
    setPickedTime(time);
    setShowPickTime(false);
    setShowConfirm(true);
    onConfirm(time);
  };

  const handleClosePickTime = () => {
    setShowPickTime(false);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setShowPickTime(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PopupWrapper>
        <Calendar
          validator={preventPastDays}
          locale={locale}
          pickDay={handlePickDay}
        />

        {showPickTime && (
          <Popup>
            <PopupHeader>
              <PopupHeaderLine>
                <DayIcon />
                <DateTimeLabel>
                  {format(pickedDay, 'MMMM dd, yyyy')}
                </DateTimeLabel>
              </PopupHeaderLine>
              <PopupHeaderLine>
                <PopupClose onClick={handleClosePickTime}>
                  {goBackText}
                </PopupClose>
              </PopupHeaderLine>
            </PopupHeader>

            <TimeSlots
              pickedDay={pickedDay}
              slotSizeMinutes={timeSlotSizeMinutes}
              validator={timeSlotValidator}
              pickTime={handlePickTime}
              minSlotHour={minSlotHour}
              maxSlotHour={maxSlotHour}
            />
          </Popup>
        )}

        {showConfirm && (
          <Popup>
            <PopupHeader>
              <PopupHeaderLine>
                <DayIcon />
                <DateTimeLabel>
                  {format(pickedTime, 'MMMM dd, yyyy')}
                </DateTimeLabel>
              </PopupHeaderLine>
              <PopupHeaderLine>
                <ClockIcon />
                <DateTimeLabel>{format(pickedTime, 'HH:mm')}</DateTimeLabel>
              </PopupHeaderLine>

              {!isDone && (
                <PopupHeaderLine>
                  <PopupClose disabled={isLoading} onClick={handleCloseConfirm}>
                    {goBackText}
                  </PopupClose>
                </PopupHeaderLine>
              )}
            </PopupHeader>

            {err && (
              <Failed>
                <p>
                  <FailedIcon /> {err}
                </p>
              </Failed>
            )}
          </Popup>
        )}
      </PopupWrapper>
    </ThemeProvider>
  );
}

DayTimePicker.propTypes = {
  timeSlotValidator: PropTypes.func,
  timeSlotSizeMinutes: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  err: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  goBackText: PropTypes.string,
  locale: PropTypes.string,
  minSlotHour: PropTypes.number,
  maxSlotHour: PropTypes.number,
  theme: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    background: PropTypes.string,
    buttons: PropTypes.shape({
      disabled: PropTypes.shape({
        color: PropTypes.string,
        background: PropTypes.string
      }),
      confirm: PropTypes.shape({
        color: PropTypes.string,
        background: PropTypes.string,
        hover: PropTypes.shape({
          color: PropTypes.string,
          background: PropTypes.string
        })
      })
    })
  })
};

DayTimePicker.defaultProps = {
  goBackText: 'Go Back',
  locale: 'en',
  minSlotHour: 8,
  maxSlotHour: 20,
  theme: {
    primary: '#3a9ad9',
    secondary: '#f0f0f0',
    background: '#fff',
    buttons: {
      disabled: {
        color: '#333',
        background: '#dfdfdf'
      },
      confirm: {
        color: '#fff',
        background: '#3a9ad9',
        hover: {
          color: '',
          background: '#3a9ad9d6'
        }
      }
    },
    feedback: {
      success: {
        color: '#29aba4'
      },
      failed: {
        color: '#eb7260'
      }
    }
  }
};

export default DayTimePicker;
