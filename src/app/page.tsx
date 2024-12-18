'use client'

import React, { useState, useEffect } from 'react'
import { Bell, Calendar, FileText, MessageSquare, Settings, User, LogOut, Activity, Moon, Sun, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

function LoginPage({ onLogin }: { onLogin: (userType: string) => void }) {
  const [userType, setUserType] = useState('patient')

  const handleLogin = () => {
    onLogin(userType)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl"></div>
      <Card className="w-[400px] shadow-2xl relative overflow-hidden backdrop-blur-sm bg-white/70">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-0"></div>
        <CardHeader className="text-center relative z-10">
          <CardTitle className="text-4xl font-bold text-gray-800">HealthConnect</CardTitle>
          <CardDescription className="text-gray-600">Your Health, Reimagined</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-6">
            <RadioGroup defaultValue="patient" onValueChange={setUserType} className="grid grid-cols-2 gap-4">
              <Label
                htmlFor="patient"
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  userType === 'patient' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <User className="w-8 h-8 mb-2 text-blue-500" />
                <RadioGroupItem value="patient" id="patient" className="sr-only" />
                Patient
              </Label>
              <Label
                htmlFor="doctor"
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  userType === 'doctor' ? 'border-green-500 bg-green-50/50' : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <Activity className="w-8 h-8 mb-2 text-green-500" />
                <RadioGroupItem value="doctor" id="doctor" className="sr-only" />
                Doctor
              </Label>
            </RadioGroup>
            <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-105">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Dashboard({ userType, onLogout }: { userType: string, onLogout: () => void }) {
  const [activePage, setActivePage] = useState('overview')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Mock data for appointments and messages
  const appointments = [
    { id: 1, date: 'May 15, 2024', time: '10:00 AM', patient: 'John Doe', doctor: 'Dr. Priyansh' },
    { id: 2, date: 'May 15, 2025', time: '10:00 AM', patient: 'John Doe', doctor: 'Dr. Smith' },
    { id: 3, date: 'May 17, 2024', time: '2:00 PM', patient: 'Jane Smith', doctor: 'Dr. Johnson' },
    { id: 4, date: 'May 20, 2024', time: '11:30 AM', patient: 'Bob Brown', doctor: 'Dr. Smith' },
  ]

  const messages = [
    { id: 1, from: 'John Doe', subject: 'Question about prescription', date: 'May 10, 2024' },
    { id: 2, from: 'Dr. Johnson', subject: 'Lab results', date: 'May 11, 2024' },
    { id: 3, from: 'Appointment Reminder', subject: 'Upcoming appointment', date: 'May 12, 2024' },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Overview</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative group">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-lg font-medium">
              {userType === 'doctor' ? 'Total Patients' : 'Upcoming Appointments'}
            </CardTitle>
            <User className="h-5 w-5 opacity-75" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">{userType === 'doctor' ? '1,234' : '3'}</div>
          </CardContent>
          <div className="absolute bottom-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden relative group">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-lg font-medium">
              {userType === 'doctor' ? 'Appointments Today' : 'Prescriptions'}
            </CardTitle>
            <Calendar className="h-5 w-5 opacity-75" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">{userType === 'doctor' ? '15' : '2'}</div>
          </CardContent>
          <div className="absolute bottom-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white overflow-hidden relative group">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-lg font-medium">Unread Messages</CardTitle>
            <Bell className="h-5 w-5 opacity-75" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">5</div>
          </CardContent>
          <div className="absolute bottom-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative group">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-lg font-medium">
              {userType === 'doctor' ? 'Average Rating' : 'Next Appointment'}
            </CardTitle>
            <FileText className="h-5 w-5 opacity-75" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold">{userType === 'doctor' ? '4.8' : 'May 15'}</div>
          </CardContent>
          <div className="absolute bottom-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
        </Card>
      </div>
    </div>
  )

  const renderAppointments = () => (
    <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Upcoming Appointments</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">View and manage your scheduled appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {appointments.map(appointment => (
            <li key={appointment.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-600 dark:text-blue-400">{appointment.date} at {appointment.time}</div>
                  <div className="text-gray-600 dark:text-gray-300">{userType === 'doctor' ? `Patient: ${appointment.patient}` : `Doctor: ${appointment.doctor}`}</div>
                </div>
                <Button variant="outline" size="sm" className="group">
                  {userType === 'doctor' ? 'View Details' : 'Reschedule'}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )

  const renderMessages = () => (
    <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Messages</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-300">Communicate with your {userType === 'doctor' ? 'patients' : 'healthcare providers'}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {messages.map(message => (
            <li key={message.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold  text-blue-600 dark:text-blue-400">{message.subject}</div>
                  <div className="text-gray-600 dark:text-gray-300">From: {message.from}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{message.date}</div>
                </div>
                <Button variant="outline" size="sm" className="group">
                  Read
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 -z-10"></div>
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">HealthConnect</h2>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="ring-2 ring-blue-500 dark:ring-blue-400">
              <AvatarImage src={userType === 'doctor' ? "/placeholder.svg?height=40&width=40" : "/placeholder.svg?height=40&width=40"} />
              <AvatarFallback>{userType === 'doctor' ? 'Dr' : 'P'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">{userType === 'doctor' ? 'Dr. Smith' : 'John Doe'}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{userType}</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Button variant={activePage === 'overview' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActivePage('overview')}>
              <Activity className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button variant={activePage === 'appointments' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActivePage('appointments')}>
              <Calendar className="mr-2 h-4 w-4" />
              Appointments
            </Button>
            <Button variant={activePage === 'messages' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActivePage('messages')}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button variant={activePage === 'medicalRecords' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActivePage('medicalRecords')}>
              <FileText className="mr-2 h-4 w-4" />
              {userType === 'doctor' ? 'Patient Records' : 'Medical Records'}
            </Button>
            <Button variant={activePage === 'settings' ? "secondary" : "ghost"} className="w-full justify-start" onClick={() => setActivePage('settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, {userType === 'doctor' ? 'Dr. Smith' : 'John'}</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  className="data-[state=checked]:bg-blue-500"
                />
                <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {activePage === 'overview' && renderOverview()}
            {activePage === 'appointments' && renderAppointments()}
            {activePage === 'messages' && renderMessages()}

            {activePage === 'medicalRecords' && (
              <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">{userType === 'doctor' ? 'Patient Records' : 'Medical Records'}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">View and manage medical records</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">Medical records functionality would be implemented here.</p>
                </CardContent>
              </Card>
            )}

            {activePage === 'settings' && (
              <Card className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Settings</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">Manage your account settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">Settings functionality would be implemented here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<string | null>(null)

  const handleLogin = (type: string) => {
    setIsLoggedIn(true)
    setUserType(type)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType(null)
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <Dashboard userType={userType!} onLogout={handleLogout} />
}