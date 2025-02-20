import UserForm from './components/UserForm'
import UserList from './components/UserList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-300 mb-8">User Management System</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="md:w-1/3 flex-shrink-0">
            <div className="sticky top-8">
              <UserForm />
            </div>
          </div>

          {/* Right Column - List */}
          <div className="md:w-2/3">
            <UserList />
          </div>
        </div>
      </div>
    </main>
  )
}
