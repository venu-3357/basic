import React, { useState, useEffect, useRef } from 'react';
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
  const [showPopover, setShowPopover] = useState(false);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef();
  const popoverRef = useRef();
  const tooltipRef = useRef();

  const togglePopover = () => setShowPopover(!showPopover);

  const startOfMonth = currentDate.startOf('month');
  const daysInMonth = currentDate.daysInMonth();

  const handlePreviousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));
  const handleDateChange = (event) => setCurrentDate(dayjs(event.target.value));
  const toggleFullView = () => setIsFullView(!isFullView);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTooltipShow = (e) => {
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
      top: rect.top + window.scrollY + 10, // Adjust for scroll and small gap
      left: rect.left + window.scrollX + 10,
    });
  };

  const handleTooltipHide = () => {
    setTooltipContent(null);
  };

  const generateCalendar = () => {
    const days = [];
    for (let i = 0; i < startOfMonth.day(); i += 1) {
      days.push(<div key={`empty-${i}`} className={`${classes.dayCell} empty`} />);
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
          className={`${classes.dayCell} ${isHoliday ? 'holiday' : ''}`}
          title={isHoliday ? holidays.map((h) => h.name).join(', ') : ''}
          onMouseEnter={handleTooltipShow}
          onMouseLeave={handleTooltipHide}
        >
          <div className={`${classes.dateLabel}`}>{day}</div>
          {isHoliday && (
            <div className={`${classes.holidayBadges}`}>
              {isMobileView ? (
                <span className={`${classes.badge}`}>{holidays.length}</span>
              ) : (
                holidays.slice(0, 2).map((holiday, index) => (
                  <span
                    key={index}
                    className={`${classes.badge}`}
                    onClick={togglePopover}
                    ref={buttonRef}
                  >
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

      {tooltipContent && (
        <div
          className="tooltip-content"
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            zIndex: 1050,
          }}
          ref={tooltipRef}
        >
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
      )}

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
