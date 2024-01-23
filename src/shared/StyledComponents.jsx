import styled from "styled-components";
import { Box, TextField, Button, Card, Typography, TableCell, TableRow } from "@mui/material";

export const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonContainer = styled(Box)`
  display: flex;
  height: 3rem;
`;

export const StyledButton = styled(Button)`
  && {
    transition: box-shadow 0.3s;
    background-color: #000000;
    color: #ffffff;
  }
  &:hover {
    box-shadow: 0 0 8px 2px #000000;
  }
`;

export const StyledSearchTextField = styled(TextField)`
&& {
  margin-left: 3rem;
  margin-bottom: 1rem;
  flex: 1;
  font-size: 15px;
}
`;

export const SpacedTextField = styled(TextField)`
  && {
    margin-bottom: 1rem;
    margin-top: 1rem;

    &.MuiOutlinedInput-root {
        fieldset {
          border-color: #ced4da;
        }
      }

      &.Mui-focused {
        fieldset {
          border-color: #007bff;
        }
      }

  }
`;

export const StyledTextField = styled(TextField)`
  && {
    margin: 1rem;
  }
`;
export const DataGridContainer = styled(Box)`
  display: flex;
  height: 500px;
  width: 90%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const StyledCard = styled(Card)`
  && {
    margin: 15px;
    width: 30%;
    height: 50%;
    border-radius: 12px;
    background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease-in-out;
    color: white;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export const StyledCardContainer = styled(Box)`
  display: flex;
  margin: 15px;
  gap: 1%;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FrameText = styled(Typography)({
    position: "absolute",
    bottom: "0.5rem",
    right: "0.5rem",
    color: "#000",
  });

export const FrameContainer = styled.div`
display: flex;
padding: 2rem ;
`;

export const Frames = styled.div`
  && {
    margin-bottom: 5px;
    padding: 3rem;
  }
`;

export const FactureContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #000;
  width: 25rem;
  height: 50rem;
`;

export const Title = styled(Typography)`
  && {
    font-family: "DM sans";
    font-size: 30px;
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 1.5rem;
  }
`;

export const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  background-color: black;
  color: white;
`;

export const StyledDate = styled(Typography)`
  && {
    font-size: 20px;
    font-family: sans-serif;
    font-weight: 500;
    margin-left: 1rem;
  }
`;

export const StyledSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  margin-left: 8px;
  background-color: white;
  color: black;
`;

export const OrderTableContainer = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  background-color: #dce0e5;
`;

export const OrderElements = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4rem ;
    margin-bottom: 2rem ;
`;

export const OrderElement = styled.div`
    display: flex;
    flex-direction: row ;
`;

export const OrderTypography = styled(Typography)`
&& {
    font-family: "DM sans";
    font-size: 20px;
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 1.5rem;
  }
`;

export const StyledTableRow = styled(TableRow)`
  border-bottom: 2px solid black;
`;

export const StyledTableCell = styled(TableCell)`
  && {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const StyledElement = styled.div`
    display: flex;
    flex-direction: column ;
    margin-left: 2rem ;
`;

export const OrderTable = styled.div`
    display: flex;
    margin-top: 2rem ;
`;

export const TotalCost = styled.div`
    padding: 1rem;
    margin-top: 1rem ;
`;