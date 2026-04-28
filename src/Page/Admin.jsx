import { Link } from 'react-router';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your products and orders</p>
        
        <div className="space-y-4">
          <Link
            to="/add-product"
            className="block w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Add New Product
          </Link>
          
          <Link
            to="/manage-products"
            className="block w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Delete Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
