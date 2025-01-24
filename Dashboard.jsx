import React from 'react';
import Calendar from '../../components/calendar/Calendar';
import Card from '../../components/card/Card';
import peningImport from '../../assets/pening-activity.svg';
import banner from '../../assets/Info.svg';
import classes from './Dashboard.module.scss';

const DashBoard = () => {
  return (
    <div className={`${classes.dashBoardWrapper}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9 col-md-8 col-sm-12 mb-3">
            <div className="card shadow">
              <div className="card-body p-0">
                <img src={banner} width="100%" alt="banner" />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12 mb-3">
            <Card headerTitle="Basic Card" icon={peningImport} subHeader="Approvals & Actions">
              <div className={`${classes.requestStatsWrapper} d-flex gap-2`}>
                <div
                  className={`${classes.pfrStatsWrapper} d-flex justify-content-between align-items-center`}
                >
                  <p className="mb-0 f-14">PFR</p>
                  <span className={`${classes.pfrFsrCount}`}>05</span>
                </div>
                <div
                  className={`${classes.fsrStatsWrapper} d-flex justify-content-between align-items-center`}
                >
                  <p className="mb-0 f-14">FSR</p>
                  <span className={`${classes.pfrFsrCount}`}>05</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-12 mb-3">
            <div className="row">
              {[...Array(3)].map((_, index) => (
                <div className="col-12 mb-3" key={index}>
                  <Card
                    headerTitle="Basic Card"
                    icon={peningImport}
                    subHeader="Approvals & Actions"
                    isBordered
                  >
                    <div className={`${classes.requestStatsWrapper} d-flex gap-2`}>
                      <div
                        className={`${classes.pfrStatsWrapper} d-flex justify-content-between align-items-center`}
                      >
                        <p className="mb-0 f-14">PFR</p>
                        <span className={`${classes.pfrFsrCount}`}>05</span>
                      </div>
                      <div
                        className={`${classes.fsrStatsWrapper} d-flex justify-content-between align-items-center`}
                      >
                        <p className="mb-0 f-14">FSR</p>
                        <span className={`${classes.pfrFsrCount}`}>05</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-7 col-md-6 col-sm-12 mb-3">
            <div className="card shadow h-100">
              <div className="card-body">
                <Calendar />
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
            <div className="row">
              {[...Array(2)].map((_, index) => (
                <div className="col-12 mb-3" key={index}>
                  <Card
                    headerTitle="Basic Card"
                    icon={peningImport}
                    subHeader="Approvals & Actions"
                  >
                    <div className={`${classes.requestStatsWrapper} d-flex gap-2`}>
                      <div
                        className={`${classes.pfrStatsWrapper} d-flex justify-content-between align-items-center`}
                      >
                        <p className="mb-0 f-14">PFR</p>
                        <span className={`${classes.pfrFsrCount}`}>05</span>
                      </div>
                      <div
                        className={`${classes.fsrStatsWrapper} d-flex justify-content-between align-items-center`}
                      >
                        <p className="mb-0 f-14">FSR</p>
                        <span className={`${classes.pfrFsrCount}`}>05</span>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
