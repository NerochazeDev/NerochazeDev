import { ProjectManagement } from "@/components/admin/project-management";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-gray-500 mb-8">Manage your portfolio content</p>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ProjectManagement />
        </div>
      </div>
    </div>
  );
}