import Calendar from "./components/Calendar";
import "./App.scss";
import Card from "./components/Card";
import peningImport from "./assets/pening-activity.svg";

function App() {
  return (
    <>
      <div className="app-wrapper">
        <div className="container-fluid">
          {/* First Row: Banner and Right Card */}
          <div className="row">
            <div className="col-lg-9 col-md-8 col-sm-12 mb-3">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h3 className="card-title">Banner</h3>
                  <p className="card-text">Banner Content</p>
                  <h3 className="card-title">Banner</h3>
                  <p className="card-text">Banner Content</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 mb-3">
              <Card
                headerTitle="Basic Card"
                icon={peningImport}
                subHeader="Approvals & Actions"
              >
                <div className="request-stats-wrapper d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">PFR</p>
                    <span>05</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">FSR</p>
                    <span>05</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Second Row: Left Cards, Calendar, and Right Cards */}
          <div className="row">
            {/* Left Column */}
            <div className="col-lg-2 col-md-3 col-sm-12 mb-3">
              <div className="row">
                {[...Array(3)].map((_, index) => (
                  <div className="col-12 mb-3" key={index}>
                    <Card
                      headerTitle="Basic Card"
                      icon={peningImport}
                      subHeader="Approvals & Actions"
                    >
                      <div className="request-stats-wrapper d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">PFR</p>
                          <span>05</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">FSR</p>
                          <span>05</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Section */}
            <div className="col-lg-7 col-md-6 col-sm-12 mb-3">
              <div className="card shadow h-100">
                <div className="card-body">
                  <Calendar />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
              <div className="row">
                {[...Array(2)].map((_, index) => (
                  <div className="col-12 mb-3" key={index}>
                    <Card
                      headerTitle="Basic Card"
                      icon={peningImport}
                      subHeader="Approvals & Actions"
                    >
                      <div className="request-stats-wrapper d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">PFR</p>
                          <span>05</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0">FSR</p>
                          <span>05</span>
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
    </>
  );
}

export default App;
