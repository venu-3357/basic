import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "bootstrap/dist/css/bootstrap.min.css";
import calendar from "../assets/calendar.svg";
import listView from "../assets/list-view.svg";
import calendarActive from "../assets/calendar-active.svg";
import listViewActive from "../assets/list-view-active.svg";
import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";

dayjs.extend(isBetween);

interface Holiday {
  name: string;
  start_date: string;
  end_date: string;
}

const mockHolidays: Holiday[] = [
  { name: "New Year's Day", start_date: "2025-01-01", end_date: "2025-01-01" },
  { name: "Family Day", start_date: "2025-01-01", end_date: "2025-01-01" },
  { name: "Independence Day", start_date: "2025-07-04", end_date: "2025-07-04" },
  { name: "Christmas", start_date: "2025-12-25", end_date: "2025-12-25" },
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [activeTab, setActiveTab] = useState<string>("calendar");
  const [isFullView, setIsFullView] = useState<boolean>(false);

  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDate(dayjs(event.target.value));
  };

  const toggleFullView = () => {
    setIsFullView(!isFullView);
  };

  const generateCalendar = () => {
    const days: JSX.Element[] = [];
    for (let i = 0; i < startOfMonth.day(); i++) {
      days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
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
        <div
          key={date}
          className={`day-cell ${isHoliday ? "holiday" : ""}`}
          title={isHoliday ? holidays.map((h) => h.name).join(", ") : ""}
        >
          <div className="date-label">{day}</div>
          {isHoliday && (
            <div className="holiday-badges">
              {holidays.slice(0, 2).map((holiday, index) => (
                <span key={index} className="badge">
                  {holiday.name}
                </span>
              ))}
              {holidays.length > 2 && (
                <span className="badge more-badge">
                  +{holidays.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const renderHolidayList = () => {
    const holidays = mockHolidays.filter(
      (holiday) => dayjs(holiday.start_date).year() === currentDate.year()
    );

    return holidays.length > 0 ? (
      <div className="holiday-list">
        {holidays.map((holiday, index) => (
          <div key={index} className="list-item">
            <strong>{holiday.name}</strong>
            <div className="date-range">
              {dayjs(holiday.start_date).format("DD MMM YYYY")} -{" "}
              {dayjs(holiday.end_date).format("DD MMM YYYY")}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="no-holidays">No holidays found for this year.</div>
    );
  };

  return (
    <div className={`container ${isFullView ? "full-view" : ""}`}>
      <div className="d-flex align-items-center justify-content-end mb-3">
        <ul className="nav calendar-list-view me-2 pe-2">
          <li className="nav-item">
            <button
              className={`calendar-btn ${
                activeTab === "calendar" ? "active" : ""
              }`}
              onClick={() => setActiveTab("calendar")}
            >
              <img
                src={activeTab === "calendar" ? calendar : calendarActive}
                height={16}
                alt="calendar-view"
              />
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`list-view-btn ${activeTab === "list" ? "active" : ""}`}
              onClick={() => setActiveTab("list")}
            >
              <img
                src={activeTab === "list" ? listView : listViewActive}
                alt="list-view"
              />
            </button>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-light month-change-btn"
            onClick={handlePreviousMonth}
          >
            <img src={leftArrow} alt="left-arrow" />
          </button>
          <input
            type="month"
            className="form-control premium-date-picker me-2"
            value={currentDate.format("YYYY-MM")}
            onChange={handleDateChange}
          />
          <button
            className="btn btn-light month-change-btn"
            onClick={handleNextMonth}
          >
            <img src={rightArrow} alt="right-arrow" />
          </button>
          <button
            className="btn btn-primary full-view-btn"
            onClick={toggleFullView}
          >
            {isFullView ? "Exit Full View" : "Full View"}
          </button>
        </div>
      </div>

      <div>
        {activeTab === "calendar" ? (
          <div className={`calendar-grid ${isFullView ? "expanded" : ""}`}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div className="day-header" key={day}>
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
