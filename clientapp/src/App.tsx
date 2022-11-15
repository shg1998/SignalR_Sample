import React from "react";
import logo from "./logo.svg";
import "./App.css";
import * as SignalR from "@microsoft/signalr";
import { Messages } from "./components/Messages";
import { PlotChart } from "./components/PlotChart";
import { Themes } from "@arction/lcjs";

export interface MessageProps {
  HubConnection: SignalR.HubConnection;
}

const App: React.FC = () => {
  const hubConnection = new SignalR.HubConnectionBuilder()
    .withUrl("/message")
    .build();
  hubConnection.start();


  


  return (
    <>
      <Messages HubConnection={hubConnection}/>
      <PlotChart  theme={Themes.darkGold}/>
      <br/>
      <PlotChart theme={Themes.darkGreen}/>
      <br/>
      <PlotChart theme={Themes.darkRed}/>
      <br/>
      <PlotChart theme={Themes.darkLime}/>
      <br/>
      <PlotChart theme={Themes.darkTurquoise}/>
      <br/>
      <input type={"email"} />
    </>
  );
};

export default App;
