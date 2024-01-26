import { Helmet } from 'react-helmet-async'
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Bienvenido a Tienda Online',
  description: 'Los mejores productos al mejor precio',
  keywords: 'palabras, seo, posicionamiento, busquedas',
}

export default Meta
