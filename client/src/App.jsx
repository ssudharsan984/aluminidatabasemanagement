import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AlumniList from './pages/AlumniList';
import AlumniForm from './pages/AlumniForm';
import EventsList from './pages/EventsList';
import EventForm from './pages/EventForm';
import Layout from './components/Layout';

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('user') ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="alumni" element={<AlumniList />} />
          <Route path="alumni/add" element={<AlumniForm />} />
          <Route path="alumni/edit/:id" element={<AlumniForm />} />
          <Route path="events" element={<EventsList />} />
          <Route path="events/add" element={<EventForm />} />
          <Route path="events/edit/:id" element={<EventForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
