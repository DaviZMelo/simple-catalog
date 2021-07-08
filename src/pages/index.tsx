import { FormEvent, useCallback, useState } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

import { Title } from '@/styles/defaults';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

import TextInput from '@/components/TextInput';
import List from '@/components/List';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      router.push(`/search?q=${encodeURIComponent(search)}`);

      setIsLoading(true);
      setSearch('');
    },
    [search, router],
  );

  return (
    <main>
      <SEO
        title="DevCommerce, your best e-commerce!"
        image="otgw.jpg"
        shouldExcludeTitleSuffix
      />

      <header>
        <form onSubmit={handleSearch}>
          <TextInput
            type="text"
            placeholder="Camiseta Front..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onSubmit={console.log}
          />
        </form>
      </header>

      <section>
        <Title>Products</Title>

        <List>
          {recommendedProducts.map(recommendedProduct => (
            <li
              onClick={() => setIsLoading(!isLoading)}
              key={recommendedProduct.id}
            >
              {!isLoading ? (
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              ) : (
                <a>Carregando...</a>
              )}
            </li>
          ))}
        </List>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
