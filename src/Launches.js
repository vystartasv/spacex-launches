import React from "react";
import { Link } from "react-router-dom";
export default class Launches extends React.Component {
  constructor() {
    super();
    this.state = { selected: false };
  }
  async componentDidMount() {
    try {
      const launchesData = await fetch(
        "https://api.spacexdata.com/v3/launches"
      );
      const launches = await launchesData.json();
      const resentLaunches = launches.filter(launch => !launch.upcoming);
      const lastTenLaunches = resentLaunches
        .slice(resentLaunches.length - 10)
        .reverse();
      this.setState({ launches: lastTenLaunches });
    } catch (e) {
      this.setState({ launches: "Can not get launch data from SpaceX api" });
    }
    try {
      const rocketsData = await fetch("https://api.spacexdata.com/v3/rockets");
      const rockets = await rocketsData.json();
      this.setState({ rockets });
    } catch (e) {
      this.setState({ rockets: "Can not get rocket data from SpaceX api" });
    }
  }

  onClick(props) {
    this.setState({
      selected: !this.state.selected,
      launch: props
    });
  }

  render() {
    return (
      <>
        {this.state.launches && !this.state.selected ? (
          <div>
            {this.state.launches.map(el => (
              <React.Fragment key={el.mission_name}>
                <h1>Flight number: {el.flight_number}</h1>
                <p>
                  Launch date new: {new Date(el.launch_date_utc).toString()}
                </p>
                <h2>Rocket: {el.rocket.rocket_name}</h2>
                <h3>Flight upcoming: {el.upcoming ? "yes" : "no"}</h3>
                <h3>
                  Successful launch:{" "}
                  {el.launch_success === null
                    ? "Launch date is in the future"
                    : el.launch_success
                    ? "yes"
                    : "no"}
                </h3>
                <Link to="" onClick={() => this.onClick(el)}>
                  More information about the launch
                </Link>
              </React.Fragment>
            ))}
          </div>
        ) : this.state.launches && this.state.selected ? (
          <div>
            <h1>Launch details</h1>
            <h3>Details of the launch: {this.state.launch.details}</h3>
            <h3>Launch site: {this.state.launch.launch_site.site_name_long}</h3>
            <img
              src={this.state.launch.links.mission_patch}
              alt={this.state.launch.mission_name}
            />
            <h1>Rocket details</h1>
            <h3>Name: {this.state.launch.rocket.rocket_name}</h3>
            <h3>
              ID:{" "}
              {
                this.state.rockets.filter(
                  r => r.rocket_id === this.state.launch.rocket.rocket_id
                )[0].id
              }
            </h3>
            <h3>
              Height:{" "}
              {
                this.state.rockets.filter(
                  r => r.rocket_id === this.state.launch.rocket.rocket_id
                )[0].height.meters
              }{" "}
              meters
            </h3>
            <h3>
              Mass:{" "}
              {
                this.state.rockets.filter(
                  r => r.rocket_id === this.state.launch.rocket.rocket_id
                )[0].mass.kg
              }{" "}
              kg
            </h3>
            <h3>
              Stages:{" "}
              {
                this.state.rockets.filter(
                  r => r.rocket_id === this.state.launch.rocket.rocket_id
                )[0].stages
              }
            </h3>
            <h3>
              Description:{" "}
              {
                this.state.rockets.filter(
                  r => r.rocket_id === this.state.launch.rocket.rocket_id
                )[0].description
              }
            </h3>
            <Link to="" onClick={() => this.onClick()}>
              Back to the main page
            </Link>
          </div>
        ) : (
          <div>Launches data is getting loaded</div>
        )}
      </>
    );
  }
}
