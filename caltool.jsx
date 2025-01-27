import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "bootstrap/dist/css/bootstrap.min.css";

dayjs.extend(isBetween);

const mockHolidays = [
  { name: "New Year Day", start_date: "2025-01-01", end_date: "2025-01-01" },
  { name: "Family Day", start_date: "2025-01-01", end_date: "2025-01-01" },
  {
    name: "Independence Day",
    start_date: "2025-07-04",
    end_date: "2025-07-04",
  },
  { name: "Christmas", start_date: "2025-12-25", end_date: "2025-12-25" },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [popover, setPopover] = useState({
    visible: false,
    position: {},
    content: null,
  });
  const popoverRef = useRef();

  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();

  const handlePreviousMonth = () =>
    setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const handleDateChange = (event) => setCurrentDate(dayjs(event.target.value));

  const generateCalendar = () => {
    const days = [];
    for (let i = 0; i < startOfMonth.day(); i += 1) {
      days.push(<div key={`empty-${i}`} className="day-cell empty" />);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = currentDate.date(day).format("YYYY-MM-DD");
      const holidays = mockHolidays.filter((holiday) =>
        dayjs(date).isBetween(
          dayjs(holiday.start_date).startOf("day"),
          dayjs(holiday.end_date).endOf("day"),
          null,
          "[]"
        )
      );

      const isHoliday = holidays.length > 0;

      days.push(
        <div key={date} className="day-cell">
          <div className="date-label">{day}</div>
          {isHoliday && (
            <div className="holiday-badges">
              {holidays.map((holiday, index) => (
                <span
                  key={index}
                  className="badge badge-primary"
                  onClick={(e) => handlePopover(e, holiday)}
                >
                  {holiday.name}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  const handlePopover = (event, holiday) => {
    const rect = event.target.getBoundingClientRect();
    setPopover({
      visible: true,
      position: {
        top: rect.top + window.scrollY + rect.height / 2,
        left: rect.left + window.scrollX - 250, // Popover width + spacing
      },
      content: (
        <div>
          <h5 className="mb-2">{holiday.name}</h5>
          <p>
            <strong>Start Date:</strong> {holiday.start_date}
          </p>
          <p>
            <strong>End Date:</strong> {holiday.end_date}
          </p>
          <p>
            <strong>Details:</strong> This holiday represents important cultural
            and historical significance.
          </p>
        </div>
      ),
    });
  };

  const closePopover = () => setPopover({ ...popover, visible: false });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        closePopover();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="calendar-container">
      <div className="d-flex align-items-center justify-content-end mb-3">
        <div className="calendar-picker-wrapper d-flex align-items-center me-2 pe-2">
          <button
            className="month-change-btn btn btn-secondary"
            onClick={handlePreviousMonth}
            type="button"
          >
            {"<"}
          </button>
          <input
            type="month"
            className="form-control me-2"
            value={currentDate.format("YYYY-MM")}
            onChange={handleDateChange}
          />
          <button
            className="month-change-btn btn btn-secondary"
            onClick={handleNextMonth}
            type="button"
          >
            {">"}
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div className="day-header" key={day}>
            {day}
          </div>
        ))}
        {generateCalendar()}
      </div>

      {popover.visible && (
        <div
          ref={popoverRef}
          className="popover shadow"
          style={{
            position: "absolute",
            top: `${popover.position.top}px`,
            left: `${popover.position.left}px`,
            zIndex: 1050,
            backgroundColor: "white",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            width: "240px",
          }}
        >
          <div
            className="popover-tip"
            style={{
              position: "absolute",
              right: "-10px",
              transform: "translateY(-50%)",
              width: "0",
              height: "0",
              borderLeft: "10px solid white",
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
            }}
          />
          {popover.content}
          <button className="btn btn-sm btn-danger mt-3" onClick={closePopover}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
