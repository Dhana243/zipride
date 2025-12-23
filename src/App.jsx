import './App.css'
import Booking from './components/Booking'
import TripHistory from './components/TripHistory'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import Contact from './components/contact'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { auth, db } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

function AppContent(){
  const [user,setUser] = useState('Guest')
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setUser(docSnap.data().username)
        }
      } else {
        setUser("Guest")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return null

  const isAuthPage = location.pathname === '/Login' || location.pathname === '/Signup'
  return (
    <>
      {!isAuthPage && <Header user={user} setUser={setUser}/>}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Booking' element={<Booking />} />
        <Route path='/TripHistory' element={<TripHistory />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Login' element={<Login user={user} setUser={setUser}/>} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='' element={<Navigate to="/" />} />
      </Routes>
      
      {!isAuthPage && <Footer />}
    </>
  )
}
function App(){
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App