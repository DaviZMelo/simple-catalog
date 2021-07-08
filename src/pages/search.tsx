import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import { FormEvent, useCallback, useState } from 'react';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { client } from '@/lib/prismic';
import Link from 'next/link';

import TextInput from '@/components/TextInput';
import List from '@/components/List';
import { Title, FadeInAnimation } from '@/styles/defaults';
import BackHomeButton from '@/components/BackHomeButton';

interface SearchProps {
  searchResults: Document[];
  query: string;
}

export default function Search({ searchResults, query }: SearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      router.push(`/search?q=${encodeURIComponent(search)}`);

      setSearch('');
    },
    [search, router],
  );

  return (
    <>
      <BackHomeButton />
      <div css={FadeInAnimation}>
        <form onSubmit={handleSearch}>
          <TextInput
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>

        <Title>Results of {query}</Title>

        <List>
          {searchResults.map(product => (
            <li key={product.id}>
              <Link href={`/catalog/products/${product.uid}`}>
                <a>{PrismicDOM.RichText.asText(product.data.title)}</a>
              </Link>
            </li>
          ))}
        </List>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> =
  async context => {
    const { q } = context.query;

    if (!q) {
      return { props: { searchResults: [], query: '' } };
    }

    const searchResults = await client().query([
      Prismic.Predicates.at('document.type', 'product'),
      Prismic.Predicates.fulltext('my.product.title', String(q)),
    ]);

    return {
      props: { searchResults: searchResults.results, query: String(q) },
    };
  };
