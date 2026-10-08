import { type SyntheticEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchUserById } from './userSlice';

export function UserSearch() {
  const [id, setId] = useState('');
  const user = useAppSelector((state) => state.user.current);
  const status = useAppSelector((state) => state.user.status);
  const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = id.trim();
    console.log(trimmed);
    if (!trimmed) return;
    dispatch(fetchUserById(trimmed));
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="userId"
          value={id}
          min="1"
          max="10"
          onChange={(e) => setId(e.target.value)}
          placeholder="User id 1-10"
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          Search
        </button>
      </form>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && user && (
        <article>
          <h3>{user.name}</h3>
          <p>
            {user.username} &#x2022; {user.email}
          </p>
        </article>
      )}
    </section>
  );
}
