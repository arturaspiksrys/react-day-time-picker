import React from 'react';
import PropTypes from 'prop-types';

import {
  ChevronLeft,
  ChevronRight,
  CalendarCheck,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const _propTypes = {
  className: PropTypes.string
};

export const PrevIcon = ({ className }) => (
  <ChevronLeft size={24} color={'#848484'} className={className} />
);
PrevIcon.propTypes = _propTypes;

export const NextIcon = ({ className }) => (
  <ChevronRight size={24} color={'#848484'} className={className} />
);
NextIcon.propTypes = _propTypes;

export const DayIcon = ({ className }) => (
  <CalendarCheck size={17} color={'#848484'} className={className} />
);
DayIcon.propTypes = _propTypes;

export const ClockIcon = ({ className }) => (
  <Clock size={17} color={'#848484'} className={className} />
);
ClockIcon.propTypes = _propTypes;

export const SuccessIcon = ({ className }) => (
  <CheckCircle size={20}  className={className} />
);
SuccessIcon.propTypes = _propTypes;

export const FailedIcon = ({ className }) => (
  <AlertCircle size={20} className={className} />
);
FailedIcon.propTypes = _propTypes;
