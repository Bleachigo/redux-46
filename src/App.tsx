import { useAppSelector } from './app/hooks';
import { Card, Footer, Header } from './components';
import { UserSearch } from './features/user/UserSearch';

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
