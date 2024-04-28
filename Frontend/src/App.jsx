// App.js
import { ChakraProvider, Container, Box, Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Map from "./components/Map/Map";
import Query1 from "./components/Query_1/Query_1";
import Query2 from "./components/Query_2/Query_2";
import Query3 from "./components/Query_3/Query_3";
import Query6 from "./components/Query_6/Query_6";
import Prop from "./components/Prop/Prop";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg" py={8}>
        <Header />
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mt={8}>
          <GridItem colSpan={2}>
            <Box p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg" boxShadow="md">
              <Prop />
            </Box>
          </GridItem>
          <GridItem>
            <Box p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg" boxShadow="md">
              <Query6 />
            </Box>
          </GridItem>
          <GridItem>
            <Box p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg" boxShadow="md">
              <Query2 />
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <Box p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg" boxShadow="md">
              <Query3 />
            </Box>
          </GridItem>
          <GridItem>
            <Box p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg" boxShadow="md">
            <Query1 />
            </Box>
            
          </GridItem>
          <GridItem>
            <Box p={4} bg="rgba(0,0,0,0.2)" borderRadius="lg" boxShadow="md">
              <Map />
            </Box>
          </GridItem>
        </Grid>
        <Footer />
      </Container>
    </ChakraProvider>
  );
}

export default App;
