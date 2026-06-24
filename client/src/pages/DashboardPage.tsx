import { Navbar } from '../components/Navbar';
import { ProductList } from '../components/ProductList';

export function DashboardPage() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <ProductList />
      </div>
    </div>
  );
}
