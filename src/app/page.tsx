'use client'

import React, { useState } from 'react'
import { Bell, Calendar, FileText, MessageSquare, Settings, User, LogOut, Activity, Pill, Stethoscope } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function LoginPage({ onLogin }: { onLogin: (userType: string) => void }) {
  const [userType, setUserType] = useState('patient')

  const handleLogin = () => {
    onLogin(userType)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-600">HealthConnect</CardTitle>
          <CardDescription>Your Health, Connected</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <RadioGroup defaultValue="patient" onValueChange={setUserType} className="grid grid-cols-2 gap-4">
              <Label
                htmlFor="patient"
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  userType === 'patient' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <User className="w-8 h-8 mb-2 text-blue-500" />
                <RadioGroupItem value="patient" id="patient" className="sr-only" />
                Patient
              </Label>
              <Label
                htmlFor="doctor"
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  userType === 'doctor' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <Stethoscope className="w-8 h-8 mb-2 text-green-500" />
                <RadioGroupItem value="doctor" id="doctor" className="sr-only" />
                Doctor
              </Label>
            </RadioGroup>
            <Button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
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

  // Mock data for appointments and messages
  const appointments = [
    { id: 1, date: 'May 15, 2024', time: '10:00 AM', patient: 'John Doe', doctor: 'Dr. Smith' },
    { id: 2, date: 'May 17, 2024', time: '2:00 PM', patient: 'Jane Smith', doctor: 'Dr. Johnson' },
    { id: 3, date: 'May 20, 2024', time: '11:30 AM', patient: 'Bob Brown', doctor: 'Dr. Smith' },
  ]

  const messages = [
    { id: 1, from: 'John Doe', subject: 'Question about prescription', date: 'May 10, 2024' },
    { id: 2, from: 'Dr. Johnson', subject: 'Lab results', date: 'May 11, 2024' },
    { id: 3, from: 'Appointment Reminder', subject: 'Upcoming appointment', date: 'May 12, 2024' },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              {userType === 'doctor' ? 'Total Patients' : 'Upcoming Appointments'}
            </CardTitle>
            <User className="h-5 w-5 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userType === 'doctor' ? '1,234' : '3'}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              {userType === 'doctor' ? 'Appointments Today' : 'Prescriptions'}
            </CardTitle>
            <Calendar className="h-5 w-5 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userType === 'doctor' ? '15' : '2'}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Unread Messages</CardTitle>
            <Bell className="h-5 w-5 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              {userType === 'doctor' ? 'Average Rating' : 'Next Appointment'}
            </CardTitle>
            <FileText className="h-5 w-5 opacity-75" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userType === 'doctor' ? '4.8' : 'May 15'}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAppointments = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Upcoming Appointments</CardTitle>
        <CardDescription>View and manage your scheduled appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {appointments.map(appointment => (
            <li key={appointment.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-600">{appointment.date} at {appointment.time}</div>
                  <div className="text-gray-600">{userType === 'doctor' ? `Patient: ${appointment.patient}` : `Doctor: ${appointment.doctor}`}</div>
                </div>
                <Button variant="outline" size="sm">
                  {userType === 'doctor' ? 'View Details' : 'Reschedule'}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )

  const renderMessages = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">Messages</CardTitle>
        <CardDescription>Communicate with your {userType === 'doctor' ? 'patients' : 'healthcare providers'}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {messages.map(message => (
            <li key={message.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-600">{message.subject}</div>
                  <div className="text-gray-600">From: {message.from}</div>
                  <div className="text-sm text-gray-500">{message.date}</div>
                </div>
                <Button variant="outline" size="sm">Read</Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">HealthConnect</h2>
          <div className="flex items-center space-x-4 mb-6">
            
            <div>
              <p className="font-medium">{userType === 'doctor' ? 'Dr. Smith' : 'John Doe'}</p>
              <p className="text-sm text-gray-500 capitalize">{userType}</p>
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
        <div className="p-6 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {userType === 'doctor' ? 'Dr. Smith' : 'John'}</h1>
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </div>

          {activePage === 'overview' && renderOverview()}
          {activePage === 'appointments' && renderAppointments()}
          {activePage === 'messages' && renderMessages()}

          {activePage === 'medicalRecords' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">{userType === 'doctor' ? 'Patient Records' : 'Medical Records'}</CardTitle>
                <CardDescription>View and manage medical records</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Medical records functionality would be implemented here.</p>
              </CardContent>
            </Card>
          )}

          {activePage === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Settings</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Settings functionality would be implemented here.</p>
              </CardContent>
            </Card>
          )}
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