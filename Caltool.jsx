import React, { useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Calendar.scss';

dayjs.extend(isBetween);

const mockHolidays = [
  { name: 'New Year Day', start_date: '2025-01-01', end_date: '2025-01-01' },
  { name: 'Family Day', start_date: '2025-01-01', end_date: '2025-01-01' },
  { name: 'Independence Day', start_date: '2025-07-04', end_date: '2025-07-04' },
  { name: 'Christmas', start_date: '2025-12-25', end_date: '2025-12-25' },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({});
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const startOfMonth = currentDate.startOf('month');
  const daysInMonth = currentDate.daysInMonth();

  const handlePreviousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const generateCalendar = () => {
    const days = [];
    for (let i = 0; i < startOfMonth.day(); i += 1) {
      days.push(<div key={`empty-${i}`} className="day-cell empty" />);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = currentDate.date(day).format('YYYY-MM-DD');
      const holidays = mockHolidays.filter((holiday) =>
        dayjs(date).isBetween(
          dayjs(holiday.start_date).startOf('day'),
          dayjs(holiday.end_date).endOf('day'),
          null,
          '[]',
        ),
      );

      const isHoliday = holidays.length > 0;

      days.push(
        <div
          key={date}
          className={`day-cell ${isHoliday ? 'holiday' : ''}`}
          onClick={(e) => {
            if (isHoliday) {
              const rect = e.target.getBoundingClientRect();
              setTooltipContent({
                subMilestone: '9.1 Full Use Approved',
                BU: 'AGS',
                FPM: 'Swarup Santosh Laddha --CNTR',
                CM: 'Swarup Santosh Laddha --CNTR',
                actionOwner: 'Kavinraj Andiapillai --CNTR',
                commitDate: '12/24/2024',
                reCommitDate: '01/16/2025',
                targetDate: '12/24/2024',
                actualDate: '12/24/2024',
              });
              setTooltipPosition({
                top: rect.top + window.scrollY + rect.height,
                left: rect.left + window.scrollX + rect.width / 2,
              });
              setShowTooltip(true);
            }
          }}
        >
          <div className="date-label">{day}</div>
          {isHoliday && <span className="badge">{holidays.length}</span>}
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <button onClick={handlePreviousMonth} className="btn btn-light">Previous</button>
        <h3>{currentDate.format('MMMM YYYY')}</h3>
        <button onClick={handleNextMonth} className="btn btn-light">Next</button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div className="day-header" key={day}>{day}</div>
        ))}
        {generateCalendar()}
      </div>

      {showTooltip && (
        <div
          className="tooltip"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        >
          <div className="tooltip-header">Details</div>
          <div className="tooltip-content">
            <p><strong>Submilestone:</strong> {tooltipContent.subMilestone}</p>
            <p><strong>BU:</strong> {tooltipContent.BU}</p>
            <p><strong>FPM:</strong> {tooltipContent.FPM}</p>
            <p><strong>CM:</strong> {tooltipContent.CM}</p>
            <p><strong>Action Owner:</strong> {tooltipContent.actionOwner}</p>
            <p><strong>Commit Date:</strong> {tooltipContent.commitDate}</p>
            <p><strong>Re-Commit Date:</strong> {tooltipContent.reCommitDate}</p>
            <p><strong>Target Date:</strong> {tooltipContent.targetDate}</p>
            <p><strong>Actual Date:</strong> {tooltipContent.actualDate}</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="close-tooltip btn btn-danger btn-sm"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
