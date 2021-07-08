import tw from 'twin.macro';
import { useRouter } from 'next/dist/client/router';

import { client } from '@/lib/prismic';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Title, FadeInAnimation } from '@/styles/defaults';

import BackHomeButton from '@/components/BackHomeButton';

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando</p>;
  }

  return (
    <>
      <BackHomeButton />
      <div
        tw="flex justify-center items-center flex-col w-72 sm:w-96"
        css={FadeInAnimation}
      >
        <Title>{PrismicDOM.RichText.asText(product.data.title)}</Title>

        <img
          tw="rounded-full mt-10 mb-10"
          src={product.data.thumbnail.url}
          width="400"
          alt="camiseta_frontend"
        />

        <div
          dangerouslySetInnerHTML={{
            __html: PrismicDOM.RichText.asHtml(product.data.description),
          }}
        />

        <p tw="bg-green-600 p-4 rounded-3xl mt-7 font-bold">
          Price: ${product.data.price}
        </p>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async context => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  };
};
