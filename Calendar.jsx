import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import 'bootstrap/dist/css/bootstrap.min.css';
import calendar from '../../assets/calendar.svg';
import listView from '../../assets/list-view.svg';
import calendarActive from '../../assets/calendar-active.svg';
import listViewActive from '../../assets/list-view-active.svg';
import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/right-arrow.svg';
import fullScreenView from '../../assets/full-screen-view.svg';
import closeFill from '../../assets/close-fill.svg';
import classes from './Calendar.module.scss';

dayjs.extend(isBetween);

const mockHolidays = [
  { name: 'New Year Day', start_date: '2025-01-01', end_date: '2025-01-01' },
  { name: 'Family Day', start_date: '2025-01-01', end_date: '2025-01-01' },
  { name: 'Independence Day', start_date: '2025-07-04', end_date: '2025-07-04' },
  { name: 'Christmas', start_date: '2025-12-25', end_date: '2025-12-25' },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [activeTab, setActiveTab] = useState('calendar');
  const [isFullView, setIsFullView] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startOfMonth = currentDate.startOf('month');
  const daysInMonth = currentDate.daysInMonth();

  const handlePreviousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));
  const handleDateChange = (event) => setCurrentDate(dayjs(event.target.value));
  const toggleFullView = () => setIsFullView(!isFullView);

  const generateCalendar = () => {
    const days = [];
    for (let i = 0; i < startOfMonth.day(); i++) {
      days.push(<div key={`empty-${i}`} className={`${classes.dayCell} empty`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
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
          className={`${classes.dayCell} ${isHoliday ? 'holiday' : ''}`}
          title={isHoliday ? holidays.map((h) => h.name).join(', ') : ''}
        >
          <div className={`${classes.dateLabel}`}>{day}</div>
          {isHoliday && (
            <div className={`${classes.holidayBadges}`}>
              {isMobileView ? (
                <span className={`${classes.badge}`}>{holidays.length}</span>
              ) : (
                holidays.slice(0, 2).map((holiday, index) => (
                  <span key={index} className={`${classes.badge}`}>
                    {holiday.name}
                  </span>
                ))
              )}
              {holidays.length > 2 && !isMobileView && (
                <span className={`${classes.moreBadge} ${classes.badge}`}>
                  +{holidays.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>,
      );
    }

    return days;
  };

  const renderHolidayList = () => {
    const holidays = mockHolidays.filter(
      (holiday) => dayjs(holiday.start_date).year() === currentDate.year(),
    );

    return holidays.length > 0 ? (
      <div className={`${classes.holidayList}`}>
        {holidays.map((holiday, index) => (
          <div key={index} className={`${classes.listItem}`}>
            <strong>{isMobileView ? `${index + 1}` : holiday.name}</strong>
            {!isMobileView && (
              <div className={`${classes.dateRange}`}>
                {dayjs(holiday.start_date).format('DD MMM YYYY')} -{' '}
                {dayjs(holiday.end_date).format('DD MMM YYYY')}
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className={`${classes.noData}`}>No holidays found for this year.</div>
    );
  };

  return (
    <div
      className={`${classes.calendarContainer} ${isFullView ? `${classes.fullViewContainer}` : ''}`}
    >
      <div className="d-flex align-items-center justify-content-end mb-3">
        <ul className={`${classes.calendarListView} nav me-2 pe-2`}>
          <li className="nav-item">
            <button
              className={`${classes.calendarBtn} ${activeTab === 'calendar' ? `${classes.calendarListViewActive}` : ''}`}
              onClick={() => setActiveTab('calendar')}
              type="button"
            >
              <img
                src={activeTab === 'calendar' ? calendar : calendarActive}
                height={16}
                alt="calendar-view"
              />
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`${classes.listViewBtn} ${activeTab === 'list' ? `${classes.calendarListViewActive}` : ''}`}
              onClick={() => setActiveTab('list')}
              type="button"
            >
              <img src={activeTab === 'list' ? listView : listViewActive} alt="list-view" />
            </button>
          </li>
        </ul>
        <div className={`${classes.calendarPickerWrapper} d-flex align-items-center me-2 pe-2`}>
          <button
            className={`${classes.monthChangeBtn} btn`}
            onClick={handlePreviousMonth}
            type="button"
          >
            <img src={leftArrow} alt="left-arrow" />
          </button>
          <input
            type="month"
            className={`${classes.premiumDatepicker} form-control me-2 pb-0 pt-0`}
            value={currentDate.format('YYYY-MM')}
            onChange={handleDateChange}
          />
          <button
            className={`${classes.monthChangeBtn} btn`}
            onClick={handleNextMonth}
            type="button"
          >
            <img src={rightArrow} alt="right-arrow" />
          </button>
        </div>
        <button
          className={`${classes.calendarFullViewbtn} btn`}
          onClick={toggleFullView}
          type="button"
        >
          <img src={isFullView ? fullScreenView : closeFill} alt="full-screen" />
        </button>
      </div>

      <div>
        {activeTab === 'calendar' ? (
          <div
            className={`${classes.calendarGrid} ${isFullView ? `${classes.calendarExpanded}` : ''}`}
          >
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div className={`${classes.dayHeader}`} key={day}>
                {day}
              </div>
            ))}
            {generateCalendar()}
          </div>
        ) : (
          renderHolidayList()
        )}
      </div>
    </div>
  );
};

export default Calendar;
