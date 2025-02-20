// App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage.tsx";
import MyComponent from "./components/datagrid.tsx";
import DocumentGrid from "./components/documents.tsx";
//import { refreshDocuments } from "./components/documents.tsx";
import UploadForm from "./components/uploadForm.tsx";
import { useState } from "react";
const App: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  const refreshDocuments = (): void => setRefresh((prev) => !prev);

  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listpage" element={<MyComponent />} />
        <Route path="/upload" element={<UploadForm refreshDocuments={refreshDocuments} />} />
        <Route path="/userDocs" element={<DocumentGrid key={refresh ? "refresh-1" : "refresh-0"} />} />
      </Routes>
  );
};

export default App;
