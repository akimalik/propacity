import { Routing } from "./Routing";
import AuthProvider from "./_contexts/AuthContext/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
}

export default App;
