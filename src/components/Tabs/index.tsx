import React from "react";
import { Button } from "@material-ui/core";
import { Binoculars, Fire } from "phosphor-react";

export interface TabsProps {
  handleTabChange: Function;
}

export const Tabs: React.FC<TabsProps> = ({ handleTabChange }) => {
  return (
    <div className="button-container">
      <Button
        variant="contained"
        startIcon={<Binoculars size={32} weight="light" />}
        onClick={(event: any) => handleTabChange(event, 1)}
        style={{
          width: 250,
          height: 64,
          fontFamily: "Poppins",
          fontWeight: 700,
        }}
        color="primary"
      >
        Explore Feed
      </Button>
      <Button
        variant="contained"
        startIcon={<Fire size={32} weight="light" />}
        onClick={(event: any) => handleTabChange(event, 2)}
        style={{
          width: 250,
          height: 64,
          fontFamily: "Poppins",
          fontWeight: 700,
        }}
        color="secondary"
      >
        Shoot a line
      </Button>
    </div>
  );
};

export default Tabs;
