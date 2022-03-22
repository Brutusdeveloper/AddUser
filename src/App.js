import React from "react";
import AddForm from "./Form/AddForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import RecordList from "./Form/index"

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path='/' exact element={<RecordList />} />
            <Route path='/add' exact element={<AddForm />} />
            <Route path='/edit' exact element={<AddForm />} />
          </Routes>
        </Router>
        </PersistGate>
        </Provider>

  );
}