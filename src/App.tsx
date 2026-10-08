import { Header, Card, Footer } from './components';
import { UserSearch } from './features/users/UserSearch';
import { useAppSelector } from './app/hooks';

export function App() {
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <div className={`app app--${mode}`}>
      <Header />

      <main>
        <Card title="React">React component card</Card>

        <Card title="TypeScript">TypeScrip component card</Card>

        <Card title="Vite">Vite component card</Card>

        <UserSearch />
      </main>

      <Footer />
    </div>
  );
}
