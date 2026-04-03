import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import DrivingTraining from './pages/services/DrivingTraining'
import DrivingLicense from './pages/services/DrivingLicense'
import CarBuying from './pages/services/CarBuying'
import PDI from './pages/services/PDI'
import RTOServices from './pages/services/RTOServices'
import AdminDashboard from './pages/admin/AdminDashboard'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import Certificate from './pages/Certificate'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Main site with Navbar + Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services/driving-training" element={<DrivingTraining />} />
            <Route path="/services/driving-license" element={<DrivingLicense />} />
            <Route path="/services/car-buying" element={<CarBuying />} />
            <Route path="/services/pdi" element={<PDI />} />
            <Route path="/services/rto-services" element={<RTOServices />} />

            {/* User Dashboard / Tracking */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="/certificate" element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          } />
          {/* Admin Dashboard — protected admin route */}
          <Route path="/admin/*" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
