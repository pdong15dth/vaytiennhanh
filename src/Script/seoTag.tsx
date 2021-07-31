export default function SEOTag(data) {
  return (
    <>
      <link rel="icon" type="image/png" href={`${data?.icon_website}`} />
      <meta
        name="description"
        content={data?.description}
      />
      <meta
        name="keywords"
        content={data?.keywords}
      />
      <meta property="og:type" content="website" />
      <meta property="fb:app_id" content="" />
      <meta
        property="og:title"
        content={data?.og_title}
      />
      <meta property="og:url" content={data?.og_url} />
      <meta
        property="og:image"
        content={data?.og_image}
      />
      <meta
        property="og:description"
        content={data?.og_description}
      />
      <meta
        property="og:site_name"
        content={data?.og_site_name}
      />
      <meta property="og:see_also" content={data?.og_see_also} />
      {/* <meta property="og:locale"  content={data?.og_locale} />
         {data?.articles_tag.map((item, index) => {
            return (
              <meta property="article:tag" content={item.name} />
  
            );
          })} */}
      <meta
        property="article:author"
        content={data?.article_author}
      />
      <meta name="twitter:card" content={data?.twitter_card} />
      <meta name="twitter:url" content={data?.twitter_url} />
      <meta
        name="twitter:title"
        content={data?.twitter_title}
      />
      <meta
        name="twitter:description"
        content={data?.twitter_description}
      />
      <meta
        name="twitter:image"
        content={data?.twitter_image}
      />
      <meta name="search" content="always" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="1 day" />
      <meta name="robots" content="index,follow" />
      {/* <link
          rel="shortcut icon"
          href="/Images/Website/29062020_080633favicon.png"
        /> */}
      <meta name="author" content={data?.author} />
      <meta name="generator" content={data?.generator} />
      <meta name="copyright" content={data?.copyright} />
    </>
  );
}
