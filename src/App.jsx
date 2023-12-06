import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { ChannelDetail, Feed, SearchFeed, VideoDetail } from "./pages";
import { NavBar } from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Box sx={{ backgroundColor: "#000" }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/search/:searchterm" element={<SearchFeed />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
