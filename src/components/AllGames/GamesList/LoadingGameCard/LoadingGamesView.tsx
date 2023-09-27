import { useMemo } from 'react';
import GamesListLoading from '.';

type LoadingGamesViewProps = {
  amount: number;
};

export default function LoadingGamesView({ amount }: LoadingGamesViewProps) {
  const memoizedRows = useMemo(() => {
    return Array.from({ length: amount }, (_, index) => (
      <GamesListLoading key={index} />
    ));
  }, [amount]);

  return memoizedRows;
}
