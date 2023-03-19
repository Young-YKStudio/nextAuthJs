import { dashboardLinks } from '../../../data/navigations'
import NextLink from 'next/link'

const VerticalHeader = () => {

  console.log(dashboardLinks)
  return (
    <nav>
      <p>Vertical Header</p>
      <ul>
        <li>Logo</li>
        {dashboardLinks && dashboardLinks.map((link, i) => {
          return <NextLink
            key={i}
            href={link.href}
          >
            {link.icon}{link.name}
          </NextLink>
        })}
      </ul>
    </nav>
  );
}
export default VerticalHeader;