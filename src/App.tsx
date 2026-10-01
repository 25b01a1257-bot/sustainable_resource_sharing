import { useRouter } from '@/router';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/ToastContainer';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import AddResourcePage from '@/pages/AddResourcePage';
import DetailsPage from '@/pages/DetailsPage';
import RequestsPage from '@/pages/RequestsPage';
import UserDashboardPage from '@/pages/UserDashboardPage';
import AdminPage from '@/pages/AdminPage';
import AdsApage from '@/pages/AdsApage';
import AboutPage from '@/pages/AboutPage';
import AIAssistantPage from '@/pages/AIAssistantPage';
import AIRecommendationsPage from '@/pages/AIRecommendationsPage';
import AIInsightsPage from '@/pages/AIInsightsPage';

function PageRouter() {
  const { page } = useRouter();

  switch (page) {
    case 'home': return <HomePage />;
    case 'login': return <LoginPage />;
    case 'register': return <RegisterPage />;
    case 'dashboard': return <DashboardPage />;
    case 'add': return <AddResourcePage />;
    case 'details': return <DetailsPage />;
    case 'requests': return <RequestsPage />;
    case 'user': return <UserDashboardPage />;
    case 'admin': return <AdminPage />;
    case 'adsa': return <AdsApage />;
    case 'about': return <AboutPage />;
    case 'ai-assistant': return <AIAssistantPage />;
    case 'ai-recommendations': return <AIRecommendationsPage />;
    case 'ai-insights': return <AIInsightsPage />;
    default: return <HomePage />;
  }
}

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <PageRouter />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}

export default App;
