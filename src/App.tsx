import { useState } from "react";
import { darkTheme, lightTheme } from "./styles/theme";
import styled, { ThemeProvider } from "styled-components";
import { Todolist } from "./features/todolist/Todolist";
import { GlobalStyles } from "./styles/global-styles";
import { Container } from "./components/styled/Container";
import { FlexWrapper } from "./components/styled/FlexWrapper";

function App() {
  const [mode, setMode] = useState("light");
  const theme = mode === "light" ? lightTheme : darkTheme;
  const toggleMode = () => {
    setMode((m) => (m === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <div className="App">
        <Container>
          <Title>Mindbox</Title>
          <FlexWrapper $justify="center">
            <Todolist />
          </FlexWrapper>
        </Container>
      </div>
    </ThemeProvider>
  );
}

const Title = styled.h1`
  text-align: center;
  margin: 20px 0;
`;

export default App;
