import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { Title, FadeInAnimation } from '@/styles/defaults';

import List from '@/components/List';
import BackHomeButton from '@/components/BackHomeButton';

interface CategoryProps {
  category: Document;
  products: Document[];
}

export default function Category({ products, category }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <BackHomeButton />
      <div css={FadeInAnimation}>
        <Title>{PrismicDOM.RichText.asText(category.data.title)}</Title>

        <List>
          {products.map(product => (
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

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category'),
  ]);

  const paths = categories.results.map(category => {
    return {
      params: { slug: category.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async context => {
  const { slug } = context.params;

  const category = await client().getByUID('category', String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id),
  ]);

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 60,
  };
};
