import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { useParams } from "react-router-dom";
import { projectOfInterestData } from "../../utils/poi_data";
import { MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";
import AssessmentReport from "./AssessmentReport";
import AssessmentAnalytics from "./AssessmentAnalytics";
import DefaultNavbar from "../../examples/Navbars/DefaultNavbar";
import routes from "../../routes";
import { Divider } from '@mui/material';

export const osspoiMasterAndSummary = async (
  setData: any,
  besId: string,
  besName: string,
  setVersionSummary: any
) => {
  const osspoi: any = JSON.parse(
    await projectOfInterestData.getJsonReportOsspoiMaster()
  );
  const summary: any = JSON.parse(
    await projectOfInterestData.getJsonReportVersionSummary(besId, besName)
  );
  projectOfInterestData.updateDataPoi("Project_of_interest", osspoi.items);
  setData(osspoi.items);
  setVersionSummary(summary);
};

const useStyles: any = makeStyles(() => ({
  select: {
    minWidth: "calc(3rem + 0.5vw)",
    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
      {
        padding: "4px"
      },
    "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
      {
        padding: "4px"
      },
    "& .css-qiwgdb.css-qiwgdb.css-qiwgdb": {
      padding: "4px"
    }
  }
}));
const FetchRecomedations = ({itemData, masterData}: any) => {

  return (
    <>
    <ul>
      <li>
        <MKTypography 
          variant="body1" 
          color="inherit" 
          style={{fontSize:"calc(0.2rem + 0.5vw)", 
                  marginTop: "calc(-0.4rem + (-0.3vw))",
                  paddingLeft: "calc(0.1rem + 0.3vw)"
                }}>
           recomentaion 1: Fetch the recomendations from master jason as suggested by the POD team.
         </MKTypography>
      </li>
      <li>
        <MKTypography 
          variant="body1" 
          color="inherit" 
          style={{fontSize:"calc(0.2rem + 0.5vw)", 
                  marginTop: "calc(-0.4rem + (-0.3vw))",
                  paddingLeft: "calc(0.1rem + 0.3vw)"
                }}>
           recomentaion 2: Fetch the recomendations from master jason as suggested by the POD team.
         </MKTypography>
      </li>
      <li>
        <MKTypography 
          variant="body1" 
          color="inherit" 
          style={{fontSize:"calc(0.2rem + 0.5vw)", 
                  marginTop: "calc(-0.4rem + (-0.3vw))",
                  paddingLeft: "calc(0.1rem + 0.3vw)"
                }}>
           recomentaion 3: Fetch the recomendations from master jason as suggested by the POD team.
         </MKTypography>
      </li>
    </ul>
    </>
  )
}
function BesVersionHistory() {
  const classes = useStyles();
  const { besId, besName }: any = useParams();
  const [data, setData] = React.useState([]);

  const [versionSummary, setVersionSummary]: any = React.useState([]);
  React.useEffect(() => {
    osspoiMasterAndSummary(
      setData,
      besId.slice(1),
      besName.slice(1),
      setVersionSummary
    );
  }, []);

  const [selectedOption, setSelectedOption] = React.useState("");

  try {
    if (!selectedOption && versionSummary[0].version) {
      setSelectedOption(versionSummary[0].version);
    }
  } catch (e: any) {
    //ignore
  }

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const chartLabelsData: any = [];
  const chartContentData: any = {};

  const gridJsx: JSX.Element[] = [];

  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox pt={14} sx={{ mx: { xs: 2, lg: 3 } }}>
        {data.map((item: any) => {
          if (`:${item.name}` === besName) {
            return (
              <>
                <Card style={{marginTop: "-1.5rem"}}>
                  <Grid key={"gridkey1"} 
                        container 
                        spacing={1} 
                        pl={4} 
                        style={{height: "3.3rem"}}>
                    <Grid item 
                          xs={2} 
                          justifyContent="flex-start">
                      <MKBox key="test" 
                             display="flex"  
                             py={1} 
                             pr={2}>
                        <MKTypography
                          variant="h6"
                          fontWeight="bold"
                          textTransform="capitalize"
                          style={{fontSize: "calc(0.4rem + 0.5vw)"}}        
                        >
                          Project Name: &nbsp;
                        </MKTypography>
                        <MKTypography
                          variant="h6"
                          fontWeight="regular"
                          color="text"
                          style={{fontSize: "calc(0.4rem + 0.5vw)"}}
                        >
                          {item.name}
                        </MKTypography>
                      </MKBox>
                    </Grid>
                    <Grid item 
                          xs={2} 
                          justifyContent="flex-start">    
                      <MKBox key="test1" 
                             display="flex" 
                             py={1} 
                             pr={2}>
                        <MKTypography
                          variant="h6"
                          fontWeight="bold"
                          textTransform="capitalize"
                          style={{fontSize: "calc(0.4rem + 0.5vw)"}}
                        >
                          Version: &nbsp;
                        </MKTypography>

                        <Select
                          key={"test1"}
                          className={classes.select}
                          value={selectedOption}
                          onChange={handleOptionChange}
                          style={{fontSize: "calc(0.4rem + 0.5vw)", 
                                  height: '1.2rem', 
                                  width: "20px"}}
                          
                        >
                          {
                            versionSummary.map((option: any, index: any) => (
                              <MenuItem key={index} value={option.version}>
                                {option.version} 
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </MKBox>
                    </Grid>
                    <Grid item 
                          xs={8} 
                          justifyContent="flex-start">
                      <MKBox key="test2" 
                             display="flex" 
                             py={1} 
                             pr={2} 
                             pl={4}>
                        <MKTypography
                          variant="h6"
                          fontWeight="bold"
                          textTransform="capitalize"
                          style={{fontSize: "calc(0.4rem + 0.5vw)"}}
                        >
                          Description: &nbsp;
                        </MKTypography>
                        <MKTypography
                          variant="h6"
                          fontWeight="regular"
                          color="text"
                          style={{fontSize: "calc(0.4rem + 0.5vw)"}}
                        >
                          {item.description}
                        </MKTypography>
                      </MKBox>
                    </Grid>
                  </Grid>  
                </Card>
                
                <Card style={{marginTop: "0.3rem"}}>
                <Grid key={"gridkey2"} 
                      container 
                      spacing={0} 
                      pl={4} >
                      <Grid item 
                            xs={12} 
                            justifyContent="flex-start">
                        <MKBox key="test3" 
                               display="flex" 
                               py={0} 
                               pr={2}>
                          <MKTypography
                            variant="h6"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Risk Summary &nbsp;
                          </MKTypography>
                        </MKBox>
                      </Grid>
                </Grid>
                <Divider style={{padding: "0px", margin: "0.5rem"}}></Divider>
                <Grid key={"gridkey2"} 
                      container spacing={1} 
                      pl={4} >
                  <Grid item 
                        xs={1.5} 
                        justifyContent="flex-start">
                    <MKBox key="test3" 
                           display="flex">
                      <MKTypography
                            variant="h6"
                            fontWeight="bold"
                            textTransform="capitalize"
                            style={{fontSize: "calc(0.3rem + 0.5vw)"}}
                          >
                            BeS Tracking Id: &nbsp;
                          </MKTypography>
                          <MKTypography
                            variant="h6"
                            fontWeight="regular"
                            color="text"
                            style={{fontSize: "calc(0.3rem + 0.5vw)"}}
                          >
                            {item.id}
                          </MKTypography>
                        </MKBox>
                      </Grid>
                      <Grid item 
                            xs={1} 
                            justifyContent="flex-start">
                        <MKBox key="test3" 
                              display="flex">
                          <MKTypography
                            variant="h6"
                            fontWeight="bold"
                            textTransform="capitalize"
                            style={{fontSize: "calc(0.3rem + 0.5vw)"}}
                          >
                            Score: &nbsp;
                          </MKTypography>
                          <MKTypography
                            variant="h6"
                            fontWeight="regular"
                            color="text"
                            style={{fontSize: "calc(0.3rem + 0.5vw)"}}
                          >
                            {item.id}
                          </MKTypography>
                        </MKBox>
                      </Grid>
                      <Grid item 
                            xs={2} 
                            justifyContent="flex-start">
                        <MKBox key="test4" display="flex">
                          <MKTypography
                            variant="h6"
                            fontWeight="bold"
                            textTransform="capitalize"
                            style={{fontSize: "calc(0.3rem + 0.5vw)"}}
                          >
                            BeS Tech Stack: &nbsp;
                          </MKTypography>
                          <MKTypography
                            variant="h6"
                            fontWeight="regular"
                            color="text"
                            style={{fontSize: "calc(0.3rem + 0.5vw)"}}
                          >
                            {item.bes_technology_stack}
                          </MKTypography>
                        </MKBox>
                      </Grid>
                      <Grid item 
                            xs={7.5} 
                            justifyContent="flex-start">
                        <MKBox key="test3" display="flex" >
                          <MKTypography
                            variant="h6"
                            fontWeight="bold"
                            textTransform="capitalize"
                            style={{fontSize: "calc(0.3rem + 0.5vw)"}}
                          >
                            BeS Environment: &nbsp;
                          </MKTypography>
                          <MKTypography
                            variant="h6"
                            fontWeight="regular"
                            color="text"
                            style={{fontSize: "calc(0.3rem + 0.5vw)"}}
                          >
                            {item.id}
                          </MKTypography>
                        </MKBox>
                      </Grid>
                    </Grid>
                    <Grid key={"gridkey3"} 
                          container 
                          spacing={1} 
                          pl={3}>
                      <Grid item 
                            xs={12} 
                            justifyContent="flex-start">
                        <AssessmentReport
                          title="Assessment Report"
                          name={besName.slice(1)}
                          version={selectedOption}
                          itemData={item}
                          masterData={data}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                <Card style={{marginTop: "0.3rem"}}>
                <Grid key={"gridkey2"} 
                      container 
                      spacing={1} 
                      pl={4} 
                      style={{minHeight: "9rem", maxHeight: "9rem"}}>
                  <Grid item 
                        xs={12} 
                        justifyContent="flex-start">
                    <MKBox key="test3" 
                           display="flex" 
                           py={0} 
                           pr={2}>
                      <MKTypography
                            variant="h6"
                            fontWeight="bold"
                            textTransform="capitalize"
                      >
                            Recomendations &nbsp;
                      </MKTypography>
                    </MKBox>
                    <Divider style={{padding: "0px", margin: "0.5rem"}}></Divider>
                    <FetchRecomedations
                           itemData={item}
                           masterData={data}
                    />
                  </Grid>    
                </Grid>
              </Card>
              <MKBox>
                <Grid container 
                      spacing={3} 
                      pt={3} >
                  <Grid item 
                        xs={12} 
                        md={12} 
                        lg={12} >
                    <AssessmentAnalytics
                        title="Assessment Analytics"
                        name={besName.slice(1)}
                        version={selectedOption}
                        versionDetails={versionSummary}
                        masterData={data}
                    />
                  </Grid>
                </Grid>
              </MKBox>
            </>
          );
        }
      })}
    </MKBox>
  </>
);
}

export default BesVersionHistory;
