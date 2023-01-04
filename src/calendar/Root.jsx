import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { en, lt } from 'date-fns/locale';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  subMonths,
  addMonths,
  isSameMonth,
  isToday,
  setDefaultOptions
} from 'date-fns';

import { PrevIcon, NextIcon } from '../Icons';

import { Grid, Wrapper, MonthYear, DaysOfWeek, DaysOfMonth } from './Layout';
import { WeekDays, WeekDay } from './WeekDays';
import { MonthDays, MonthDay } from './MonthDays';

import {
  MonthPicker,
  PrevMonth,
  NextMonth,
  CurrentMonth,
  FakeCurrentMonth
} from './MonthPicker';

import { Calendar, FakeCalendar } from './Calendar';

import generateDays from './generate-days';

function Root({ validator, pickDay, locale }) {
  const [month, setMonth] = useState(new Date());
  const [fakeMonth, setFakeMonth] = useState(month);
  const [animation, setAnimation] = useState('');

  const [startDay, days] = generateDays(month);
  const [fakeStartDay, fakeDays] = generateDays(fakeMonth);

  const isAnimating = !!animation;

  switch (locale) {
    case 'lt':
      setDefaultOptions({ locale: lt });
      break;
    default:
      setDefaultOptions({ locale: en });
  }

  let WEEK_DAYS = [];
  eachDayOfInterval({
    start: startOfWeek(new Date()),
    end: endOfWeek(new Date())
  }).forEach(day => {
    WEEK_DAYS.push(format(day, 'E'));
  });

  // Handlers
  const handleNextMonth = () => {
    if (isAnimating) {
      return;
    }

    const next = addMonths(month, 1);
    setMonth(next);
    setAnimation('next');
  };

  const handlePrevMonth = () => {
    if (isAnimating) {
      return;
    }

    const prev = subMonths(month, 1);
    setMonth(prev);
    setAnimation('prev');
  };

  const handleAnimationEnd = () => {
    const newFakeMonth =
      animation === 'prev' ? subMonths(fakeMonth, 1) : addMonths(fakeMonth, 1);

    setFakeMonth(newFakeMonth);
    setAnimation('');
  };

  const handlePickDay = day => {
    if (isAnimating) {
      return;
    }

    pickDay(day);
  };

  return (
    <Grid>
      <MonthYear>
        <MonthPicker>
          <PrevMonth disabled={isAnimating} onClick={handlePrevMonth}>
            <PrevIcon />
          </PrevMonth>

          <Wrapper>
            <CurrentMonth animation={animation}>
              {format(month, 'MMMM yyyy')}
            </CurrentMonth>

            <FakeCurrentMonth animation={animation}>
              {format(fakeMonth, 'MMMM yyyy')}
            </FakeCurrentMonth>
          </Wrapper>

          <NextMonth disabled={isAnimating} onClick={handleNextMonth}>
            <NextIcon />
          </NextMonth>
        </MonthPicker>
      </MonthYear>

      <Wrapper>
        <Calendar animation={animation} onAnimationEnd={handleAnimationEnd}>
          <DaysOfWeek>
            <WeekDays>
              {WEEK_DAYS.map(weekDay => {
                return <WeekDay key={weekDay}>{weekDay}</WeekDay>;
              })}
            </WeekDays>
          </DaysOfWeek>

          <MonthDays>
            {days.map(day => {
              const isSameMonthVar = isSameMonth(day, startDay);
              if (!isSameMonthVar) {
                return <MonthDay key={day} />;
              }

              const formatted = format(day, 'd');
              const isTodayVar = isToday(day);
              const isValid = validator ? validator(day) : true;
              return (
                <MonthDay
                  key={day}
                  isValid={isValid}
                  isToday={false}
                  onClick={() => isValid && handlePickDay(day)}
                >
                  {formatted}
                </MonthDay>
              );
            })}
          </MonthDays>
        </Calendar>

        <FakeCalendar animation={animation}>
          <DaysOfWeek>
            <WeekDays>
              {WEEK_DAYS.map(weekDay => {
                return <WeekDay key={weekDay}>{weekDay}</WeekDay>;
              })}
            </WeekDays>
          </DaysOfWeek>

          <DaysOfMonth>
            <MonthDays>
              {fakeDays.map(fakeDay => {
                const isSameMonthVar = isSameMonth(fakeDay, fakeStartDay);
                if (!isSameMonthVar) {
                  return <MonthDay key={fakeDay} />;
                }

                const formatted = format(fakeDay, 'd');
                const isTodayVar = isToday(fakeDay);
                const isValid = validator ? validator(fakeDay) : true;
                return (
                  <MonthDay
                    key={fakeDay}
                    disabled={!isSameMonthVar}
                    isValid={isValid}
                    isToday={isTodayVar}
                  >
                    {formatted}
                  </MonthDay>
                );
              })}
            </MonthDays>
          </DaysOfMonth>
        </FakeCalendar>
      </Wrapper>
    </Grid>
  );
}

Root.propTypes = {
  validator: PropTypes.func,
  pickDay: PropTypes.func.isRequired
};

export default Root;
